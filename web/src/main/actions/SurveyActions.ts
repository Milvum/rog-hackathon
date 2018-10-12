import { CreateAction, ThunkResult } from './Actions';
import { ActionsUnion } from './ActionsUnion';
import ISurvey from '../models/Survey';
import { SurveyConnectionState } from '../reducers/Survey';
import { createSurvey, fetchSurvey } from './ApiActions';
import { ISurveySocket } from '../api/ISurveySocket';

export const SURVEY_JOINED = '[survey] JOINED';
export const SURVEY_HOSTED = '[survey] HOSTED';
export const SURVEY_CLOSED = '[survey] CLOSED';
export const SUBMISSION_RECEIVED = '[submission] RECEIVED';
export const HOSTING_SURVEY = '[survey] HOSTING';
export const HOSTING_FAILED = '[survey] HOSTING FAILED';
export const JOINING_SURVEY = '[survey] JOINING';
export const JOINING_FAILED = '[survey] JOINING FAILED';

export interface ISurveyPayload {
    survey: ISurvey;
    socket: ISurveySocket;
}

export const SurveyActions = {
    surveyHosted: (survey: ISurveyPayload) => CreateAction(SURVEY_HOSTED, survey),
    surveyJoined: (survey: ISurveyPayload) => CreateAction(SURVEY_JOINED, survey),
    submissionReceived: (survey: ISurveyPayload) => CreateAction(SUBMISSION_RECEIVED, survey),
    surveyClosed: (survey: ISurveyPayload) => CreateAction(SURVEY_CLOSED, survey),
    joiningSurvey: (code: string) => CreateAction(JOINING_SURVEY, code),
    joiningFailed: (code: string) => CreateAction(JOINING_FAILED, code),
    hostingSurvey: () => CreateAction(HOSTING_SURVEY),
    hostingFailed: () => CreateAction(HOSTING_FAILED),
};

export type SurveyActionsUnion = ActionsUnion<typeof SurveyActions>;

export function hostSurvey(topic: string): ThunkResult<Promise<ISurvey | undefined>> {
    return async (dispatch, getState) => {
        dispatch(SurveyActions.hostingSurvey());
        const survey = await dispatch(createSurvey(topic));

        if (survey) {
            const socket = getState().injector.connector.Create(dispatch, survey, {
                mode: 'host',
            });
        }

        return survey;
    };
}

export function connectSurvey(code: string): ThunkResult<void> {
    return async (dispatch, getState) => {
        dispatch(SurveyActions.hostingSurvey());
        const survey = await dispatch(fetchSurvey(code));

        if (!survey) {
            dispatch(SurveyActions.hostingFailed());
            return;
        }

        const socket = getState().injector.connector.Create(dispatch, survey, { mode: 'host' });
    };
}

export function joinSurvey(code: string, name: string): ThunkResult<void> {
    return async (dispatch, getState) => {
        dispatch(SurveyActions.joiningSurvey(code));
        const survey = await dispatch(fetchSurvey(code));

        if (!survey) {
            dispatch(SurveyActions.joiningFailed(code));
            return;
        }

        const socket = getState().injector.connector.Create(dispatch, survey, {
            mode: 'submitter',
            name,
        });
    };
}

export function submitSubmission(submission: string): ThunkResult<void> {
    return (dispatch, getState) => {
        const state = getState();

        if (state.survey.state !== SurveyConnectionState.Connected) {
            return;
        }

        state.survey.socket.Submit(submission);
    };
}

export function closeSurvey(): ThunkResult<void> {
    return (dispatch, getState) => {
        const state = getState();

        if (state.survey.state !== SurveyConnectionState.Connected) {
            return;
        }

        state.survey.socket.CloseSurvey();
    };
}

export function leaveSurvey(): ThunkResult<void> {
    return (dispatch, getState) => {
        const state = getState();

        if (state.survey.state !== SurveyConnectionState.Connected) {
            return;
        }

        state.survey.socket.LeaveSurvey();
    };
}
