import Database from "./Database";
import Submission, { InsertSubmission } from "../survey/Submission";
import Survey, { InsertSurvey } from "../survey/Survey";
import { Database as DB } from "sqlite3";
import AsyncSqlite, { AllResult } from "./AsyncSqlite";
import CodeGenerator from "../code/CodeGenerator";
import SimpleCodeGenerator from "../code/SimpleCodeGenerator";

export default class SqliteDatabase implements Database {
    private readonly db: AsyncSqlite;
    private readonly generator: CodeGenerator;

    public constructor(db: DB, codeGenerator?: CodeGenerator) {
        this.db = new AsyncSqlite(db);
        this.generator = codeGenerator ? codeGenerator : new SimpleCodeGenerator();
    }

    public async Initialize(): Promise<void> {
        await this.db.Run(`CREATE TABLE IF NOT EXISTS surveys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT UNIQUE,
            title TEXT NOT NULL,
            closed INTEGER NOT NULL DEFAULT 0
        )`);

        await this.db.Run(`CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            survey_id INTEGER NOT NULL,
            entry TEXT NOT NULL,
            date INTEGER NOT NULL,
            submitter TEXT NOT NULL,
            FOREIGN KEY (survey_id) REFERENCES surveys(id)
        )`);
    }

    public async InsertSubmission(submission: InsertSubmission, survey: Survey): Promise<Survey | undefined> {
        const query = `
            INSERT INTO submissions (
                survey_id,
                entry,
                date,
                submitter
            ) VALUES(
                $survey_id,
                $entry,
                $date,
                $submitter
            )`;

        const result = await this.db.Run(query, {
            $survey_id: survey.id,
            $entry: submission.entry,
            $date: submission.date.getTime(),
            $submitter: submission.submitter,
        });

        return await this.GetSurvey(survey.id);
    }

    public async GetSurvey(id: number): Promise<Survey | undefined> {
        const query = `
            SELECT
                s.id,
                s.code,
                s.title,
                s.closed,
                sm.id AS sm_id,
                sm.entry,
                sm.date,
                sm.submitter
            FROM surveys s
            LEFT JOIN submissions sm ON s.id = sm.survey_id
            WHERE s.id = $id
        `;

        const result = await this.db.All(query, {
            $id: id,
        });

        return this.ProcessSurveyResult(result);
    }

    private ProcessSurveyResult(result: AllResult): Survey | undefined {
        const rows = result.rows;

        if (rows.length <= 0) {
            return;
        }

        const survey: Survey = {
            code: rows[0].code,
            id: rows[0].id,
            title: rows[0].title,
            submissions: [],
            closed: Boolean(rows[0].closed),
        };

        for (const row of rows) {
            if (row.sm_id === null) {
                continue;
            }

            survey.submissions.push({
                submitter: row.submitter,
                date: new Date(row.date),
                entry: row.entry,
                id: row.sm_id,
                survey_id: row.id,
            });
        }

        return survey;
    }

    public async GetSurveyByCode(code: string): Promise<Survey | undefined> {
        const query = `
            SELECT
                s.id,
                s.code,
                s.title,
                s.closed,
                sm.id AS sm_id,
                sm.entry,
                sm.date,
                sm.submitter
            FROM surveys s
            LEFT JOIN submissions sm ON s.id = sm.survey_id
            WHERE s.code = $code
        `;

        const result = await this.db.All(query, {
            $code: code,
        });

        return this.ProcessSurveyResult(result);
    }

    public async CreateSurvey(survey: InsertSurvey): Promise<Survey | undefined> {
        const result = await this.db.Run(`INSERT INTO surveys (title) VALUES ($title)`, {
            $title: survey.title,
        });

        const id = result.lastID;
        const code = this.generator.Generate(id);

        const update = await this.db.Run(`UPDATE surveys SET code = $code WHERE id = $id`, {
            $code: code,
            $id: id,
        });

        return {
            ...survey,
            id: id,
            code: code,
            submissions: [],
            closed: false,
        };
    }

    public async GetSurveys(): Promise<Survey[] | undefined> {
        const query = `
            SELECT
                id,
                code,
                title
            FROM surveys
            WHERE closed = 0
        `;

        const surveys = await this.db.All(query);

        const result: Survey[] = [];

        for (const row of surveys.rows) {
            result.push({
                closed: false,
                id: row.id,
                code: row.code,
                title: row.title,
                submissions: [],
            });
        }

        return result;
    }

    public async CloseSurvey(id: number): Promise<void> {
        const query = `
            UPDATE surveys
            SET closed = 1
            WHERE id = $id
        `;

        await this.db.Run(query, { $id: id });
    }
}
