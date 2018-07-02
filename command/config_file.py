import re

import dfn_functions
from backend import constants
from command import exec_console_command


def cf_check():
    """
    Checks that a configuration file exists.

    Returns:
        consoleOutput (str): Resulting console output.

    Raises:
        IOError
    """
    consoleOutput = exec_console_command(constants.cfcheck)

    if re.search("[0-9]", consoleOutput):
        return consoleOutput
    else:
        raise IOError(constants.cfCheckScriptNotFound)


def config_whitelist():
    """
    Serves information to fill in the interface for changing the dfnstation.cfg file.

    Returns:
        outDict (dict): Format::

            {param : value}
    """
    white_list = constants.configBoxWhitelist
    path = constants.dfnconfigPath
    conf_dict = dfn_functions.load_config(path)
    result_dict = {}

    for whitelist_category in white_list:
        for conf_category in conf_dict:
            if whitelist_category == conf_category:
                for whitelist_field in white_list[whitelist_category]:
                    for conf_field in conf_dict[conf_category]:
                        if whitelist_field == conf_field:
                            if not conf_category in result_dict:
                                result_dict[conf_category] = {}

                            result_dict[conf_category][conf_field] = conf_dict[conf_category][conf_field]

    return result_dict

def config_file():
    """
    Serves the config file in full.
    """
    path = constants.dfnconfigPath
    config_file = dfn_functions.load_config(path)

    if not config_file:
        raise IOError('Cannot load config file with path: {0}'.format(path))

    return config_file

def update_config_file(category, field, value):
    """
    Updates the dfnstation.cfg file with a new value for a parameter.

    Args:
        category (str): A config properties category
        field (str): A config properties field
        value (str): A config properties value

    Returns:
        consoleFeedback (str): Resulting console feedback.
    """
    path = constants.dfnconfigPath
    updated_conf_dict = dfn_functions.load_config(path)

    oldValue = updated_conf_dict[category][field]
    updated_conf_dict[category][field] = value

    if dfn_functions.save_config_file(path, updated_conf_dict):
        return 'Overwritten {0}:{1}:{2} as {3}'.format(category, field, oldValue, value)
    else:
        raise IOError('Unable to write {0}:{1}:{2} to config file'.format(category, field, value))
