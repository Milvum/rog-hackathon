import * as React from 'react';
import { SurveyState, SurveyConnectionState } from '../reducers/Survey';
import ISurvey from '../models/Survey';

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
                <p>Connecting to room...</p>
            </div>
        );
    }

    private renderDisconnected() {
        return (
            <div>
                <p>Not connected to any room</p>
                <button onClick={() => this.props.onConnectSurvey(this.props.code)}>Connect</button>
            </div>
        );
    }

    private renderFailed() {
        return (
            <div>
                <p>Failed to connect to room</p>
                <button onClick={() => this.props.onConnectSurvey(this.props.code)}>Retry</button>
            </div>
        );
    }

    private renderConnected(survey: ISurvey) {
        return (
            <div>
                <p>Connected to room!</p>
                <h1>{survey.title}</h1>
                <button onClick={this.props.onCloseSurvey}>Close Survey</button>
                <div>
                    {survey.submissions.map((submission, index) => (
                        <li key={index}>{`Submission from: ${submission.submitter} - ${submission.entry}`}</li>
                    ))}
                </div>
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
