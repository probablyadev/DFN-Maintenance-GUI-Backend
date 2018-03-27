import {takeLatest} from 'redux-saga/effects';

import {fetchEntity} from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';

import HDDAPIService from '../utils/api/HDDAPIService';
import MiscAPIService from '../utils/api/MiscAPIService';
import NetworkAPIService from '../utils/api/NetworkAPIService';
import TimeAPIService from '../utils/api/TimeAPIService';


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

export const miscSagas = [
    takeLatest(
        ActionTypes.getHostname.TRIGGER,
        fetchEntity,
        ActionTypes.getHostname,
        MiscAPIService.getHostname)
];

export const networkSagas = [
    takeLatest(
        ActionTypes.checkVPN.TRIGGER,
        fetchEntity,
        ActionTypes.checkVPN,
        NetworkAPIService.checkVPN)
];

export const timeSagas = [
    takeLatest(
        ActionTypes.outputTime.TRIGGER,
        fetchEntity,
        ActionTypes.outputTime,
        TimeAPIService.outputTime)
];
