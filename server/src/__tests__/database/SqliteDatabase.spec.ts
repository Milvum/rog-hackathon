import { Database as SQL3Database } from "sqlite3";
import SqliteDatabase from "../../database/SqliteDatabase";
import Survey, { InsertSurvey } from "../../survey/Survey";
import CodeGenerator from "../../code/CodeGenerator";
import Submission, { InsertSubmission } from "../../survey/Submission";

const TEST_TITLE = "TEST_TITLE";
const TEST_ENTRY = "TEST_ENTRY";
const TEST_SUBMITTER = "TEST_SUBMITTER";

describe("SqliteDatabase", () => {
    let sqlite_db: SQL3Database;
    let db: SqliteDatabase;
    let generator: CodeGenerator;

    beforeEach(async () => {
        sqlite_db = new SQL3Database(":memory:");

        const generateCallMock = jest.fn<string>();

        const Mock = jest.fn<CodeGenerator>(() => ({
            Generate: (input: number) => generateCallMock(),
        }));

        generateCallMock
            .mockReturnValueOnce("AAAA")
            .mockReturnValueOnce("AAAB");

        generator = new Mock();

        db = new SqliteDatabase(sqlite_db, generator);

        await db.Initialize();
    });

    afterEach(() => {
        sqlite_db.close();
    });

    /**
     * Tests that our initalize script does not break
     * when the tables already exist.
     */
    test("Create Database Twice", async () => {
        expect(async () => await db.Initialize()).not.toThrow();
    });

    test("Create default", async () => {
        const def = new SqliteDatabase(sqlite_db);

        expect(async () => await def.Initialize()).not.toThrow();
    });

    /**
     * Tests that we can create a survey with the provided code generator
     */
    test("Create a survey", async () => {
        const expected: Survey = {
            code: "AAAA",
            id: 1,
            submissions: [],
            title: TEST_TITLE,
            closed: false,
        };

        const result = await db.CreateSurvey({
            title: TEST_TITLE,
        });

        expect(result).toEqual(expected);
    });

    test("Get Survey by existing ID", async () => {
        const survey = await db.CreateSurvey({
            title: TEST_TITLE,
        });

        const id = 1;

        const expected: Survey = {
            code: "AAAA",
            id: id,
            submissions: [],
            title: TEST_TITLE,
            closed: false,
        };

        const actual = await db.GetSurvey(id);

        expect(actual).toEqual(expected);
    });

    test("Get Survey by existing code", async () => {
        const survey = await db.CreateSurvey({
            title: TEST_TITLE,
        });

        const code = "AAAA";

        const expected: Survey = {
            code: code,
            id: 1,
            submissions: [],
            title: TEST_TITLE,
            closed: false,
        };

        const actual = await db.GetSurveyByCode(code);

        expect(actual).toEqual(expected);
    });

    test("Get Survey by non-existing ID", async () => {
        const id = 2;

        const actual = await db.GetSurvey(id);

        expect(actual).toBeUndefined();
    });

    test("Get Survey by non-existing code", async () => {
        const code = "ABCD";

        const actual = await db.GetSurveyByCode(code);

        expect(actual).toBeUndefined();
    });

    test("Get Survey by existing ID with Submission", async () => {
        const survey = await db.CreateSurvey({
            title: TEST_TITLE,
        });

        const date = new Date();

        const entry: InsertSubmission = {
            submitter: TEST_SUBMITTER,
            date: date,
            entry: TEST_ENTRY,
        };

        const actual = await db.InsertSubmission(entry, survey!);

        const id = 1;

        const expected: Survey = {
            code: "AAAA",
            id: id,
            submissions: [
                {
                    date: date,
                    entry: TEST_ENTRY,
                    id: 1,
                    submitter: TEST_SUBMITTER,
                    survey_id: id,
                },
            ],
            title: TEST_TITLE,
            closed: false,
        };

        expect(actual).toEqual(expected);
    });

    test("Get Surveys", async () => {
        const survey1 = await db.CreateSurvey({
            title: "Title 1",
        });

        const survey2 = await db.CreateSurvey({
            title: "Title 2",
        });

        const actual = await db.GetSurveys();

        expect(actual).toBeDefined();
        expect(actual!.length).toBe(2);

        expect(actual).toContainEqual(survey1);
        expect(actual).toContainEqual(survey2);
    });

    test("Close Survey", async () => {
        const survey = await db.CreateSurvey({
            title: TEST_TITLE,
        });

        await db.CloseSurvey(survey!.id);

        const actual = await db.GetSurvey(survey!.id);

        const expected: Survey = {
            closed: true,
            code: survey!.code,
            id: survey!.id,
            submissions: [],
            title: survey!.title,
        };

        expect(actual).toEqual(expected);
    });
});
