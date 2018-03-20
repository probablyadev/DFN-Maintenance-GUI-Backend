import {call, put} from 'redux-saga/effects';

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer ? reducer(state, action.payload) : state;
    };
}

export function* fetchEntity(entity, api, {data}) {
    try {
        yield put(entity.request());

        const token = localStorage.getItem('token');
        let response;

        if (args === undefined) {
            response = yield call(api, token);
        } else {
            response = yield call(api, token, data);
        }

        yield put(entity.success(response.data));
    } catch (error) {
        yield put(entity.failure(error.message));
    } finally {
        yield put(entity.fulfill());
    }
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
}
