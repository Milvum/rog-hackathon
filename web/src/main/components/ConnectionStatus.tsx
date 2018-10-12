import * as React from 'react';
import { SurveyConnectionState } from '../reducers/Survey';

interface IProps {
    status: SurveyConnectionState;
}

export type ConnectionStatusProps = IProps;

const map: { [key: number]: string } = {};
map[SurveyConnectionState.Connected] = 'cs-connected';
map[SurveyConnectionState.Disconnected] = 'cs-disconnected';
map[SurveyConnectionState.Failed] = 'cs-failed';
map[SurveyConnectionState.Connecting] = 'cs-connecting';

export default class ConnectionStatus extends React.PureComponent<ConnectionStatusProps> {
    public render() {
        return (
            <div className={`parallelogram cs ${map[this.props.status]}`} />
        );
    }
}
