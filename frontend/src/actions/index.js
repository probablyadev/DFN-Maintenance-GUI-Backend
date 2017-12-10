import * as types from '../constants/ActionTypes';

export function toggleBoxedLayout(isLayoutBoxed) {
  return { type: types.TOGGLE_BOXED_LAYOUT, isLayoutBoxed };
}
export function toggleCollapsedNav(isNavCollapsed) {
  return { type: types.TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}
export function toggleNavBehind(isNavBehind) {
  return { type: types.TOGGLE_NAV_BEHIND, isNavBehind };
}
export function toggleFixedHeader(isFixedHeader) {
  return { type: types.TOGGLE_FIXED_HEADER, isFixedHeader };
}
export function changeSidebarWidth(sidebarWidth) {
  return { type: types.CHANGE_SIDEBAR_WIDTH, sidebarWidth };
}
export function changeColorOption(colorOption) {
  return { type: types.CHANGE_COLOR_OPTION, colorOption };
}
export function changeTheme(themeOption) {
  return { type: types.CHANGE_THEME, theme: themeOption };
}
