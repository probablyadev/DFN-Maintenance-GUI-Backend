import {CHANGE_COLOR_OPTION, CHANGE_SIDEBAR_WIDTH, CHANGE_THEME, TOGGLE_COLLAPSED_NAV} from '../constants/ActionTypes';

export function toggleCollapsedNav(isNavCollapsed) {
    return {
        type: TOGGLE_COLLAPSED_NAV,
        payload: {
            isNavCollapsed
        }
    };
}

export function changeSidebarWidth(sidebarWidth) {
    return {
        type: CHANGE_SIDEBAR_WIDTH,
        payload: {
            sidebarWidth
        }
    };
}

export function changeColorOption(colorOption) {
    return {
        type: CHANGE_COLOR_OPTION,
        payload: {
            colorOption
        }
    };
}

export function changeTheme(theme) {
    return {
        type: CHANGE_THEME,
        payload: {
            theme
        }
    };
}
