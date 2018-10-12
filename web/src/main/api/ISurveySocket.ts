import { Dispatch } from 'redux';
import ISurvey from '../models/Survey';

export type ConnectMode = 'host' | 'submitter';

interface IConectionOptions {
    mode: ConnectMode;
}

interface IHostConnectionOptions extends IConectionOptions {
    mode: 'host';
}

interface ISubmitterConnectionOptions extends IConectionOptions {
    mode: 'submitter';
    name: string;
}

export type ConnectionOptions = IHostConnectionOptions | ISubmitterConnectionOptions;

export interface ISurveySocketConnector {
    Create(dispatch: Dispatch, survey: ISurvey, options: ConnectionOptions): ISurveySocket;
}

export interface ISurveySocket {
    CloseSurvey(): void;
    /**
     * Leaves the survey.
     */
    LeaveSurvey(): void;
    /**
     * Attempts to submit a new entry to the survey. This can only succeed when this socket is a submitter
     * and if the survey is not closed.
     *
     * @param submission Submission
     */
    Submit(submission: string): void;
}
