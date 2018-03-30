import { push } from 'react-router-redux'; // eslint-disable-line
import { takeLatest, put, call, select } from 'redux-saga/effects'; // eslint-disable-line

import * as ActionTypes from '../constants/ActionTypes';
import UserAPIService from '../utils/api/UserAPIService';
import { checkAuthSelector } from '../selectors/auth';

function* login({ data }) {
    try {
        const { email, password } = data;
        const response = yield call(UserAPIService.getToken, email, password);

        localStorage.setItem('token', response.data.token);

        yield put(ActionTypes.login.success({
            email,
            token: response.data.token
        }));
        yield put(push('/app/dashboard'));
    } catch (error) {
        yield put(ActionTypes.login.failure(error.message));
    } finally {
        yield put(ActionTypes.login.fulfill());
    }
}

function* logout() {
    try {
        localStorage.removeItem('token');

        yield put(push('/login'));
    } catch (error) {
        console.log(error); // eslint-disable-line no-console
    }
}

function* checkAuth() {
    try {
        const auth = yield select(checkAuthSelector);
        const token = localStorage.getItem('token');
        let tokenExists = false;

        if (token) {
            tokenExists = true;
        }

        if (auth.isAuthenticated || tokenExists) {
            const response = yield call(UserAPIService.isTokenValid, token);

            if (response.data.valid) {
                yield put(ActionTypes.checkAuth.success());
            } else {
                yield put(ActionTypes.checkAuth.failure('Invalid token'));
            }
        } else {
            yield put(ActionTypes.checkAuth.failure('Not authenticated, routing to login'));
        }
    } catch (error) {
        yield put(ActionTypes.checkAuth.failure(error.message));
    } finally {
        yield put(ActionTypes.checkAuth.fulfill());
    }
}

/* eslint-disable redux-saga/no-unhandled-errors, redux-saga/yield-effects */
const authSagas = [
    takeLatest(ActionTypes.login.TRIGGER, login),
    takeLatest(ActionTypes.LOGOUT, logout),
    takeLatest(ActionTypes.checkAuth.TRIGGER, checkAuth),
    takeLatest(ActionTypes.checkAuth.FAILURE, logout)
];
/* eslint-enable redux-saga/no-unhandled-errors, redux-saga/yield-effects */

export default authSagas;
