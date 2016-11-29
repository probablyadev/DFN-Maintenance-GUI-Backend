$(document).ready(function () {
    var webConsole = $('#feedbackText');
    var doingCommand = false;

    /***************************/
    /* CODE FOR EVENT HANDLING */
    /***************************/
    //Handler for turning camera on
    function cameraOnHandler() {
        if(!doingCommand) {
            //Give user feedback on pushing button
            $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
            //Turn camera off
            $.getJSON("/cameraon", function (result) {
                //Set feedback text
                addToWebConsole(result.feedbackText);
                //Get camera status
                getCameraStatus();
            });
        }
    }

    //Handler for turning camera off
    function cameraOffHandler() {
        if(!doingCommand) {
            doingCommand = true;
            //Give user feedback on pushing button
            $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
            //Turn camera off
            $.getJSON("/cameraoff", function (result) {
                //Set feedback text
                addToWebConsole(result.feedbackText);
                //Get camera status
                getCameraStatus();
            });
        }
    }

    //Function for GPS
    function gpsCheckHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Give user feedback on pushing button
            $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
            //Get GPS status
            getGpsStatus();
        }
    }

    function systemStatusHandler() {
        if(!doingCommand) {
            doingCommand = true;
            getCameraStatus();
            getGpsStatus();
            getInternetStatus();
        }
    }

    /*************************************/
    /* CODE FOR GETTING COMPONENT STATUS */
    /*************************************/
    //Function for checking GPS's connection status
    function getGpsStatus() {
        var statusLight = $('#GPSLight');
        var lightColor = "#FF0000";

        $.getJSON("/gpscheck", function (result) {
            //Decide status light based on GPS status
            if (result.status) {
                lightColor = "#00FF00";
            }
            statusLight.css("background-color", lightColor);
            addToWebConsole(result.feedbackText);
            doingCommand = false;
        });
    }

    //Function for checking camera's status/presence
    function getCameraStatus() {
        var statusLight = $('#cameraLight');
        var lightColor = "#FF0000";

        //AJAX Request for console output + camera status
        $.getJSON("/camerastatus", function (result) {
            //Decide status light based on camera status
            if (result.status) {
                lightColor = "#00FF00"
            }
            statusLight.css("background-color", lightColor);
            addToWebConsole(result.feedbackText);
            doingCommand = false;
        });
    }

    function getInternetStatus() {
        var statusLight = $('#internetLight');
        var lightColor = "#FF0000";

        //AJAX Request for console output + camera status
        $.getJSON("/internetstatus", function (result) {
            //Decide status light based on camera status
            if (result.status) {
                lightColor = "#00FF00"
            }
            statusLight.css("background-color", lightColor);
            addToWebConsole(result.feedbackText);
            doingCommand = false;
        });
    }

    //Button click events
    $("#CameraOn").click(cameraOnHandler);
    $("#CameraOff").click(cameraOffHandler);
    $("#GPSCheck").click(gpsCheckHandler);
    $("#StatusCheck").click(systemStatusHandler);

    //Code for adding to console
    function addToWebConsole(inputText) {
        $(webConsole).append(inputText);
        if (webConsole.length)
            webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
    }
});