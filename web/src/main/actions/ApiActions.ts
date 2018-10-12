import { CreateAction, ThunkResult } from './Actions';
import ISurvey from '../models/Survey';
import { ActionsUnion } from './ActionsUnion';

export const SURVEYS_RECEIVED = '[api] SURVEYS RECEIVED';
export const REQUESTING_SURVEYS = '[api] REQUESTING SURVEYS';

export const ApiActions = {
    surveysReceived: (surveys: ISurvey[]) => CreateAction(SURVEYS_RECEIVED, surveys),
    requestingSurveys: () => CreateAction(REQUESTING_SURVEYS),
};

export type ApiActionsUnion = ActionsUnion<typeof ApiActions>;

export function fetchSurveys(): ThunkResult<void> {
    return (dispatch, getState) => {
        dispatch(ApiActions.requestingSurveys());
        getState().injector.api.AllSurveys().then((surveys) => {
            dispatch(ApiActions.surveysReceived(surveys));
        });
    };
}

export function createSurvey(topic: string): ThunkResult<Promise<ISurvey | undefined>> {
    return (dispatch, getState) => {
        return getState().injector.api.CreateSurvey(topic);
    };
}

export function fetchSurvey(code: string): ThunkResult<Promise<ISurvey | undefined>> {
    return (dispatch, getState) => {
        return getState().injector.api.GetSurvey(code);
    };
}
