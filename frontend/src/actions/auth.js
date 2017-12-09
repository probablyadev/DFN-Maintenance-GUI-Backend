import { browserHistory } from 'react-router';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
} from '../constants/constants';

import { parseJSON } from '../utils/misc';
import { get_token } from '../utils/api/user';


export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST,
    };
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        browserHistory.push('/');
    };
}

export function redirectToRoute(route) {
    return () => {
        browserHistory.push(route);
    };
}

export function loginUser(email, password) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return get_token(email, password)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.token));
                    browserHistory.push('/main');
                } catch (e) {
                    alert(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure({
                    response: {
                        status: 403,
                        statusText: 'Invalid username or password',
                    },
                }));
            });
    };
}
