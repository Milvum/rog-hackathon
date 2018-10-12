import { ISurveySocketConnector, ISurveySocket, ConnectionOptions } from './ISurveySocket';
import { Dispatch } from 'redux';
import ISurvey from '../models/Survey';
import SurveySocket from './SurveySocket';

export default class SocketConnector implements ISurveySocketConnector {
    public Create(dispatch: Dispatch, survey: ISurvey, options: ConnectionOptions): ISurveySocket {
        return new SurveySocket(dispatch, survey, options);
    }
}
