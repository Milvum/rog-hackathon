import { combineReducers, Reducer, AnyAction } from 'redux';
import users from './Users';
import { SurveyActionsUnion } from '../actions/SurveyActions';
import { UserActionsUnion } from '../actions/UserActions';
import surveys from './Surveys';
import { ApiActionsUnion } from '../actions/ApiActions';
import surveyReducer from './Survey';
import IApi from '../api/Api';
import { ISurveySocketConnector } from '../api/ISurveySocket';
import { createInjectorReducer } from './Injector';

type ExtractType<T> = T extends Reducer<infer X, AnyAction> ? X : null;
export type AppState = ExtractType<ReturnType<typeof createReducer>>;

export function createReducer(api: IApi, connector: ISurveySocketConnector) {
    return combineReducers({
        users,
        surveys,
        survey: surveyReducer,
        injector: createInjectorReducer(api, connector),
    });
}

export type AppActions = SurveyActionsUnion | UserActionsUnion | ApiActionsUnion;
