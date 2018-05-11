import * as ActionTypes from '../constants/ActionTypes';


// Config File
export function checkConfigFile() {
    return {
        type: ActionTypes.checkConfigFile.TRIGGER
    };
}

export function configWhitelist() {
    return {
        type: ActionTypes.configWhitelist.TRIGGER
    };
}

export function configFile() {
    return {
        type: ActionTypes.configFile.TRIGGER
    };
}

export function updateConfigFile(data) {
    return {
        type: ActionTypes.updateConfigFile.TRIGGER,
        data: {
            data
        }
    };
}

// HDD
export function checkHDD() {
    return {
        type: ActionTypes.checkHDD.TRIGGER
    };
}

export function enableHDD() {
    return {
        type: ActionTypes.enableHDD.TRIGGER
    };
}

export function formatHDD(data) {
    return {
        type: ActionTypes.formatHDD.TRIGGER,
        data: {
            data
        }
    };
}

// Misc
export function getHostname() {
    return {
        type: ActionTypes.getHostname.TRIGGER
    };
}

// Network
export function checkVPN(onSuccess, onFailure) {
    return {
        type: ActionTypes.checkVPN.TRIGGER,
        onSuccess,
        onFailure
    };
}

export function restartVPN(onNotification, onSuccess, onFailure) {
    return {
        type: ActionTypes.restartVPN.TRIGGER,
        onNotification,
        onSuccess,
        onFailure
    };
}

export function checkInternet(onSuccess, onFailure) {
    return {
        type: ActionTypes.checkInternet.TRIGGER,
        onSuccess,
        onFailure
    };
}

export function restartModem(onNotification, onSuccess, onFailure) {
    return {
        type: ActionTypes.restartModem.TRIGGER,
        onNotification,
        onSuccess,
        onFailure
    };
}

// Status
export function latestLog() {
    return {
        type: ActionTypes.latestLog.TRIGGER
    };
}

export function secondLatestLog() {
    return {
        type: ActionTypes.secondLatestLog.TRIGGER
    };
}

// Time
export function outputTime() {
    return {
        type: ActionTypes.outputTime.TRIGGER
    };
}

export function getTimezone() {
    return {
        type: ActionTypes.getTimezone.TRIGGER
    };
}

export function changeTimezone(timezone) {
    return {
        type: ActionTypes.changeTimezone.TRIGGER,
        data: {
            timezone
        }
    };
}
