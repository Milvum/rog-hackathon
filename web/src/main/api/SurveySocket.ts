import { ISurveySocket, ConnectionOptions } from './ISurveySocket';
import { Dispatch } from 'redux';
import ISurvey from '../models/Survey';
import * as SocketIO from 'socket.io-client';
import { SurveyActions } from '../actions/SurveyActions';
import { UserActions } from '../actions/UserActions';

const HOST = 'http://localhost:3000/';

export default class SurveySocket implements ISurveySocket {
    private socket: SocketIOClient.Socket;

    public constructor(
        private readonly dispatch: Dispatch,
        private readonly survey: ISurvey,
        private readonly options: ConnectionOptions) {
        let query: string;

        if (options.mode === 'host') {
            query = `room=${survey.code}&mode=${options.mode}`;
        } else {
            query = `room=${survey.code}&mode=${options.mode}&name=${options.name}`;
        }

        this.socket = SocketIO(HOST, {
            query,
        });

        this.ConnectHandlers();
    }

    private ConnectHandlers() {
        this.socket.on('connect', () => {
            this.dispatch(SurveyActions.surveyHosted({
                survey: this.survey,
                socket: this,
            }));
        });

        if (this.options.mode === 'host') {
            this.socket.on('submission', (survey: ISurvey) => {
                this.dispatch(SurveyActions.submissionReceived({ survey, socket: this }));
            });

            this.socket.on('userConnected', (name: string) => {
                this.dispatch(UserActions.userJoin(name));
            });
            this.socket.on('userDisconnected', (name: string) => {
                this.dispatch(UserActions.userPart(name));
            });
        }

        this.socket.on('surveyClosed', (survey: ISurvey) => {
            this.dispatch(SurveyActions.surveyClosed({ survey, socket: this }));
        });

        this.socket.on('error', (e: any) => { console.error(e); });
    }

    public CloseSurvey(): void {
        if (this.options.mode === 'host') {
            this.socket.emit('close');
        }
    }
    public LeaveSurvey(): void {
        this.socket.disconnect();
    }
    public Submit(submission: string): void {
        if (this.options.mode === 'submitter') {
            this.socket.emit('submit', submission);
        }
    }

}
