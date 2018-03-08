import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import reducers from './reducers';
import App from './containers/App';

import Page404 from 'routes/404/components/404'

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    reducers,
    undefined,
    compose(applyMiddleware(middleware))
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App}/>
                <Route component={Page404}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
