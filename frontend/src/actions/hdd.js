import {checkHDD} from '../constants/ActionTypes';
import HDDAPIService from '../utils/api/HDDAPIService';

function* fetchEntity(entity, api, args) {
    try {
        yield put(entity.request());

        const token = localStorage.getItem('token');
        let response;

        if (args === undefined) {
            response = yield call(api, token);
        } else {
            response = yield call(api, token, args);
        }

        yield put(entity.success(response.data));
    } catch (error) {
        yield put(entity.failure(error.message));
    } finally {
        yield put(entity.fulfill());
    }
}

export function* checkHDDSaga() {
    yield takeLatest(checkHDD.TRIGGER, fetchEntity(checkHDD, HDDAPIService.checkHDD));
}
