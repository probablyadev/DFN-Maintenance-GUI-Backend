import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory, Redirect, Router} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './store/configureStore';
import routes from './routes';

require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');

injectTapEventPlugin();
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// https://material-ui-1dab0.firebaseapp.com/customization/themes/#configuration-variables
const theme = createMuiTheme();

ReactDOM.render(
    <MuiThemeProvider muiTheme={theme}>
        <Provider store={store}>
            <Router history={history}>
                <Redirect from="/" to="main"/>
                {routes}
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
