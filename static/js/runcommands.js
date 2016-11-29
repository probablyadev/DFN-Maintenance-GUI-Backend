$(document).ready(function () {

    //Function for Camera On functionality
    $("#CameraOn").click(function () {
        var webConsole = $('#feedbackText');
        var statusLight = $('#cameraLight');
        var lightColor = "#FF0000"

        $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
        //AJAX Request for console output + camera status
        $.getJSON("/cameraon", function (result) {
            //Decide status light based on camera status
            if (result.status)
            {
                lightColor = "#00FF00"
            }
            statusLight.css("background-color", lightColor);
            //Set feedback text
            $(webConsole).append(result.feedbacktext);
            if (webConsole.length)
                webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
        });
    });

    //Function for Camera Off functionality
    $("#CameraOff").click(function () {
        var webConsole = $('#feedbackText');
        var statusLight = $('#cameraLight');
        var lightColor = "#FF0000"

        $(webConsole).append("Doing command: " + $(this).attr('id') + "\n");
        //AJAX Request for console output + camera status
        $.getJSON("/cameraoff", function (result) {
            //Decide status light based on camera status
            if (result.status)
            {
                lightColor = "#00FF00"
            }
            statusLight.css("background-color", lightColor);
            //Set feedback text
            $(webConsole).append(result.feedbacktext);
            if (webConsole.length)
                webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
        });
    });
});