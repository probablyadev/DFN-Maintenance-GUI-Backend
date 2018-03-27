import {all} from 'redux-saga/effects';

import {authSagas} from './auth';
import {configFileSagas, hddSagas, miscSagas, networkSagas, timeSagas} from './api';


export default function* rootSaga() {
    yield all([
        ...authSagas,
        ...configFileSagas,
        ...hddSagas,
        ...miscSagas,
        ...networkSagas,
        ...timeSagas
    ])
}
