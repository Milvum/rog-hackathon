import { RequestHandler } from "express";
import Database from "../database/Database";
import { InsertSurvey } from "../survey/Survey";

export default class SurveyRouter {
    public constructor(private readonly db: Database) { }

    public readonly All: RequestHandler = async (req, res, next) => {
        const surveys = await this.db.GetSurveys();

        if (!surveys) {
            return res
                .status(500)
                .send("Error getting all surveys");
        }

        return res
            .status(200)
            .send(surveys);
    }

    public readonly Create: RequestHandler = async (req, res, next) => {
        const topic: string | undefined = req.query.topic;

        if (!topic || topic === "") {
            return res
                .status(400)
                .send("Must provide a topic");
        }

        const insert: InsertSurvey = {
            title: topic,
        };

        const survey = await this.db.CreateSurvey(insert);

        if (!survey) {
            return res
                .status(500)
                .send("Error creating new survey");
        }

        return res
            .status(200)
            .send(survey);
    }

    public readonly Get: RequestHandler = async (req, res, next) => {
        const code = req.params.code;

        if (!code) {
            return res
                .status(400)
                .send("Most provide a code");
        }

        const survey = await this.db.GetSurveyByCode(code);

        if (!survey) {
            return res
                .status(404)
                .send("Cannot find survey matching code");
        }

        return res
            .status(200)
            .send(survey);
    }
}
