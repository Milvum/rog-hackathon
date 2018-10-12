export default interface Submission extends InsertSubmission {
    id: number;
    survey_id: number;
}

export interface InsertSubmission {
    submitter: string;
    entry: string;
    date: Date;
}
