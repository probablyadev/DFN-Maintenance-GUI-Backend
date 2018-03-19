import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import settings from './settings';
import auth from './auth';

const rootReducer = combineReducers({
    routing: routerReducer,
    settings,
    auth
});

export default rootReducer;
