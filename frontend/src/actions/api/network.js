import * as ActionTypes from "../../constants/ActionTypes";

export function checkVPN() {
    return {
        type: ActionTypes.checkVPN.TRIGGER
    }
}

export function restartVPN() {
    return {
        type: ActionTypes.restartVPN.TRIGGER
    }
}

export function checkInternet() {
    return {
        type: ActionTypes.checkInternet.TRIGGER
    }
}

export function restartModem() {
    return {
        type: ActionTypes.restartModem.TRIGGER
    }
}
