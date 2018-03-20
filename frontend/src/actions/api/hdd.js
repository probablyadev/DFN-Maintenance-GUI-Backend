import * as ActionTypes from '../../constants/ActionTypes';

export function checkHDD() {
    return {
        type: ActionTypes.checkHDD.TRIGGER
    }
}

export function enableHDD() {
    return {
        type: ActionTypes.enableHDD.TRIGGER
    }
}

export function formatHDD(data) {
    return {
        type: ActionTypes.formatHDD.TRIGGER,
        data: {
            data
        }
    }
}
