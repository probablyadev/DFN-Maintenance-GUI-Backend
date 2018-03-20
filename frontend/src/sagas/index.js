import {all} from 'redux-saga/effects';

import {hddSagas} from './hdd';
import {miscSagas} from './misc';

export default function* rootSaga() {
    yield all([
        ...hddSagas,
        ...miscSagas
    ])
}
