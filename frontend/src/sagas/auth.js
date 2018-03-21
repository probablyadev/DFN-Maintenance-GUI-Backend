import {push} from "react-router-redux";

import * as ActionTypes from '../constants/ActionTypes';
import UserAPIService from '../utils/api/UserAPIService';

function* login({data}) {
    try {
        const {email, password} = data;
        const response = yield call(UserAPIService.getToken, email, password);

        localStorage.setItem('token', response.data.token);

        yield put(ActionTypes.login.success(email, response.data.token));
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

export const authSagas = [
    takeLatest(ActionTypes.login.TRIGGER, login),
    takeLatest(ActionTypes.LOGOUT, logout)
];
