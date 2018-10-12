import * as React from 'react';
import { SurveyState, SurveyConnectionState } from '../reducers/Survey';
import ISurvey from '../models/Survey';
import ConnectionStatus from './ConnectionStatus';
import SubmissionList from './SubmissionList';

export interface IProps {
    users: string[];
    survey: SurveyState;
    code: string;
}

export interface IDispatchProps {
    onCloseSurvey: () => void;
    onConnectSurvey: (code: string) => void;
}

export type Props = IProps & IDispatchProps;

export default class Survey extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public componentWillMount() {
        // @TODO: This doesn't feel like the right place.
        // Attempt to join a room if we're not connected to a survey.
        if (this.props.survey.state === SurveyConnectionState.Disconnected) {
            this.props.onConnectSurvey(this.props.code);
        }
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
                <button onClick={() => this.props.onConnectSurvey(this.props.code)}>Connect</button>
            </div>
        );
    }

    private renderFailed() {
        return (
            <div>
                <ConnectionStatus status={this.props.survey.state} />
                <button onClick={() => this.props.onConnectSurvey(this.props.code)}>Retry</button>
            </div>
        );
    }

    private renderClosedState(closed: boolean) {
        if (closed) {
            return (
                <div className="parallelogram button">
                    <span className="skew-fix">Closed</span>
                </div>
            );
        } else {
            return (
                <a
                    className="parallelogram button main"
                    onClick={this.props.onCloseSurvey}
                >
                    <span className="skew-fix">Close</span>
                </a>
            );
        }
    }

    private renderConnected(survey: ISurvey) {
        return (
            <div>
                <div className="header">
                    <ConnectionStatus status={this.props.survey.state} />
                    {this.renderClosedState(survey.closed)}
                </div>
                <h1>Topic: {survey.title}</h1>
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
