$(document).ready(function () {
    //HTML element variables
    var webConsole = $('#feedbackText');
    var cameraLight = $('#cameraLight');
    var gpsLight = $('#GPSLight');
    var internetLight = $('#internetLight');
    var intervalLight = $('#intervalLight');
    var hdd0Light = $('#HDD0Light');
    var hdd1Light = $('#HDD1Light');
    var hdd2Light = $('#HDD2Light');
    var hdd1Space = $('#HDD1Space');
    var hdd2Space = $('#HDD2Space');

    //Useful globals + constants
    var doingCommand = false;
    var colorMapping = {true: "#00FF00", false: "#FF0000"};

    //Button click events
    $("#CameraOn").click(cameraOnHandler);
    $("#CameraOff").click(cameraOffHandler);
    $("#HDDOn").click(hddOnHandler);
    $("#HDDOff").click(hddOffHandler);
    $("#UnmountHDD").click(hddUnmountHandler);
    $("#CheckSpace").click(hddSpaceCheckHandler);
    $("#Data0Check").click(data0CheckHandler);
    $("#GPSCheck").click(gpsCheckHandler);
    $("#IntervalCheck").click(intervalTestHandler);
    $("#StatusCheck").click(systemStatusHandler);

    //Get system status
    systemStatusHandler();

    //Code for adding to web console
    function addToWebConsole(inputText) {
        $(webConsole).append(inputText);
        if (webConsole.length)
            webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
    }

    /***************************************************/
    /* CODE FOR BUTTON PRESS HANDLERS, AJAX REQUESTERS */
    /***************************************************/

    //Handler for turning camera on
    function cameraOnHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Switching camera on...\n");
            //Request to turn camera on
            $.getJSON("/cameraon", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colour
                cameraLight.css("background-color", colorMapping[result.cameraStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    //Handler for turning camera off
    function cameraOffHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Switching camera off...\n");
            //Request to turn camera off
            $.getJSON("/cameraoff", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colour
                cameraLight.css("background-color", colorMapping[result.cameraStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    // Handler
    function hddOnHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Enabling External HDDs...\n");
            //Request to enable HDDs
            $.getJSON("/enablehdd", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colours
                hdd1Light.css("background-color", colorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", colorMapping[result.HDD2Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function hddOffHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Disabling External HDDs...\n");
            //Request to enable HDDs
            $.getJSON("/disablehdd", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colours
                hdd1Light.css("background-color", colorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", colorMapping[result.HDD2Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function hddUnmountHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Unmounting external HDDs...\n");
            //Request to enable HDDs
            $.getJSON("/unmounthdd", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colours
                hdd1Light.css("background-color", colorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", colorMapping[result.HDD2Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function hddSpaceCheckHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking external HDDs...\n");
            //Request to enable HDDs
            $.getJSON("/hddcheck", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colours
                hdd1Light.css("background-color", colorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", colorMapping[result.HDD2Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function data0CheckHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Fetching /data0 data...\n");
            //Request to enable HDDs
            $.getJSON("/data0check", function (result) {
                //TODO: Decide on how to do the data0 output
                addToWebConsole(result.consoleFeedback + "\n");

                //Set light colours
                hdd0Light.css("background-color", colorMapping[result.data0Boolean]);

                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    //Handler for outputting GPS status
    function gpsCheckHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking GPS status...\n");
            //Request to check GPS status
            $.getJSON("/gpscheck", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colour
                gpsLight.css("background-color", colorMapping[result.gpsStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    //Handler for performing an interval test
    function intervalTestHandler() {
        if (!doingCommand) {
            $(webConsole).append("Performing interval test...\n");
            //Request to perform interval test
            $.getJSON("/intervaltest", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colours
                intervalLight.css("background-color", colorMapping[result.intervalTestResult])
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    //Handler for general status check
    function systemStatusHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking system status...\n");
            //Request for system status to be checked
            $.getJSON("/systemstatus", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colours
                cameraLight.css("background-color", colorMapping[result.cameraStatus]);
                gpsLight.css("background-color", colorMapping[result.gpsStatus]);
                internetLight.css("background-color", colorMapping[result.internetStatus]);
                hdd0Light.css("background-color", colorMapping[result.HDD0Status]);
                hdd1Light.css("background-color", colorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", colorMapping[result.HDD2Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }
});