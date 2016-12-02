$(document).ready(function () {
    //HTML element variables
    var webConsole = $('#feedbackText');
    var cameraLight = $('#cameraLight');
    var gpsLight = $('#GPSLight');
    var internetLight = $('#internetLight');
    var invervalLight = $('#intervalLight');
    var hdd1Light = $('#HDD1Light');
    var hdd2Light = $('#HDD2Light');

    //Useful globals + constants
    var doingCommand = false;
    var colorMapping = {true : "#00FF00", false: "#FF0000"};

    /***************************************************/
    /* CODE FOR BUTTON PRESS HANDLERS, AJAX REQUESTERS */
    /***************************************************/

    //Handler for turning camera on
    function cameraOnHandler() {
        if(!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
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

    // Handler for turning camera off
    function cameraOffHandler() {
        if(!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
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

    // Handler for turning camera off
    function gpsCheckHandler() {
        if(!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
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

    //Handler for general status check
    function systemStatusHandler() {
        if(!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
            //Request for system status to be checked
            $.getJSON("/systemstatus", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colours
                cameraLight.css("background-color", colorMapping[result.cameraStatus]);
                gpsLight.css("background-color", colorMapping[result.gpsStatus]);
                internetLight.css("background-color", colorMapping[result.internetStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    //Button click events
    $("#CameraOn").click(cameraOnHandler);
    $("#CameraOff").click(cameraOffHandler);
    $("#GPSCheck").click(gpsCheckHandler);
    $("#StatusCheck").click(systemStatusHandler);

    //Code for adding to web console
    function addToWebConsole(inputText) {
        $(webConsole).append(inputText);
        if (webConsole.length)
            webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
    }
});