import {all} from 'redux-saga/effects';

import {authSagas} from './auth';
import {hddSagas, miscSagas, networkSagas, timeSagas} from './api';


export default function* rootSaga() {
    yield all([
        ...authSagas,
        ...hddSagas,
        ...miscSagas,
        ...networkSagas,
        ...timeSagas
    ])
}
