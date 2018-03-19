import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import createNetworkReducerWithType from "./network";
import * as actionTypes from '../constants/ActionTypes';
import settings from './settings';
import auth from './auth';

const hddReducer = combineReducers({
    checkHDD: createNetworkReducerWithType(actionTypes.checkHDD)
});

const rootReducer = combineReducers({
    routing: routerReducer,
    settings,
    auth,
    hddReducer
});

export default rootReducer;
