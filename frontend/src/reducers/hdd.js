import {createReducer} from '../utils/misc';
import {checkHDD} from '../constants/ActionTypes';

const initialState = {
    data: null,
    loading: false,
    error: null,
};

// TODO: Find a way to make generic: https://techblog.appnexus.com/five-tips-for-working-with-redux-in-large-applications-89452af4fdcb
export default createReducer(initialState, {
    [checkHDD.TRIGGER]: (state) =>
        Object.assign({}, state, {
            loading: true
        }),
    [checkHDD.SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            data: payload
        }),
    [checkHDD.FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            error: payload
        }),
    [checkHDD.FULFILL]: (state) =>
        Object.assign({}, state, {
            loading: false
        })
});
