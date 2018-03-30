import { push } from 'react-router-redux';
import { takeLatest, put, call, select } from 'redux-saga/effects';

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
    localStorage.removeItem('token');

    yield put(push('/login'));
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

// noinspection JSAnnotator
export const authSagas = [
    yield takeLatest(ActionTypes.login.TRIGGER, login),
    yield takeLatest(ActionTypes.LOGOUT, logout),
    yield takeLatest(ActionTypes.checkAuth.TRIGGER, checkAuth),
    yield takeLatest(ActionTypes.checkAuth.FAILURE, logout)
];
