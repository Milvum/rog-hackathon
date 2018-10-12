import { ISurveySocketConnector, ISurveySocket, ConnectionOptions } from '../ISurveySocket';
import FakeSurveySocket from './FakeSocket';
import { Dispatch } from 'redux';
import ISurvey from '../../models/Survey';

export default class FakeSurveySocketConnector implements ISurveySocketConnector {
    public Create(dispatch: Dispatch, survey: ISurvey, options: ConnectionOptions): ISurveySocket {
        return new FakeSurveySocket(dispatch, survey, options);
    }
}
