import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import settings from './settings';
import auth from './auth';
import data from './data';

const rootReducer = combineReducers({
    routing: routerReducer,
    settings,
    auth,
    data
});

export default rootReducer;
