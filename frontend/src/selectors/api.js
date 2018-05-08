import { createSelector } from 'reselect';

// Config File
export const checkConfigFileSelector = (state) => state.configFileReducer.checkConfigFile.data;
export const configWhitelistSelector = (state) =>
    state.configFileReducer.configWhitelist.data.configWhitelist;
export const configFileSelector = (state) => state.configFileReducer.configFile.data.configFile;
export const updateConfigFileSelector = (state) => state.configFileReducer.updateConfigFile.data;

// HDD
export const checkHDDSelector = (state) => state.hddReducer.checkHDD.data;

// Misc
export const getHostnameSelector = (state) => state.miscReducer.getHostname;

// Network
export const checkVPNSelector = (state) => state.networkReducer.checkVPN.data;
export const restartVPNSelector = (state) => state.networkReducer.restartVPN.data;
export const checkInternetSelector = (state) => state.networkReducer.checkInternet.data;
export const restartModemSelector = (state) => state.networkReducer.restartModem.data;

// Status
export const latestLogFileSelector = (state) => state.statusReducer.latestLog.data.logfile;
export const latestLogTimestampSelector = (state) => state.statusReducer.latestLog.data.timestamp;
export const secondLatestLogFileSelector = (state) =>
    state.statusReducer.secondLatestLog.data.logfile;
export const secondLatestLogTimestampSelector = (state) =>
    state.statusReducer.secondLatestLog.data.timestamp;

// Time
export const outputTimeSelector = (state) => state.timeReducer.outputTime.data.time;
export const getTimezoneSelector = (state) => state.timeReducer.getTimezone;
export const changeTimezoneSelector = (state) => state.timeReducer.changeTimezone;


// Memoized Selectors
export const organiseConfigWhitelistById = createSelector(
    configWhitelistSelector,
    (configWhitelist) => {
        const resultingConfig = [];
        let idCount = 0;

        Object.keys(configWhitelist).forEach((categoryKey) => {
            Object.keys(configWhitelist[categoryKey]).forEach((fieldKey) => {
                resultingConfig.push({
                    id: idCount,
                    category: categoryKey,
                    field: fieldKey,
                    value: configWhitelist[categoryKey][fieldKey]
                });

                idCount += 1;
            });
        });

        return resultingConfig;
    }
);

export const organiseConfigFileById = createSelector(
    configFileSelector,
    (configFile) => {
        const resultingConfig = [];
        let idCount = 0;

        Object.keys(configFile).forEach((categoryKey) => {
            Object.keys(configFile[categoryKey]).forEach((fieldKey) => {
                resultingConfig.push({
                    id: idCount,
                    category: categoryKey,
                    field: fieldKey,
                    value: configFile[categoryKey][fieldKey]
                });

                idCount += 1;
            });
        });

        return resultingConfig;
    }
);
