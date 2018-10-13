import { CreateAction, ThunkResult } from './Actions';
import ISurvey from '../models/Survey';
import { ActionsUnion } from './ActionsUnion';
import Instance from '../models/Instance';

export const SURVEYS_RECEIVED = '[api] SURVEYS RECEIVED';
export const REQUESTING_SURVEYS = '[api] REQUESTING SURVEYS';
export const REQUESTING_DATA = '[api] REQUESTING DATA';
export const DATA_RECEIVED = '[api] DATA RECEIVED';

export interface IData {
    name: string; instances: Instance[];
}

export const ApiActions = {
    surveysReceived: (surveys: ISurvey[]) => CreateAction(SURVEYS_RECEIVED, surveys),
    requestingSurveys: () => CreateAction(REQUESTING_SURVEYS),
    requestingData: () => CreateAction(REQUESTING_DATA),
    dataReceived: (data: IData[]) => CreateAction(DATA_RECEIVED, data),
};

export type ApiActionsUnion = ActionsUnion<typeof ApiActions>;

export function fetchSurveys(): ThunkResult<void> {
    return (dispatch, getState) => {
        return;
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

export function fetchData(): ThunkResult<void> {
    return async (dispatch, getState) => {
        dispatch(ApiActions.requestingData());
        const data = await getState().injector.api.GetData();
        dispatch(ApiActions.dataReceived(data));
    };
}
