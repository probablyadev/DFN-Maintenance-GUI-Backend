import { call, put } from 'redux-saga/effects';

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer ? reducer(state, action.payload) : state;
    };
}

export function* fetchEntity(entity, api, { data, notifications }) {
    try {
        const token = localStorage.getItem('token');
        let response;

        if (data === undefined) {
            response = yield call(api, token);
        } else {
            response = yield call(api, token, data);
        }

        if (notifications !== undefined && notifications.successNotification !== undefined) {
            notifications.notificationSystem.addNotification(notifications.successNotification);
        }

        yield put(entity.success(response.data));
    } catch (error) {
        if (notifications !== undefined && notifications.failureNotification !== undefined) {
            notifications.notificationSystem.addNotification(notifications.failureNotification);
        }

        yield put(entity.failure(error.message));
    } finally {
        yield put(entity.fulfill());
    }
}

export function validateEmail(email) {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
}
