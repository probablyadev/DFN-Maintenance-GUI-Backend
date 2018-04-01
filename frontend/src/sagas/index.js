import { all } from 'redux-saga/effects'; // eslint-disable-line

import authSagas from './auth';
import * as apiSagas from './api';

export default function* rootSaga() {
    yield all([ // eslint-disable-line redux-saga/no-unhandled-errors
        ...authSagas,
        ...apiSagas
    ]);
}
