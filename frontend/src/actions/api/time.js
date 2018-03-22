import * as ActionTypes from '../../constants/ActionTypes';

export function outputTime() {
    return {
        type: ActionTypes.outputTime.TRIGGER
    }
}
