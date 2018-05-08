import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import createNetworkReducerWithType from './network';
import settings from './settings';
import { login, checkAuth } from './auth';

import * as actionTypes from '../constants/ActionTypes';

const cameraReducer = combineReducers({
    cameraOff:          createNetworkReducerWithType(actionTypes.cameraOff),
    cameraOn:           createNetworkReducerWithType(actionTypes.cameraOn),
    cameraStatus:       createNetworkReducerWithType(actionTypes.cameraStatus),
    downloadPicture:    createNetworkReducerWithType(actionTypes.downloadPicture),
    downloadThumbnail:  createNetworkReducerWithType(actionTypes.downloadThumbnail),
    findPictures:       createNetworkReducerWithType(actionTypes.findPictures),
    removeThumbnail:    createNetworkReducerWithType(actionTypes.removeThumbnail),
    turnVideoCameraOff: createNetworkReducerWithType(actionTypes.turnVideoCameraOff),
    turnVideoCameraOn:  createNetworkReducerWithType(actionTypes.turnVideoCameraOn)
});

const configFileReducer = combineReducers({
    checkConfigFile: createNetworkReducerWithType(actionTypes.checkConfigFile),
    configWhitelist: createNetworkReducerWithType(
        actionTypes.configWhitelist,
        {
            configWhitelist: [
                {
                    id: 0,
                    category: '',
                    field: '',
                    value: ''
                }
            ]
        }
    ),
    configFile: createNetworkReducerWithType(
        actionTypes.configFile,
        {
            configFile: [
                {
                    id: 0,
                    category: '',
                    field: '',
                    value: ''
                }
            ]
        }
    ),
    updateConfigFile: createNetworkReducerWithType(actionTypes.updateConfigFile)
});

const gpsReducer = combineReducers({
    checkGPS: createNetworkReducerWithType(actionTypes.checkGPS)
});

const hddReducer = combineReducers({
    checkHDD:     createNetworkReducerWithType(actionTypes.checkHDD),
    enableHDD:    createNetworkReducerWithType(actionTypes.enableHDD),
    formatHDD:    createNetworkReducerWithType(actionTypes.formatHDD),
    mountHDD:     createNetworkReducerWithType(actionTypes.mountHDD),
    moveData0HDD: createNetworkReducerWithType(actionTypes.moveData0HDD),
    probeHDD:     createNetworkReducerWithType(actionTypes.probeHDD),
    smartTest:    createNetworkReducerWithType(actionTypes.smartTest),
    unmountHDD:   createNetworkReducerWithType(actionTypes.unmountHDD)
});

const intervalControlTestReducer = combineReducers({
    intervalTest:     createNetworkReducerWithType(actionTypes.intervalTest),
    prevIntervalTest: createNetworkReducerWithType(actionTypes.prevIntervalTest)
});

const miscReducer = combineReducers({
    getHostname: createNetworkReducerWithType(
        actionTypes.getHostname,
        {
            hostname: ''
        }
    )
});

const networkReducer = combineReducers({
    checkVPN:      createNetworkReducerWithType(actionTypes.checkVPN),
    checkInternet: createNetworkReducerWithType(actionTypes.checkInternet),
    restartModem:  createNetworkReducerWithType(actionTypes.restartModem),
    restartVPN:    createNetworkReducerWithType(actionTypes.restartVPN)
});

const statusReducer = combineReducers({
    latestLog: createNetworkReducerWithType(
        actionTypes.latestLog,
        {
            logfile: '',
            timestamp: ''
        }
    ),
    secondLatestLog: createNetworkReducerWithType(
        actionTypes.secondLatestLog,
        {
            logfile: '',
            timestamp: ''
        }
    )
});

const timeReducer = combineReducers({
    outputTime: createNetworkReducerWithType(
        actionTypes.outputTime,
        {
            time: ''
        }
    ),
    getTimezone: createNetworkReducerWithType(
        actionTypes.getTimezone,
        {
            timezone: ''
        }
    ),
    changeTimezone: createNetworkReducerWithType(actionTypes.changeTimezone)
});

const userReducer = combineReducers({
    getUser:      createNetworkReducerWithType(actionTypes.getUser),
    getToken:     createNetworkReducerWithType(actionTypes.getToken),
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
    userReducer,
});

export default rootReducer;
