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

export function checkInternet(notificationSystem, notificationsArray) {
    return {
        type: ActionTypes.checkInternet.TRIGGER,
        notifications: {
            notificationSystem,
            successNotification: notificationsArray[2],
            failureNotification: notificationsArray[1]
        }
    };
}

export function restartModem() {
    return {
        type: ActionTypes.restartModem.TRIGGER
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
