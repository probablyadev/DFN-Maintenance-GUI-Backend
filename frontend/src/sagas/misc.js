import {takeLatest} from 'redux-saga/effects';

import {fetchEntity} from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';
import MiscAPIService from '../utils/api/MiscAPIService';

export const miscSagas = [
    takeLatest(
        ActionTypes.getHostname.TRIGGER,
        fetchEntity,
        ActionTypes.getHostname,
        MiscAPIService.getHostname)
];
