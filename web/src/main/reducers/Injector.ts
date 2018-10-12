import { ISurveySocketConnector } from '../api/ISurveySocket';
import IApi from '../api/Api';
import { AppActions } from './Reducer';

interface IState {
    api: IApi;
    connector: ISurveySocketConnector;
}

export function createInjectorReducer(api: IApi, connector: ISurveySocketConnector) {
    const initialState: IState = {
        api,
        connector,
    };

    return (state: IState = initialState, action: AppActions) => {
        return state;
    };
}
