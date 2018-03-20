import * as ActionTypes from '../../constants/ActionTypes';

export function getHostname() {
    return {
        type: ActionTypes.getHostname.TRIGGER
    }
}
