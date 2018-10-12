import { USER_JOIN, USER_PART } from '../actions/UserActions';
import { AppActions } from './Reducer';

export interface IUserState {
    users: string[];
}

const users = (state: IUserState = { users: [] }, action: AppActions) => {
    switch (action.type) {
        case USER_JOIN: {
            const { payload: user } = action;
            return {
                ...state,
                users: state.users.concat(user),
            };
        }
        case USER_PART: {
            const { payload: user } = action;
            return {
                ...state,
                users: state.users.filter((item) => item !== user),
            };
        }
        default: return state;
    }
};

export default users;
