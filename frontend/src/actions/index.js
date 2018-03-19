import {all} from 'redux-saga/effects';

import {hddSagas} from './hdd';

export default function* rootSaga() {
    yield all([
        ...hddSagas
    ])
}
