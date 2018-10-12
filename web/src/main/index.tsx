import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App';

import '../styles/main';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppState, AppActions, createReducer } from './reducers/Reducer';
import { fetchSurveys } from './actions/ApiActions';
import { createHashHistory } from 'history';
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import { leaveSurvey } from './actions/SurveyActions';
import { Api } from './api/Api';
import SocketConnector from './api/Socket';

const history = createHashHistory();
export const api = new Api();
export const connector = new SocketConnector();

const store = createStore(
    connectRouter(history)(createReducer(api, connector)),
    applyMiddleware(
        thunkMiddleware as ThunkMiddleware<AppState, AppActions>,
        routerMiddleware(history),
    ),
);

history.listen((location) => {
    if (location.pathname === '/') {
        store.dispatch(leaveSurvey());
    }
});

export type DispatchType = typeof store.dispatch;

store.dispatch(fetchSurveys());

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
