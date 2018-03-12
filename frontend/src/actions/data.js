import {FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA} from '../constants/ActionTypes';
import {parseJSON} from '../utils/misc';
import UserAPIService from '../utils/api/UserAPIService';
import {logoutAndRedirect} from './auth';

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data
        },
    };
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST,
    };
}

export function fetchProtectedData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());

        UserAPIService.getUser(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.result));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}
