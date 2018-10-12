import * as React from 'react';
import { SurveyState, SurveyConnectionState } from '../reducers/Survey';
import ISurvey from '../models/Survey';
import SubmissionBox from './SubmissionBox';
import ConnectionStatus from './ConnectionStatus';
import SubmissionList from './SubmissionList';

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
                <ConnectionStatus status={this.props.survey.state} />
            </div>
        );
    }

    private renderDisconnected() {
        return (
            <div>
                <ConnectionStatus status={this.props.survey.state} />
                <button onClick={this.connectSurvey}>Connect</button>
            </div>
        );
    }

    private renderFailed() {
        return (
            <div>
                <ConnectionStatus status={this.props.survey.state} />
                <button onClick={this.connectSurvey}>Retry</button>
            </div>
        );
    }

    private renderSubmissionBox(disabled: boolean) {
        if (disabled) {
            return (
                <div className="parallelogram">
                    <span className="skew-fix text-element">Survey ended</span>
                </div>
            );
        } else {
            return (
                <SubmissionBox onSubmission={this.props.onSubmission} />
            );
        }
    }

    private renderConnected(survey: ISurvey) {
        return (
            <div>
                <div className="header">
                    <ConnectionStatus status={this.props.survey.state} />
                    <div className="parallelogram button">
                        <span className="skew-fix">{survey.closed ? 'closed' : 'open'}</span>
                    </div>
                </div>
                <h1>Topic: {survey.title}</h1>
                {this.renderSubmissionBox(survey.closed)}
                <h1>Submissions</h1>
                <SubmissionList submissions={survey.submissions} />
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
