import {createReducer} from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

export default createReducer(initialState, {
    [ActionTypes.login.TRIGGER]: (state) =>
        Object.assign({}, state, {
            loading: true,
            statusText: null
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
            error: `Authentication Error: ${payload.message}`
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
