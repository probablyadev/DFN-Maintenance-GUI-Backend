import { createReducer } from '../utils/misc';

export default function createNetworkReducerWithType(type, dataState = null) {
    const configuredState = {
        data: dataState,
        loading: false,
        error: false
    };

    return createReducer(configuredState, {
        [type.TRIGGER]: (state) =>
            Object.assign({}, state, {
                loading: true
            }),
        [type.SUCCESS]: (state, payload) =>
            Object.assign({}, state, {
                data: payload
            }),
        [type.FAILURE]: (state, payload) =>
            Object.assign({}, state, {
                data: payload,
                error: true
            }),
        [type.FULFILL]: (state) =>
            Object.assign({}, state, {
                loading: false
            })
    });
}
