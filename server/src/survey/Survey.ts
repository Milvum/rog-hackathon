import Submission from "./Submission";

export default interface Survey extends InsertSurvey {
    id: number;
    code: string;
    submissions: Submission[];
    closed: boolean;
}

export interface InsertSurvey {
    title: string;
}