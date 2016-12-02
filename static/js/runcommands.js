$(document).ready(function () {
    //Useful globals
    var webConsole = $('#feedbackText');
    var doingCommand = false;
    var colorMapping = {true : "#00FF00", false: "#FF0000"};

    /***********************/
    /* CODE FOR REQUESTING */
    /***********************/
    //Handler for turning camera on
    function cameraOnHandler() {
        if(!doingCommand) {
            doingCommand = true;
            var statusLight = $('#cameraLight');

            $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
            //Turn camera off
            $.getJSON("/cameraon", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n");
                //Set light colour
                statusLight.css("background-color", colorMapping[result.cameraStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    //Button click events
    $("#CameraOn").click(cameraOnHandler);
    //$("#CameraOff").click(cameraOffHandler);
    //$("#GPSCheck").click(gpsCheckHandler);
    //$("#StatusCheck").click(systemStatusHandler);

    //Code for adding to console
    function addToWebConsole(inputText) {
        $(webConsole).append(inputText);
        if (webConsole.length)
            webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
    }
});