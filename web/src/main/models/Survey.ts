import ISubmission from './Submission';

export default interface ISurvey {
    id: number;
    code: string;
    closed: boolean;
    title: string;
    submissions: ISubmission[];
}
