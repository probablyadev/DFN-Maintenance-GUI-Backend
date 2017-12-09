import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Redirect, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles';

import configureStore from './store/configureStore';
import routes from './routes';

require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');

injectTapEventPlugin();
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store = {store}>
            <Router history = {history}>
                <Redirect from = "/" to = "main" />
                {routes}
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
