import { call, put } from 'redux-saga/effects';

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer ? reducer(state, action.payload) : state;
    };
}

export function* fetchEntity(entity, api, { data, onNotification, onSuccess, onFailure }) {
    try {
        const token = localStorage.getItem('token');
        let response;

        if (onNotification !== undefined) {
            onNotification();
        }

        if (data === undefined) {
            response = yield call(api, token);
        } else {
            response = yield call(api, token, data);
        }

        if (onSuccess !== undefined) {
            onSuccess(response);
        }

        yield put(entity.success(response.data));
    } catch (error) {
        if (onFailure !== undefined) {
            onFailure(error);
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
