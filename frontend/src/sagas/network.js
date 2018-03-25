import {takeLatest} from 'redux-saga/effects';

import {fetchEntity} from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';
import NetworkAPIService from '../utils/api/NetworkAPIService';

export const networkSagas = [
    takeLatest(
        ActionTypes.checkVPN.TRIGGER,
        fetchEntity,
        ActionTypes.checkVPN,
        NetworkAPIService.checkVPN)
];
