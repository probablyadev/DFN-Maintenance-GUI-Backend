import * as ActionTypes from '../constants/ActionTypes';

export function login(email, password) {
    return {
        type: ActionTypes.login.TRIGGER,
        data: {
            email,
            password
        }
    };
}

export function logout() {
    return {
        type: ActionTypes.LOGOUT
    };
}
