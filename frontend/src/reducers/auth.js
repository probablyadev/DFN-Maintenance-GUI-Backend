import {createReducer} from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';

const initialStateLogin = {
    token: null,
    userName: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const initialStateCheckAuth = {
    isAuthenticated: false,
    loading: false,
    error: null
};

export const login = createReducer(initialStateLogin, {
    [ActionTypes.login.TRIGGER]: (state) =>
        Object.assign({}, state, {
            loading: true,
            error: null
        }),
    [ActionTypes.login.SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            token: payload.token,
            userName: payload.email,
            isAuthenticated: true
        }),
    [ActionTypes.login.FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
            error: `Authentication Error: ${payload}`
        }),
    [ActionTypes.login.FULFILL]: (state) =>
        Object.assign({}, state, {
            loading: false
        }),
    [ActionTypes.LOGOUT]: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null
        })
});

export const checkAuth = createReducer(initialStateCheckAuth, {
    [ActionTypes.checkAuth.TRIGGER]: (state) =>
        Object.assign({}, state, {
            loading: true,
            error: null
        }),
    [ActionTypes.checkAuth.SUCCESS]: (state) =>
        Object.assign({}, state, {
            isAuthenticated: true
        }),
    [ActionTypes.checkAuth.FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            error: `${payload}`
        }),
    [ActionTypes.checkAuth.FULFILL]: (state) =>
        Object.assign({}, state, {
            loading: false
        })
});
