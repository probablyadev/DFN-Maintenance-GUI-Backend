$(document).ready(function () {

    //Change img with svg source to inline svg
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });

    //Create date picker
    $(".datepicker").datepicker({
        inline: true,
        showOtherMonths: true,
        dateFormat: 'dd-mm-yy',
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    });

    //HTML element variables
    var webConsole = $('#feedbackText');
    var formatData1Wrapper = "#formatData1Wrapper";
    var formatData2Wrapper = "#formatData2Wrapper";
    var formatData3Wrapper = "#formatData3Wrapper";
    var formatDrivesGreyScreen = $(".formatDrivesGreyScreen");
    var formatDrivesPreConfirmation = $("#FormatDrivesPreConfirmation");
    var formatDrivesConfirmation = $(".formatDrivesConfirmation");
    var formatConfirmationTextBox = $("#FormatConfirmationTextBox");
    var formatDrivesButton = $("#FormatDrives");
    var timezoneCombobox = $('#timezoneSelector');
    var downloadDateSelector = $('#DownloadDateSelector');
    var downloadTimeSelector = $('#DownloadTimeSelector');
    var spinnerGreyScreen = $('.spinnerGreyScreen');
    var spinnerSpan = $('.spinnerSpan');
    var configPopupGreyScreen = $('.configEditGreyScreen');
    var configSelector = $('#configSelector');
    var configFieldValue = $('#configFieldValue');
    var configChangeFeedback = $('#configChangeFeedback');
    var cameraLight = $('#cameraLight');
    var videoCameraLight = $('#videoCameraLight');
    var gpsLight = $('#GPSLight');
    var internetLight = $('#internetLight');
    var vpnLight = $('#vpnLight');
    var intervalLight = $('#intervalLight');
    var hdd0Light = $('#HDD0Light');
    var hdd1Light = $('#HDD1Light');
    var hdd2Light = $('#HDD2Light');
    var hdd3Light = $('#HDD3Light');
    var hdd0Space = $('#HDD0Space');
    var hdd1Space = $('#HDD1Space');
    var hdd2Space = $('#HDD2Space');
    var hdd3Space = $('#HDD3Space');
    var formatData1Check = $('#formatData1Check');
    var formatData2Check = $('#formatData2Check');
    var formatData3Check = $('#formatData3Check');

    //Useful globals + constants
    var hostname = "DFNSMALL62";
    var doingCommand = false;
    var simpleColorMapping = {true: "#00FF00", false: "#FF0000"};
    var complexColorMapping = {0: "#FF0000", 1: "#FF9900", 2: "#00FF00"};

    //Useful strings
    var line = "-------------------------------\n";

    //Button click events
    $("#CameraOn").click(cameraOnHandler);
    $("#CameraOff").click(cameraOffHandler);
    $("#VideoCameraOn").click(videoOnHandler);
    $("#VideoCameraOff").click(videoOffHandler);
    $("#CameraStatus").click(cameraStatusHandler);
    $("#DownloadNEFPicture").click(downloadPictureHandler);
    $("#DownloadJPGPicture").click(downloadThumbnailHandler);
    $("#DownloadDateSelector").datepicker().on("input change", findPicturesHandler);
    $("#HDDOn").click(hddOnHandler);
    $("#HDDOff").click(hddOffHandler);
    $("#MountHDD").click(hddMountHandler);
    $("#UnmountHDD").click(hddUnmountHandler);
    $("#ProbeHDDs").click(hddProbeHandler);
    $("#formatData1Check").change(formatCheckboxChangedHandler);
    $("#formatData2Check").change(formatCheckboxChangedHandler);
    $("#formatData3Check").change(formatCheckboxChangedHandler);
    $("#FormatDrivesPreConfirmation").click(openFormatConfirmationMenu);
    $("#ExitFormatMenu").click(closeFormatMenu);
    $("#ExitFormatConfirmation").click(closeFormatConfirmationMenu);
    $("#FormatConfirmationTextBox").keyup(formatConfirmHostnameHandler);
    $("#FormatDrives").click(hddFormatHandler);
    $("#HDDRunSmartTest").click(smartTestHandler);
    $("#CheckSpace").click(hddSpaceCheckHandler);
    $("#GPSCheck").click(gpsCheckHandler);
    $("#ChangeTimezone").click(timezoneHandler);
    $("#OutputTime").click(outputTimeHandler);
    $("#IntervalCheck").click(intervalTestHandler);
    $("#PrevIntervalCheck").click(checkPrevIntervalHandler);
    $("#InternetCheck").click(internetCheckHandler);
    $("#RestartModem").click(restartModemHandler);
    $("#VPNCheck").click(vpnCheckHandler);
    $("#RestartVPN").click(restartVPNHandler);
    $("#StatusCheck").click(systemStatusHandler);
    $("#StatusConfig").click(statusConfigHandler);
    $("#CheckLatestLogs").click(latestLogsHandler);
    $("#CheckLatestPrevLogs").click(latestPrevLogsHandler);
    $("#EditDFNConfig").click(populateConfigChangeBox);
    $("#ConfigPopupExit").click(closeConfigEditHandler);
    $("#ConfigPopupSave").click(saveConfigChanges);
    $("#SaveConsoleOutput").click(saveConsoleOutputHandler);

    //Useful frontend feedback functions
    function addToWebConsole(inputText) {
        $(webConsole).append(inputText);
        if (webConsole.length)
            webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
    }

    function consoleBlinkGreen() {
        $(webConsole).css('border', '2px solid LimeGreen');
        $(webConsole).animate({
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent'
        }, 600, 'swing');
    }

    function drawHDDStatus(result) {
        hdd0Light.css("background-color", complexColorMapping[result.HDD0Status]);
        hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
        hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
        hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
        hdd0Space.text(result.HDD0Space);
        hdd1Space.text(result.HDD1Space);
        hdd2Space.text(result.HDD2Space);
        hdd3Space.text(result.HDD3Space);
    }

    function openSpinner(message) {
        $(spinnerSpan).text(message);
        $(spinnerGreyScreen).css('display', 'flex');
    }

    function closeSpinner() {
        spinnerGreyScreen.css('display', 'none');
    }

    function openFormatMenu() {
        $(formatDrivesGreyScreen).css("display", "flex");
    }

    function closeFormatMenu() {
        $(formatDrivesGreyScreen).css("display", "none");
    }

    function unselectAllFormatCheckboxes() {
        $(formatData1Check).prop('checked', false);
        $(formatData1Wrapper).css('display', 'none');
        $(formatData2Wrapper).prop('checked', false);
        $(formatData2Check).css('display', 'none');
        $(formatData3Wrapper).prop('checked', false);
        $(formatData3Check).css('display', 'none');
    }

    function openFormatConfirmationMenu() {
        $(formatDrivesConfirmation).css("display", "flex");
    }

    function closeFormatConfirmationMenu() {
        $(formatDrivesConfirmation).css("display", "none");
    }

    function preCommandCheck() {
        var approved = false;
        if (!doingCommand) {
            approved = true
        }
        return approved;
    }

    function getHostname() {
        $.getJSON('/gethostname', function(result) {
            hostname = result.hostname
        });
    }

    function timedOut(jqXHR, status, errorThrown) {
        doingCommand = false;
        $(configPopupGreyScreen).css('display', 'none');
        $(window).unbind('beforeunload');
        closeSpinner();
        if (jqXHR.status == 200) {
            addToWebConsole("ERROR: Session timed out. Redirecting to login...\n" + line);
            setTimeout(function () {
                    window.location.replace("/")
                }, 2000
            );
        }
        else if (jqXHR.status == 500) {
            addToWebConsole("ERROR: Internal server error. Please save console output and report this bug.\n" + line);
        }
        else {
            addToWebConsole("ERROR: NO CONNECTION\n" + line);
        }
    }

    /***************************************************/
    /* CODE FOR BUTTON PRESS HANDLERS, AJAX REQUESTERS */
    /***************************************************/

    function cameraOnHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Switching camera on...\n");
            openSpinner("Switching camera on, sit tight...");
            //Request to turn camera on
            $.getJSON("/cameraon", function (result) {
                closeSpinner();
                consoleBlinkGreen();
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                cameraLight.css("background-color", simpleColorMapping[result.cameraStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function cameraOffHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Switching camera off...\n");
            //Request to turn camera off
            $.getJSON("/cameraoff", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                cameraLight.css("background-color", simpleColorMapping[result.cameraStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function videoOnHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Switching video camera on...\n");
            //Request to turn camera on
            $.getJSON("/videocameraon", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function videoOffHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Switching video camera off...\n");
            //Request to turn camera on
            $.getJSON("/videocameraoff", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function cameraStatusHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking camera...\n");
            //Request to turn camera off
            $.getJSON("/camerastatus", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                cameraLight.css("background-color", simpleColorMapping[result.cameraStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function findPicturesHandler() {
        //Reset time selector
        $(downloadTimeSelector).find('option').remove().end();
        //Get the list of pictures and their timestamps from that date (if they exist)
        var selectedDate = $(downloadDateSelector).datepicker('getDate');
        if (selectedDate != null) {
            var selectedDay = selectedDate.getDate();
            var selectedMonth = selectedDate.getMonth() + 1;
            var selectedYear = selectedDate.getFullYear();

            $.getJSON("/findpictures", {
                day: selectedDay,
                month: selectedMonth,
                year: selectedYear
            }, function (result) {
                if (!$.isEmptyObject(result)) {
                    configOptions = result;
                    $.each(result, function (k, v) {
                        $(downloadTimeSelector).append(
                            $('<option>', {text: k, value: v})
                        );
                    });
                }
                else {
                    $(downloadTimeSelector).append(
                        $('<option>', {text: "No Images Found", value: null})
                    );
                }
            }).fail(timedOut);
        }
        else {
            window.alert("Please select a date.");
        }
    }

    function downloadPictureHandler() {
        if ($(downloadTimeSelector).val() && downloadTimeSelector.find(":selected").attr("value") != null) {
            var path = downloadTimeSelector.find(":selected").attr("value");
            var filename = path.split("/").slice(-1)[0];
            $.getJSON('/downloadpicture', {filepath: path}, function (result) {
                if (result.success) {
                    var element = document.createElement('a');
                    element.setAttribute('href', "/static/downloads/" + filename);
                    element.setAttribute('download', filename);
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                }
                else {
                    addToWebConsole("Download error: Unable to serve NEF. Select a picture again.\n" + line);
                }
            }).fail(timedOut);
        }
        else {
            addToWebConsole("Download error: Please select a valid date and time.\n" + line);
        }
    }

    function downloadThumbnailHandler() {
        if ($(downloadTimeSelector).val() && downloadTimeSelector.find(":selected").attr("value") != null) {
            var nefPath = downloadTimeSelector.find(":selected").attr("value");
            var nefFilename = nefPath.split("/").slice(-1)[0];
            var jpgFilename = nefFilename.replace(".NEF", "-preview3.jpg");
            $("#DownloadJPGPicture").attr("disabled", "disabled");
            $.getJSON('/downloadthumbnail', {filepath: nefPath}, function (result) {
                if (result.success) {
                    var element = document.createElement('a');
                    element.setAttribute('href', "/static/downloads/" + jpgFilename);
                    element.setAttribute('download', jpgFilename);
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    $.get('/removethumbnail', {filepath: "/opt/dfn-software/GUI/static/downloads/" + jpgFilename}, function () {
                        $("#DownloadJPGPicture").removeAttr("disabled");
                    });
                }
                else {
                    addToWebConsole("Download error: Unable to serve jpg. Select a picture again.\n" + line);
                    $("#DownloadJPGPicture").removeAttr("disabled");
                }
            }).fail(timedOut);
        }
        else {
            addToWebConsole("Download error: Please select a valid date and time.\n" + line);
        }
    }

    function hddOnHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Powering on external hard drives...\n");
            openSpinner("Powering on external drives, please wait ~20 seconds...");
            //Request to enable HDDs
            $.getJSON("/enablehdd", function (result) {
                closeSpinner();
                consoleBlinkGreen();
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                drawHDDStatus(result);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function hddOffHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Disabling external hard drives...\n");
            //Request to enable HDDs
            $.getJSON("/disablehdd", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                drawHDDStatus(result);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function hddMountHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Mounting external hard drives...\n");
            //Request to enable HDDs
            $.getJSON("/mounthdd", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                drawHDDStatus(result);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function hddUnmountHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Unmounting external hard drives...\n");
            //Request to enable HDDs
            $.getJSON("/unmounthdd", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                drawHDDStatus(result);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    var probeDict = {"data1": formatData1Wrapper, "data2": formatData2Wrapper, "data3": formatData3Wrapper};

    function hddProbeHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            addToWebConsole("Finding drives to format...\n");
            $.getJSON("/probehdd", function (result) {
                unselectAllFormatCheckboxes();
                if (!$.isEmptyObject(result)) {
                    addToWebConsole("Drives found\n" + line);
                    $.each(result, function (key, value) {
                        $(probeDict[key]).css("display", "flex");
                        $(probeDict[key] + " input").attr("value", value);
                    });
                    openFormatMenu();
                    doingCommand = false;
                }
                else {
                    addToWebConsole("ERROR: No drives detected. Power on drives and try again.\n" + line)
                    doingCommand = false;
                }
            }).fail(timedOut);
        }
    }

    function formatCheckboxChangedHandler() {
        if (formatData1Check.is(':checked') || formatData2Check.is(':checked') || formatData3Check.is(':checked')) {
            $(formatDrivesPreConfirmation).removeAttr('disabled');
            $(formatDrivesPreConfirmation).removeClass('disabled');
        }
        else {
            $(formatDrivesPreConfirmation).attr('disabled', 'disabled');
            $(formatDrivesPreConfirmation).addClass('disabled');
        }
    }

    function formatConfirmHostnameHandler() {
        if ($(formatConfirmationTextBox).val() == hostname) {
            $(formatDrivesButton).removeAttr('disabled');
            $(formatDrivesButton).removeClass('disabled');
        }

        else {
            $(formatDrivesButton).attr('disabled', 'disabled');
            $(formatDrivesButton).addClass('disabled');
        }
    }

    function hddFormatHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            closeFormatConfirmationMenu();
            closeFormatMenu();
            openSpinner("Formatting hard-drives, please wait ~2 minutes...")
            //Feedback on button press
            $(webConsole).append("Formatting hard drives...\n");
            //Get ticked checkboxes and put into a string
            var tickedString = "";
            if($(formatData1Check).is(":checked")) {
                tickedString += $(formatData1Check).val() + " ";
            }
            if($(formatData2Check).is(":checked")) {
                tickedString += $(formatData2Check).val() + " ";
            }
            if($(formatData3Check).is(":checked")) {
                tickedString += $(formatData3Check).val();
            }
            $.getJSON("/formathdd", {args: tickedString}, function (result) {
                closeSpinner();
                consoleBlinkGreen();
                //Set feedbacktext
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function smartTestHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Running smart test...\n");
            openSpinner("Performing smart test, please wait ~2 minutes...");
            //Request for smart test results
            $.getJSON("/smarttest", function (result) {
                closeSpinner();
                consoleBlinkGreen();
                //Set feedback text
                addToWebConsole(result.consoleFeedback + line);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function hddSpaceCheckHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking hard drives...\n");
            //Request to enable HDDs
            $.getJSON("/hddcheck", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                drawHDDStatus(result);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function gpsCheckHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking GPS status...\n");
            //Request to check GPS status
            $.getJSON("/gpscheck", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                gpsLight.css("background-color", simpleColorMapping[result.gpsStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function timezoneHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Changing time zone...\n");
            $.getJSON("/timezonechange", {zone: timezoneCombobox.find(":selected").attr("value")}, function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function outputTimeHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("CURRENT TIME:\n");
            $.getJSON("/outputTime", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function internetCheckHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking internet connectivity...\n");
            //Request to check GPS status
            $.getJSON("/internetcheck", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                internetLight.css("background-color", complexColorMapping[result.internetStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function restartModemHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Restarting modem...\n");
            openSpinner("Restarting modem, just a minute...");
            //Request to check GPS status
            $.getJSON("/restartmodem", function (result) {
                closeSpinner();
                consoleBlinkGreen();
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                internetLight.css("background-color", simpleColorMapping[result.internetStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function vpnCheckHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking vpn connectivity...\n");
            //Request to check GPS status
            $.getJSON("/vpncheck", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                vpnLight.css("background-color", simpleColorMapping[result.vpnStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function restartVPNHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Restarting VPN...\n");
            openSpinner("Restarting VPN, just a minute...");
            //Request to check GPS status
            $.getJSON("/restartvpn", function (result) {
                closeSpinner();
                consoleBlinkGreen();
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                vpnLight.css("background-color", simpleColorMapping[result.vpnStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function intervalTestHandler() {
        if (preCommandCheck()) {
            $(window).bind("beforeunload",function(event) {
                return "WARNING: Refreshing while interval test is running is NOT recommended.\n Please only do this if you are 100% sure.";
            });
            doingCommand = true;
            openSpinner("Performing interval test... Go grab some coffee!");
            $(webConsole).append("Performing interval test...\n");
            //Request to perform interval test
            $.getJSON("/intervaltest", function (result) {
                closeSpinner();
                consoleBlinkGreen();
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                intervalLight.css("background-color", simpleColorMapping[result.intervalTestResult]);
                //Open up for other commands to be run
                doingCommand = false;
            $(window).unbind('beforeunload');

            }).fail(timedOut);
        }
    }

    function checkPrevIntervalHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            $(webConsole).append("Retrieving previous interval test...\n");
            //Request to perform interval test
            $.getJSON("/previntervaltest", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function statusConfigHandler() {
        doingCommand = true;
        //Request file
        $.get("/statusconfig", function (result) {
            var decoded = decode64(result);
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(decoded));
            element.setAttribute('download', 'dfnstation.cfg');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            doingCommand = false;
        }).fail(timedOut);
    }

    function latestLogsHandler() {
        doingCommand = true;
        //Feedback
        addToWebConsole("Fetching latest logfile...\n");
        //Request file
        $.getJSON("/getlatestlog", function (result) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.file));
            element.setAttribute('download', 'latestlog.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            addToWebConsole("Logfile created:\n" + result.timestamp + "\n" + line);
            doingCommand = false;
        }).fail(timedOut);
    }

    function latestPrevLogsHandler() {
        doingCommand = true;
        //Feedback
        addToWebConsole("Fetching latest_prev logfile...\n");
        //Request file
        $.getJSON("/getlatestprevlog", function (result) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.file));
            element.setAttribute('download', 'latestprevlog.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            addToWebConsole("Logfile created:\n" + result.timestamp + "\n" + line);
            doingCommand = false;
        }).fail(timedOut);
    }

    var configOptions = {};

    function populateConfigChangeBox() {
        if (preCommandCheck()) {
            $.getJSON('/populateconfigbox', function (result) {
                $('#configSelector').find('option').remove().end();
                configOptions = result;
                $.each(result, function (k, v) {
                    $(configSelector).append(
                        $('<option>', {text: k, value: v})
                    );
                });
                $("#configSelector option:first").attr('selected', 'selected');
                $("#configSelector").change().focus();
                $(configFieldValue).val($("#configSelector option:selected").val());
                $(configChangeFeedback).text("");
                $(configPopupGreyScreen).css("display", "flex");
            }).fail(timedOut);
        }
    }

    $("#configSelector").change(function () {
        var selectedOption = $(this).find("option:selected").text();
        $(configFieldValue).val(configOptions[selectedOption]);
        $(configChangeFeedback).text("");
    });

    $("#changeConfigForm").submit(function (e) {
        e.preventDefault();
        saveConfigChanges();
    });

    function saveConfigChanges() {
        if (preCommandCheck()) {
            //Create JSON with entered data
            var selectedOptionText = $("#configSelector option:selected").text();
            var selectedOptionValue = $(configFieldValue).val();
            data = {key: selectedOptionText, value: selectedOptionValue};

            $.getJSON('/updateconfigfile', data, function (result) {
                //Feedback to user
                $(configChangeFeedback).text(result.consoleFeedback);
                addToWebConsole(result.consoleFeedback + "\n" + line);

                //Update local copy
                configOptions[selectedOptionText] = selectedOptionValue;
                $("#configSelector option:selected").val(selectedOptionValue)
                doingCommand = false;

            }).fail(timedOut);
        }
    }

    function closeConfigEditHandler() {
        $(configPopupGreyScreen).css("display", "none");
    }

    function systemStatusHandler() {
        if (preCommandCheck()) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking system status...\n");
            //Request for system status to be checked
            $.getJSON("/systemstatus", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                cameraLight.css("background-color", simpleColorMapping[result.cameraStatus]);
                gpsLight.css("background-color", simpleColorMapping[result.gpsStatus]);
                internetLight.css("background-color", simpleColorMapping[result.internetStatus]);
                vpnLight.css("background-color", simpleColorMapping[result.vpnStatus]);
                drawHDDStatus(result);
                //Open up for other commands to be run
                doingCommand = false;
            }).fail(timedOut);
        }
    }

    function saveConsoleOutputHandler() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent($(webConsole).val()));
        element.setAttribute('download', 'webconsolelog.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    //Code for tab controls
    function changeTab(event) {
        var tabContent, tabControl;
        var contentName = event.data.contentName;
        var tabName = event.data.tabName;

        $(".tabContent").each(function () {
            $(this).css("display", "none");
        });

        $(".tabControl li").each(function () {
            $(this).removeClass("active");
        });

        $("." + contentName).css("display", "flex");
        $("#" + tabName).addClass("active");
    }

    $("#statusTab").click({tabName: "statusTab", contentName: "statusControl"}, changeTab);
    $("#cameraTab").click({tabName: "cameraTab", contentName: "cameraControl"}, changeTab);
    $("#hddTab").click({tabName: "hddTab", contentName: "hddControl"}, changeTab);
    $("#networkTab").click({tabName: "networkTab", contentName: "networkControl"}, changeTab);
    $("#gpsTab").click({tabName: "gpsTab", contentName: "gpsControl"}, changeTab);
    $("#advancedTab").click({tabName: "advancedTab", contentName: "advancedControl"}, changeTab);
    $("#statusTab").trigger("click");

    //Get system status
    systemStatusHandler();
    getHostname();
});