import "babel-polyfill";

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from "history/createHashHistory";

import reduxStore from './stores'
import App from './containers/App';
import Page404 from 'routes/404/components/404'

const history = createHistory();
const store = reduxStore(history);

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
