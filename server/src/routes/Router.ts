import { Express, static as ExpressStatic } from "express";
import Database from "../database/Database";
import SurveyRouter from "./SurveyRouter";

export const Router = (app: Express, db: Database) => {
    const surveyRouter = new SurveyRouter(db);

    app.get("/survey", surveyRouter.All);
    app.post("/survey", surveyRouter.Create);
    app.get("/survey/:code", surveyRouter.Get);
    app.use(ExpressStatic("public"));
};
