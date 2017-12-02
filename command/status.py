# ADVANCED UTILITIES
import constants
import dfn_functions
from command import exec_console_command


def get_log(directory):
    """
    Fetches the file path of a text logfile on the file system.

    Args:
        directory (str): The directory to get the logfile from. Format::

            /data0/ + directory

    Returns:
        foundFile (str): The file path of the found logfile.
    """
    filenames = exec_console_command(constants.getLogfileName.format(directory))
    foundfile = filenames.split('\n')[0]

    return foundfile


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
                            result_dict["[" + conf_category + "] " + conf_field] = conf_dict[conf_category][conf_field]

    print(result_dict)


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
