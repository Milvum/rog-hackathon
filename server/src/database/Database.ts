import Submission, { InsertSubmission } from "../survey/Submission";
import Survey, { InsertSurvey } from "../survey/Survey";

export default interface Database {
    InsertSubmission(submission: InsertSubmission, survey: Survey): Promise<Survey | undefined>;
    GetSurvey(id: number): Promise<Survey | undefined>;
    GetSurveyByCode(code: string): Promise<Survey | undefined>;
    CreateSurvey(survey: InsertSurvey): Promise<Survey | undefined>;
    GetSurveys(): Promise<Survey[] | undefined>;
    CloseSurvey(id: number): Promise<void>;
}
