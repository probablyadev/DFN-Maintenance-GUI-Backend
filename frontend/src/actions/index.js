import * as types from '../constants/ActionTypes';

export function toggleCollapsedNav(isNavCollapsed) {
    return {type: types.TOGGLE_COLLAPSED_NAV, isNavCollapsed};
}

export function changeSidebarWidth(sidebarWidth) {
    return {type: types.CHANGE_SIDEBAR_WIDTH, sidebarWidth};
}

export function changeColorOption(colorOption) {
    return {type: types.CHANGE_COLOR_OPTION, colorOption};
}

export function changeTheme(themeOption) {
    return {type: types.CHANGE_THEME, theme: themeOption};
}
