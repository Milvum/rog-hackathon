import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState, AppActions } from '../reducers/Reducer';

export interface IAction<T extends string> extends Action<T> {
    type: T;
}

export interface IActionWithPayload<T extends string, P> extends IAction<T> {
    payload: P;
}

export function CreateAction<T extends string>(type: T): IAction<T>;
export function CreateAction<T extends string, P>(type: T, payload: P): IActionWithPayload<T, P>;
export function CreateAction<T extends string, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : { type, payload };
}

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, AppActions>;
