import {takeLatest} from 'redux-saga/effects';

import {fetchEntity} from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';
import HDDAPIService from '../utils/api/HDDAPIService';

export const hddSagas = [
    takeLatest(
        ActionTypes.checkHDD.TRIGGER,
        fetchEntity,
        ActionTypes.checkHDD,
        HDDAPIService.checkHDD),
    takeLatest(
        ActionTypes.enableHDD.TRIGGER,
        fetchEntity,
        ActionTypes.enableHDD,
        HDDAPIService.enableHDD),
    takeLatest(
        ActionTypes.formatHDD.TRIGGER,
        fetchEntity,
        ActionTypes.formatHDD,
        HDDAPIService.formatHDD),
];
