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


def update_config_file(inProperty):
    """
    Updates the dfnstation.cfg file with a new value for a parameter.

    Args:
        inProperty (json): JSON object representing a config. Format::

            {param : value}

    Returns:
        consoleFeedback (str): Resulting console feedback.
    """
    consoleFeedback = constants.configWriteFailed
    path = constants.dfnconfigPath
    updated_conf_dict = dfn_functions.load_config(path)

    for key in inProperty:
        parsed = key.split("] ")
        property_category = parsed[0].replace("[", "")
        property_field = parsed[1]

        updated_conf_dict[property_category][property_field] = inProperty[key]
        consoleFeedback = constants.configWritePassed.format(key, inProperty[key])

    dfn_functions.save_config_file("dfnstation.cfg", updated_conf_dict)

    return consoleFeedback
