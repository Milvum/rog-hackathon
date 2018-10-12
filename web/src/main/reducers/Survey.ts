import { AppActions } from './Reducer';
import ISurvey from '../models/Survey';
import {
    SUBMISSION_RECEIVED,
    SURVEY_HOSTED,
    HOSTING_SURVEY,
    JOINING_SURVEY,
    SURVEY_JOINED,
    SURVEY_CLOSED,
} from '../actions/SurveyActions';
import { ISurveySocket } from '../api/ISurveySocket';

export const enum SurveyConnectionState {
    Connecting,
    Connected,
    Disconnected,
    Failed,
}

interface IConnectedSurveyState {
    survey: ISurvey;
    state: SurveyConnectionState.Connected;
    socket: ISurveySocket;
}

interface IConnectingSurveyState {
    state: SurveyConnectionState.Connecting;
}

interface IDisconnectedSurveyState {
    state: SurveyConnectionState.Disconnected;
}

interface IFailedSurveyState {
    state: SurveyConnectionState.Failed;
    error: string;
}

export type SurveyState = IConnectedSurveyState
    | IConnectingSurveyState
    | IDisconnectedSurveyState
    | IFailedSurveyState;

const initialState: SurveyState = {
    state: SurveyConnectionState.Disconnected,
};

const surveyReducer = (state: SurveyState = initialState, action: AppActions): SurveyState => {
    switch (action.type) {
        case SUBMISSION_RECEIVED: {
            const { payload: submission } = action;

            if (state.state !== SurveyConnectionState.Connected) {
                return state;
            }

            if (state.survey.id !== submission.survey.id) {
                return state;
            }

            return {
                ...state,
                ...submission,
            };
        }
        case HOSTING_SURVEY:
        case JOINING_SURVEY: {
            return {
                state: SurveyConnectionState.Connecting,
            };
        }
        case SURVEY_JOINED:
        case SURVEY_HOSTED: {
            const { payload: surveyPayload } = action;
            return {
                ...surveyPayload,
                state: SurveyConnectionState.Connected,
            };
        }
        case SURVEY_CLOSED: {
            if (state.state !== SurveyConnectionState.Connected) {
                return state;
            }

            const { payload: surveyPayload } = action;

            return {
                ...state,
                ...surveyPayload,
                state: SurveyConnectionState.Connected,
            };
        }
        default: return state;
    }
};

export default surveyReducer;
