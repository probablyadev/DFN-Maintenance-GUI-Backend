/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

// Containers
import { App } from './containers/AppContainer';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import ProtectedView from './components/ProtectedView';
import Analytics from './components/Analytics';
import NotFound from './components/NotFound';

import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
    <Route path="/" component={App}>
        <Route path="main" component={requireAuthentication(ProtectedView)} />
        <Route path="login" component={requireNoAuthentication(LoginView)} />
        <Route path="home" component={requireNoAuthentication(HomeContainer)} />
        <Route path="analytics" component={requireAuthentication(Analytics)} />
        <Route path="*" component={DetermineAuth(NotFound)} />
    </Route>
);
