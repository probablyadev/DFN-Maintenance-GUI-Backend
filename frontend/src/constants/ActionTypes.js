import { createRoutine } from 'redux-saga-routines';

// Camera API Service
export const cameraOff = createRoutine('CAMERA_OFF');
export const cameraOn = createRoutine('CAMERA_ON');
export const cameraStatus = createRoutine('CAMERA_STATUS');
export const downloadPicture = createRoutine('DOWNLOAD_PICTURE');
export const downloadThumbnail = createRoutine('DOWNLOAD_THUMBNAIL');
export const findPictures = createRoutine('FIND_PICURES');
export const removeThumbnail = createRoutine('REMOVE_THUMBNAIL');
export const turnVideoCameraOff = createRoutine('TURN_VIDEO_CAMERA_OFF');
export const turnVideoCameraOn = createRoutine('TURN_VIDEO_CAMERA_ON');

// Config File API Service
export const checkConfigFile = createRoutine('CHECK_CONFIG_FILE');
export const configWhiteList = createRoutine('CONFIG_WHITELIST');
export const configFile = createRoutine('CONFIG_FILE');
export const updateConfigFile = createRoutine('UPDATE_CONFIG_FILE');

// GPS API Service
export const checkGPS = createRoutine('CHECK_GPS');

// HDD API Service
export const checkHDD = createRoutine('CHECK_HDD');
export const enableHDD = createRoutine('ENABLE_HDD');
export const formatHDD = createRoutine('FORMAT_HDD');
export const mountHDD = createRoutine('MOUNT_HDD');
export const moveData0HDD = createRoutine('MOVE_DATA_0_HDD');
export const probeHDD = createRoutine('PROBE_HDD');
export const smartTest = createRoutine('SMART_TEST');
export const unmountHDD = createRoutine('UNMOUNT_HDD');

// Interval Control Test API Service
export const intervalTest = createRoutine('INTERVAL_TEST');
export const prevIntervalTest = createRoutine('PREV_INTERVAL_TEST');

// Misc API Service
export const getHostname = createRoutine('GET_HOSTNAME');

// Network API Service
export const checkVPN = createRoutine('CHECK_VPN');
export const checkInternet = createRoutine('CHECK_INTERNET');
export const restartModem = createRoutine('RESTART_MODEM');
export const restartVPN = createRoutine('RESTART_VPN');

// Status API Service
export const latestLog = createRoutine('LATEST_LOG');
export const secondLatestLog = createRoutine('SECOND_LATEST_LOG');

// Time API Service
export const outputTime = createRoutine('OUTPUT_TIME');
export const changeTimezone = createRoutine('CHANGE_TIMEZONE');

// User API Service
export const getUser = createRoutine('GET_USER');
export const getToken = createRoutine('GET_TOKEN');
export const isTokenValid = createRoutine('IS_TOKEN_VALID');

// Auth
export const login = createRoutine('LOGIN');
export const LOGOUT = 'LOGOUT';
export const checkAuth = createRoutine('CHECK_AUTH');

// Settings
export const TOGGLE_BOXED_LAYOUT = 'TOGGLE_BOXED_LAYOUT';
export const TOGGLE_COLLAPSED_NAV = 'TOGGLE_COLLAPSED_NAV';
export const TOGGLE_NAV_BEHIND = 'TOGGLE_NAV_BEHIND';
export const TOGGLE_FIXED_HEADER = 'TOGGLE_FIXED_HEADER';
export const CHANGE_SIDEBAR_WIDTH = 'CHANGE_SIDEBAR_WIDTH';
export const CHANGE_COLOR_OPTION = 'CHANGE_COLOR_OPTION';
export const CHANGE_THEME = 'CHANGE_THEME';
