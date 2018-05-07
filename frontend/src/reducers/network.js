import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    loading: false,
    error: false
};

export default function createNetworkReducerWithType(type, configuredState = initialState) {
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
