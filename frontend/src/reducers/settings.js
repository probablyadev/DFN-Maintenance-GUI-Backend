import APPCONFIG from 'constants/Config';
import {
  TOGGLE_BOXED_LAYOUT,
  TOGGLE_COLLAPSED_NAV,
  TOGGLE_NAV_BEHIND,
  TOGGLE_FIXED_HEADER,
  CHANGE_SIDEBAR_WIDTH,
  CHANGE_COLOR_OPTION,
  CHANGE_THEME
} from '../constants/ActionTypes';

const initialSettings = APPCONFIG.settings;

const settings = (state = initialSettings, action) => {
    // console.log(action)
  switch (action.type) {
    case TOGGLE_BOXED_LAYOUT:
      return {
        ...state,
        layoutBoxed: action.isLayoutBoxed
      };
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.isNavCollapsed
      };
    case TOGGLE_NAV_BEHIND:
      return {
        ...state,
        navBehind: action.isNavBehind
      };
    case TOGGLE_FIXED_HEADER:
      return {
        ...state,
        fixedHeader: action.isFixedHeader
      };
    case CHANGE_SIDEBAR_WIDTH:
      return {
        ...state,
        sidebarWidth: action.sidebarWidth
      };
    case CHANGE_COLOR_OPTION:
      return {
        ...state,
        colorOption: action.colorOption
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
};

module.exports = settings;
