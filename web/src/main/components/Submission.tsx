import * as React from 'react';
import { SurveyState, SurveyConnectionState } from '../reducers/Survey';
import ISurvey from '../models/Survey';
import SubmissionBox from './SubmissionBox';

export type Props = ISubmissionProps & IDispatchProps;
export type SubmissionProps = ISubmissionProps;
export type SubmissionDispatchProps = IDispatchProps;
interface ISubmissionProps {
    survey: SurveyState;
    code: string;
    currentUser: string;
}

interface IDispatchProps {
    onConnectSurvey: (code: string, name: string) => void;
    onSubmission: (submission: string) => void;
}

export default class Submission extends React.PureComponent<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public componentWillMount() {
        // @TODO: This doesn't feel like the right place.
        // Attempt to join a room if we're not connected to a survey.
        if (this.props.survey.state === SurveyConnectionState.Disconnected) {
            this.connectSurvey();
        }
    }

    private connectSurvey() {
        this.props.onConnectSurvey(this.props.code, this.props.currentUser);
    }

    private renderConnecting() {
        return (
            <div>
                <p>Connecting to room...</p>
            </div>
        );
    }

    private renderDisconnected() {
        return (
            <div>
                <p>Not connected to any room</p>
                <button onClick={this.connectSurvey}>Connect</button>
            </div>
        );
    }

    private renderFailed() {
        return (
            <div>
                <p>Failed to connect to room</p>
                <button onClick={this.connectSurvey}>Retry</button>
            </div>
        );
    }

    private renderConnected(survey: ISurvey) {
        return (
            <div>
                <p>Connected to room!</p>
                <h1>{survey.title}</h1>
                {survey.closed ? (<h2>Survey Closed</h2>) : null}
                <SubmissionBox onSubmission={this.props.onSubmission} disabled={survey.closed} />
            </div>
        );
    }

    public render() {
        switch (this.props.survey.state) {
            case SurveyConnectionState.Connected: return this.renderConnected(this.props.survey.survey);
            case SurveyConnectionState.Connecting: return this.renderConnecting();
            case SurveyConnectionState.Disconnected: return this.renderDisconnected();
            case SurveyConnectionState.Failed: return this.renderFailed();
        }
    }
}
