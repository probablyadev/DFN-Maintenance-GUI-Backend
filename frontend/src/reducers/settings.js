import {createReducer} from '../utils/misc';
import APPCONFIG from 'constants/Config';
import {
    CHANGE_COLOR_OPTION,
    CHANGE_SIDEBAR_WIDTH,
    CHANGE_THEME,
    TOGGLE_BOXED_LAYOUT,
    TOGGLE_COLLAPSED_NAV,
    TOGGLE_FIXED_HEADER,
    TOGGLE_NAV_BEHIND
} from '../constants/ActionTypes';

const initialState = APPCONFIG.settings;

export default createReducer(initialState, {
    [TOGGLE_BOXED_LAYOUT]: (state, payload) =>
        Object.assign({}, state, {
            layoutBoxed: payload.isLayoutBoxed
        }),
    [TOGGLE_COLLAPSED_NAV]: (state, payload) =>
        Object.assign({}, state, {
            navCollapsed: payload.isNavCollapsed
        }),
    [TOGGLE_NAV_BEHIND]: (state, payload) =>
        Object.assign({}, state, {
            navBehind: payload.isNavBehind
        }),
    [TOGGLE_FIXED_HEADER]: (state, payload) =>
        Object.assign({}, state, {
            fixedHeader: payload.isFixedHeader
        }),
    [CHANGE_SIDEBAR_WIDTH]: (state, payload) =>
        Object.assign({}, state, {
            sidebarWidth: payload.sidebarWidth
        }),
    [CHANGE_COLOR_OPTION]: (state, payload) =>
        Object.assign({}, state, {
            colorOption: payload.colorOption
        }),
    [CHANGE_THEME]: (state, payload) =>
        Object.assign({}, state, {
            theme: payload.theme
        })
});
