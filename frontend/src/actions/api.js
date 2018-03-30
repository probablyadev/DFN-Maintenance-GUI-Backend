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

export function updateConfigFile() {
    return {
        type: ActionTypes.updateConfigFile.TRIGGER
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
export function checkVPN() {
    return {
        type: ActionTypes.checkVPN.TRIGGER
    };
}

export function restartVPN() {
    return {
        type: ActionTypes.restartVPN.TRIGGER
    };
}

export function checkInternet() {
    return {
        type: ActionTypes.checkInternet.TRIGGER
    };
}

export function restartModem() {
    return {
        type: ActionTypes.restartModem.TRIGGER
    };
}

// Time
export function outputTime() {
    return {
        type: ActionTypes.outputTime.TRIGGER
    };
}
