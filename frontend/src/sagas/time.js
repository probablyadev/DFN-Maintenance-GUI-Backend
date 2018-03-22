import {takeLatest} from 'redux-saga/effects';

import {fetchEntity} from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';
import TimeAPIService from '../utils/api/TimeAPIService';

export const timeSagas = [
    takeLatest(
        ActionTypes.outputTime.TRIGGER,
        fetchEntity,
        ActionTypes.outputTime,
        TimeAPIService.outputTime)
];
