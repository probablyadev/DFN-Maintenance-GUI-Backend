import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import createNetworkReducerWithType from './network';
import * as actionTypes from '../constants/ActionTypes';
import settings from './settings';
import {login, checkAuth} from './auth';

const cameraReducer = combineReducers({
    cameraOff: createNetworkReducerWithType(actionTypes.cameraOff),
    cameraOn: createNetworkReducerWithType(actionTypes.cameraOn),
    cameraStatus: createNetworkReducerWithType(actionTypes.cameraStatus),
    downloadPicture: createNetworkReducerWithType(actionTypes.downloadPicture),
    downloadThumbnail: createNetworkReducerWithType(actionTypes.downloadThumbnail),
    findPictures: createNetworkReducerWithType(actionTypes.findPictures),
    removeThumbnail: createNetworkReducerWithType(actionTypes.removeThumbnail),
    turnVideoCameraOff: createNetworkReducerWithType(actionTypes.turnVideoCameraOff),
    turnVideoCameraOn: createNetworkReducerWithType(actionTypes.turnVideoCameraOn)
});

const configFileReducer = combineReducers({
    checkConfigFile: createNetworkReducerWithType(actionTypes.checkConfigFile),
    configWhitelist: createNetworkReducerWithType(actionTypes.configWhitelist),
    configFile: createNetworkReducerWithType(actionTypes.configFile),
    updateConfigFile: createNetworkReducerWithType(actionTypes.updateConfigFile)
});

const gpsReducer = combineReducers({
    checkGPS: createNetworkReducerWithType(actionTypes.checkGPS)
});

const hddReducer = combineReducers({
    checkHDD: createNetworkReducerWithType(actionTypes.checkHDD),
    enableHDD: createNetworkReducerWithType(actionTypes.enableHDD),
    formatHDD: createNetworkReducerWithType(actionTypes.formatHDD),
    mountHDD: createNetworkReducerWithType(actionTypes.mountHDD),
    moveData0HDD: createNetworkReducerWithType(actionTypes.moveData0HDD),
    probeHDD: createNetworkReducerWithType(actionTypes.probeHDD),
    smartTest: createNetworkReducerWithType(actionTypes.smartTest),
    unmountHDD: createNetworkReducerWithType(actionTypes.unmountHDD)
});

const intervalControlTestReducer = combineReducers({
    intervalTest: createNetworkReducerWithType(actionTypes.intervalTest),
    prevIntervalTest: createNetworkReducerWithType(actionTypes.prevIntervalTest)
});

const miscReducer = combineReducers({
    getHostname: createNetworkReducerWithType(
        actionTypes.getHostname,
        {
            data: {
                hostname: ''
            },
            loading: false,
            error: null
        }
    )
});

const networkReducer = combineReducers({
    checkVPN: createNetworkReducerWithType(actionTypes.checkVPN),
    checkInternet: createNetworkReducerWithType(actionTypes.checkInternet),
    restartModem: createNetworkReducerWithType(actionTypes.restartModem),
    restartVPN: createNetworkReducerWithType(actionTypes.restartVPN)
});

const statusReducer = combineReducers({
    latestLog: createNetworkReducerWithType(actionTypes.latestLog),
    secondLatestLog: createNetworkReducerWithType(actionTypes.secondLatestLog)
});

const timeReducer = combineReducers({
    outputTime: createNetworkReducerWithType(
        actionTypes.outputTime,
        {
            data: {
                time: ''
            },
            loading: false,
            error: null
        }
    ),
    changeTimezone: createNetworkReducerWithType(actionTypes.changeTimezone)
});

const userReducer = combineReducers({
    getUser: createNetworkReducerWithType(actionTypes.getUser),
    getToken: createNetworkReducerWithType(actionTypes.getToken),
    isTokenValid: createNetworkReducerWithType(actionTypes.isTokenValid)
});

const rootReducer = combineReducers({
    routing: routerReducer,
    settings,
    login,
    checkAuth,
    cameraReducer,
    configFileReducer,
    gpsReducer,
    hddReducer,
    intervalControlTestReducer,
    miscReducer,
    networkReducer,
    statusReducer,
    timeReducer,
    userReducer
});

export default rootReducer;
