import {FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA} from '../constants/ActionTypes';
import {createReducer} from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_PROTECTED_DATA]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true
        }),
    [FETCH_PROTECTED_DATA_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true
        })
});
