import { AppActions } from './Reducer';
import ISurvey from '../models/Survey';
import { SURVEYS_RECEIVED, DATA_RECEIVED, IData } from '../actions/ApiActions';

export interface ISurveysState {
    surveys: ISurvey[];
    data: IData[];
}

const initialState: ISurveysState = {
    surveys: [],
    data: [],
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
        case DATA_RECEIVED: {
            const { payload: s} = action;
            return {
                ...state,
                data: s,
            };
        }
        default: {
            return state;
        }
    }
};

export default surveys;
