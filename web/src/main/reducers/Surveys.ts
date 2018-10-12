import { AppActions } from './Reducer';
import ISurvey from '../models/Survey';
import { SURVEYS_RECEIVED } from '../actions/ApiActions';

export interface ISurveysState {
    surveys: ISurvey[];
}

const initialState: ISurveysState = {
    surveys: [],
};

const surveys = (state: ISurveysState = initialState, action: AppActions) => {
    switch (action.type) {
        case SURVEYS_RECEIVED: {
            const { payload: s } = action;
            return {
                ...state,
                surveys: s,
            };
        }
        default: {
            return state;
        }
    }
};

export default surveys;
