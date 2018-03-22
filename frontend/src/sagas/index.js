import {all} from 'redux-saga/effects';

import {authSagas} from './auth';
import {hddSagas} from './hdd';
import {miscSagas} from './misc';
import {timeSagas} from './time';

export default function* rootSaga() {
    yield all([
        ...authSagas,
        ...hddSagas,
        ...miscSagas,
        ...timeSagas
    ])
}
