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
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });

    //HTML element variables
    var webConsole = $('#feedbackText');
    var timezoneCombobox = $('#timezoneSelector');
    var downloadDateSelector = $('#downloadDateSelector');
    var configPopupGreyScreen = $('.configEditGreyScreen');
    var configSelector = $('#configSelector');
    var configFieldValue = $('#configFieldValue');
    var configChangeFeedback = $('#configChangeFeedback')
    var downloadGreyScreen = $('.downloadGreyScreen');
    var downloadPrompt = $('.downloadPrompt');
    var downloadConfirmation = $('.imageDownloadConfirmation');
    var downloadProgressPrompt = $('.imageDownloadProgress');
    var downloadBarInsides = $('.downloadingBarInsides');
    var downloadProgressSpan = $('.downloadProgressSpan')
    var imageDownloadConfirmationDetails = $('#imageDownloadConfirmationDetails');
    var cameraLight = $('#cameraLight');
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
    var installCheck = $('#installPartedCheck');
    var formatData1Check = $('#formatData1Check');
    var formatData2Check = $('#formatData2Check');

    //Useful globals + constants
    var doingCommand = false;
    var simpleColorMapping = {true: "#00FF00", false: "#FF0000"};
    var complexColorMapping = {0: "#FF0000", 1: "#FF9900", 2: "#00FF00"};

    //Useful strings
    var line = "-------------------------------\n"

    //Button click events
    $("#CameraOn").click({callback: cameraOnHandler}, preCommandOK);
    $("#CameraOff").click({callback: cameraOffHandler}, preCommandOK);
    $("#VideoCameraOn").click({callback: videoOnHandler}, preCommandOK);
    $("#VideoCameraOff").click({callback: videoOffHandler}, preCommandOK);
    $("#CameraStatus").click({callback: cameraStatusHandler}, preCommandOK);
    $("#DownloadPictures").click({callback: downloadPicturesHandler}, preCommandOK);
    $("#ConfirmImageDownload").click({callback: startPictureDownloadHandler}, preCommandOK);
    $("#CancelImageDownload").click({callback: cancelPictureDownloadHandler}, preCommandOK);
    $("#CancelImageDownloadInProgress").click({callback: cancelPictureDownloadHandler}, preCommandOK);
    $("#HDDOn").click({callback: hddOnHandler}, preCommandOK);
    $("#HDDOff").click({callback: hddOffHandler}, preCommandOK);
    $("#MountHDD").click({callback: hddMountHandler}, preCommandOK);
    $("#UnmountHDD").click({callback: hddUnmountHandler}, preCommandOK);
    $("#FormatDrives").click({callback: hddFormatHandler}, preCommandOK);
    $("#HDDRunSmartTest").click({callback: smartTestHandler}, preCommandOK);
    $("#CheckSpace").click({callback: hddSpaceCheckHandler}, preCommandOK);
    $("#GPSCheck").click({callback: gpsCheckHandler}, preCommandOK);
    $("#ChangeTimezone").click({callback: timezoneHandler}, preCommandOK);
    $("#OutputTime").click({callback: outputTimeHandler}, preCommandOK);
    $("#IntervalCheck").click({callback: intervalTestHandler}, preCommandOK);
    $("#PrevIntervalCheck").click({callback: checkPrevIntervalHandler}, preCommandOK);
    $("#InternetCheck").click({callback: internetCheckHandler}, preCommandOK);
    $("#RestartModem").click({callback: restartModemHandler}, preCommandOK);
    $("#VPNCheck").click({callback: vpnCheckHandler}, preCommandOK);
    $("#RestartVPN").click({callback: restartVPNHandler}, preCommandOK);
    $("#StatusCheck").click({callback: systemStatusHandler}, preCommandOK);
    $("#StatusConfig").click({callback: statusConfigHandler}, preCommandOK);
    $("#CheckLatestLogs").click({callback: latestLogsHandler}, preCommandOK);
    $("#CheckLatestPrevLogs").click({callback: latestPrevLogsHandler}, preCommandOK);
    $("#EditDFNConfig").click({callback: populateConfigChangeBox}, preCommandOK);
    $("#ConfigPopupExit").click(closeConfigEditHandler);
    $("#ConfigPopupSave").click({callback: saveConfigChanges}, preCommandOK);
    $("#SaveConsoleOutput").click({callback: saveConsoleOutputHandler}, preCommandOK);

    //Code for adding to web console
    function addToWebConsole(inputText) {
        $(webConsole).append(inputText);
        if (webConsole.length)
            webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
    }

    //Code runs before each command is executed and checks for connection and command state
    function preCommandOK(event) {
        if (!doingCommand) {
            $.ajax({
                url: '/connectioncheck',
                dataType: 'json',
                success: event.data.callback,
                timeout: 3000,
                error: timedOut
            });
        }
    }

    function timedOut(jqXHR, status, errorThrown) {
        addToWebConsole("ERROR: NO CONNECTION\n" + line);
    }

    /***************************************************/
    /* CODE FOR BUTTON PRESS HANDLERS, AJAX REQUESTERS */
    /***************************************************/

    function cameraOnHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Switching camera on...\n");
        //Request to turn camera on
        $.getJSON("/cameraon", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colour
            cameraLight.css("background-color", simpleColorMapping[result.cameraStatus]);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function cameraOffHandler() {
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
        });
    }

    function videoOnHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Switching video camera on...\n");
        //Request to turn camera on
        $.getJSON("/videocameraon", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function videoOffHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Switching video camera off...\n");
        //Request to turn camera on
        $.getJSON("/videocameraoff", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function cameraStatusHandler() {
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
        });
    }

    var currDownloadDirectory;

    function downloadPicturesHandler() {
        doingCommand = true;
        //Get the file size of pictures from that date date (if they exist)
        var selectedDate = $(downloadDateSelector).datepicker('getDate');
        if (selectedDate != null) {
            var selectedDay = selectedDate.getDate()
            var selectedMonth = selectedDate.getMonth() + 1
            var selectedYear = selectedDate.getFullYear();

            $.getJSON("/findpictures", {
                day: selectedDay,
                month: selectedMonth,
                year: selectedYear
            }, function (result) {
                if (result.foundDirectory) {
                    $(imageDownloadConfirmationDetails).text(result.filesize);
                    $(downloadGreyScreen).css("display", "flex");
                    currDownloadDirectory = result.filepath
                }
                else {
                    window.alert("No images found for selected date.");
                }
            });
        }
        else {
            window.alert("Please select a date.");
        }
    }

    function startPictureDownloadHandler() {
        //Change display to loading bar window
        $(downloadConfirmation).css("display", "none");
        $(downloadProgressPrompt).css("display", "flex");
        downloadBarInsides.css("width", "25%");
        downloadProgressSpan.text("0%");

        //Go start that download thread, boss.
        /*$.getJSON("/startdownload", {directory: currDownloadDirectory}, function (result) {
         if(result.success) {
         finished = false;
         while(finished == false) {
         //Go fetch progress
         $.getJSON("/downloadProgress", function (progressResult) {
         if(progressResult.finished) {
         finished = true;
         }
         else {
         progress = progressResult.percent;
         downloadBarInsides.css("width", progressResult.percent.toString() + "%");
         downloadProgressSpan.text(progressResult.percent.toString() + "%");
         }
         });
         //Wait half a second before fetching progress again
         setTimeout(function(){return}, 500);
         }
         window.alert("Download successful.")
         cancelPictureDownloadHandler()
         }
         else {
         window.alert("ERROR: Download request unsuccessful. (Possible causes include the USB not being found, the files not existing, etc.")
         }
         });*/
    }

    function cancelPictureDownloadHandler() {
        $(downloadConfirmation).css("display", "flex");
        $(downloadProgressPrompt).css("display", "none");
        $(downloadGreyScreen).css("display", "none");
        doingCommand = false;
    }

    function hddOnHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Enabling External HDDs...\n");
        //Request to enable HDDs
        $.getJSON("/enablehdd", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colours
            hdd0Light.css("background-color", complexColorMapping[result.HDD0Status]);
            hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
            hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
            hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
            hdd0Space.text(result.HDD0Space);
            hdd1Space.text(result.HDD1Space);
            hdd2Space.text(result.HDD2Space);
            hdd3Space.text(result.HDD3Space);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function hddOffHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Disabling External HDDs...\n");
        //Request to enable HDDs
        $.getJSON("/disablehdd", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colours
            hdd0Light.css("background-color", complexColorMapping[result.HDD0Status]);
            hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
            hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
            hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
            hdd0Space.text(result.HDD0Space);
            hdd1Space.text(result.HDD1Space);
            hdd2Space.text(result.HDD2Space);
            hdd3Space.text(result.HDD3Space);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function hddMountHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Mounting external HDDs...\n");
        //Request to enable HDDs
        $.getJSON("/mounthdd", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colours
            hdd0Light.css("background-color", complexColorMapping[result.HDD0Status]);
            hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
            hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
            hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
            hdd0Space.text(result.HDD0Space);
            hdd1Space.text(result.HDD1Space);
            hdd2Space.text(result.HDD2Space);
            hdd3Space.text(result.HDD3Space);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function hddUnmountHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Unmounting external HDDs...\n");
        //Request to enable HDDs
        $.getJSON("/unmounthdd", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colours
            hdd0Light.css("background-color", complexColorMapping[result.HDD0Status]);
            hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
            hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
            hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
            hdd0Space.text(result.HDD0Space);
            hdd1Space.text(result.HDD1Space);
            hdd2Space.text(result.HDD2Space);
            hdd3Space.text(result.HDD3Space);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function hddFormatHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Formatting HDDs...\n");
        //Pack checkbox data into JSON
        var checkData = {
            installChecked: installCheck.is(':checked'),
            data1Checked: formatData1Check.is(':checked'),
            data2Checked: formatData2Check.is(':checked')
        };
        //Request to enable HDDs
        $.getJSON("/formathdd", checkData, function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colours
            hdd0Light.css("background-color", complexColorMapping[result.HDD0Status]);
            hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
            hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
            hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
            hdd0Space.text(result.HDD0Space);
            hdd1Space.text(result.HDD1Space);
            hdd2Space.text(result.HDD2Space);
            hdd3Space.text(result.HDD3Space);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function smartTestHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Running smart test...\n");
        //Request for smart test results
        $.getJSON("/smarttest", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + line);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function hddSpaceCheckHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Checking external HDDs...\n");
        //Request to enable HDDs
        $.getJSON("/hddcheck", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colours
            hdd0Light.css("background-color", complexColorMapping[result.HDD0Status]);
            hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
            hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
            hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
            hdd0Space.text(result.HDD0Space);
            hdd1Space.text(result.HDD1Space);
            hdd2Space.text(result.HDD2Space);
            hdd3Space.text(result.HDD3Space);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function gpsCheckHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Checking GPS status...\n");
        //Request to check GPS status
        $.getJSON("/gpscheck", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colour
            gpsLight.css("background-color", complexColorMapping[result.gpsStatus]);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function timezoneHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("DONE\n");
        $.getJSON("/timezonechange", {zone: timezoneCombobox.find(":selected").attr("value")}, function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function outputTimeHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("CURRENT TIME:\n");
        $.getJSON("/outputTime", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function internetCheckHandler() {
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
        });
    }

    function restartModemHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Restarting modem...\n");
        //Request to check GPS status
        $.getJSON("/restartmodem", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colour
            internetLight.css("background-color", simpleColorMapping[result.internetStatus]);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function vpnCheckHandler() {
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
        });
    }

    function restartVPNHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Restarting VPN...\n");
        //Request to check GPS status
        $.getJSON("/restartvpn", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colour
            vpnLight.css("background-color", simpleColorMapping[result.vpnStatus]);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function intervalTestHandler() {
        doingCommand = true;
        $(webConsole).append("Performing interval test...\n");
        //Request to perform interval test
        $.getJSON("/intervaltest", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Set light colours
            intervalLight.css("background-color", simpleColorMapping[result.intervalTestResult])
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function checkPrevIntervalHandler() {
        doingCommand = true;
        $(webConsole).append("Retrieving previous interval test...\n");
        //Request to perform interval test
        $.getJSON("/previntervaltest", function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Open up for other commands to be run
            doingCommand = false;
        });
    }

    function statusConfigHandler() {
        doingCommand = true;
        //Request file
        $.get("/statusconfig", function (result) {
            var decoded = decode64(result)
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(decoded));
            element.setAttribute('download', 'dfnstation.cfg');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            doingCommand = false;
        });
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
        });
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
        });
    }

    var configOptions = {};

    function populateConfigChangeBox() {
        $.getJSON('/populateconfigbox', function (result) {
            $('#configSelector').find('option').remove().end();
            configOptions = result;
            $.each(result, function (k, v) {
                $(configSelector).append(
                    $('<option>', {text: k, value: v})
                );
            });
            $("#configSelector option:first").attr('selected', 'selected')
            $("#configSelector").change().focus();
            $(configFieldValue).val($("#configSelector option:selected").val());
            $(configChangeFeedback).text("");
            $(configPopupGreyScreen).css("display", "flex");
        });
    }

    $("#configSelector").change(function () {
        var selectedOption = $(this).find("option:selected").text();
        $(configFieldValue).val(configOptions[selectedOption]);
        $(configChangeFeedback).text("");
    });

    $("#changeConfigForm").submit(function (e) {
        e.preventDefault();
        if (!doingCommand) {
            $.ajax({
                url: '/connectioncheck',
                dataType: 'json',
                success: saveConfigChanges,
                timeout: 3000,
                error: timedOut
            });
        }
    });

    function saveConfigChanges()
    {
        //Create JSON with entered data
        var selectedOptionText = $("#configSelector option:selected").text();
        var selectedOptionValue = $(configFieldValue).val();
        data = {key: selectedOptionText, value: selectedOptionValue};

        $.getJSON('/updateconfigfile', data, function(result) {
            //Feedback to user
            $(configChangeFeedback).text(result.consoleFeedback);
            addToWebConsole(result.consoleFeedback + "\n" + line);

            //Update local copy
            configOptions[selectedOptionText] = selectedOptionValue;
            $("#configSelector option:selected").val(selectedOptionValue)

        });
    }

    function closeConfigEditHandler() {
        $(configPopupGreyScreen).css("display", "none");
    }

    function systemStatusHandler() {
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
            hdd0Light.css("background-color", complexColorMapping[result.HDD0Status]);
            hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
            hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
            hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
            hdd0Space.text(result.HDD0Space);
            hdd1Space.text(result.HDD1Space);
            hdd2Space.text(result.HDD2Space);
            hdd3Space.text(result.HDD3Space);
            //Open up for other commands to be run
            doingCommand = false;
        });
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
        var i, tabContent, tabControl;
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
});
