import browserHistory from 'react-router';

import {LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER} from '../constants/ActionTypes';
import UserService from '../utils/api/UserService';


export function loginUserSuccess(email, token) {
    localStorage.setItem('token', token);

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            email,
            token
        },
    };
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');

    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        },
    };
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    };
}

export function logout() {
    localStorage.removeItem('token');

    return {
        type: LOGOUT_USER
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

        return UserService.getToken(email, password)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(email, response.token));

                    browserHistory.push('/dashboard');
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
