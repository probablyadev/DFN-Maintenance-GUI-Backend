import { takeLatest } from 'redux-saga/effects';

import { fetchEntity } from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';

import ConfigFileAPIService from '../utils/api/ConfigFileAPIService';
import HDDAPIService from '../utils/api/HDDAPIService';
import MiscAPIService from '../utils/api/MiscAPIService';
import NetworkAPIService from '../utils/api/NetworkAPIService';
import TimeAPIService from '../utils/api/TimeAPIService';


// noinspection JSAnnotator
export const configFileSagas = [
    yield takeLatest(
        ActionTypes.checkConfigFile.TRIGGER,
        fetchEntity,
        ActionTypes.checkConfigFile,
        ConfigFileAPIService.checkConfigFile
    ),
    yield takeLatest(
        ActionTypes.configWhitelist.TRIGGER,
        fetchEntity,
        ActionTypes.configWhitelist,
        ConfigFileAPIService.configWhitelist
    ),
    yield takeLatest(
        ActionTypes.configFile.TRIGGER,
        fetchEntity,
        ActionTypes.configFile,
        ConfigFileAPIService.configFile
    ),
    yield takeLatest(
        ActionTypes.updateConfigFile.TRIGGER,
        fetchEntity,
        ActionTypes.updateConfigFile,
        ConfigFileAPIService.updateConfigFile
    )
];

// noinspection JSAnnotator
export const hddSagas = [
    yield takeLatest(
        ActionTypes.checkHDD.TRIGGER,
        fetchEntity,
        ActionTypes.checkHDD,
        HDDAPIService.checkHDD
    ),
    yield takeLatest(
        ActionTypes.enableHDD.TRIGGER,
        fetchEntity,
        ActionTypes.enableHDD,
        HDDAPIService.enableHDD
    ),
    yield takeLatest(
        ActionTypes.formatHDD.TRIGGER,
        fetchEntity,
        ActionTypes.formatHDD,
        HDDAPIService.formatHDD
    )
];

// noinspection JSAnnotator
export const miscSagas = [
    yield takeLatest(
        ActionTypes.getHostname.TRIGGER,
        fetchEntity,
        ActionTypes.getHostname,
        MiscAPIService.getHostname
    )
];

// noinspection JSAnnotator
export const networkSagas = [
    yield takeLatest(
        ActionTypes.checkVPN.TRIGGER,
        fetchEntity,
        ActionTypes.checkVPN,
        NetworkAPIService.checkVPN
    )
];

// noinspection JSAnnotator
export const timeSagas = [
    yield takeLatest(
        ActionTypes.outputTime.TRIGGER,
        fetchEntity,
        ActionTypes.outputTime,
        TimeAPIService.outputTime
    )
];
