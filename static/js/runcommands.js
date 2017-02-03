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
    var installCheck = $('#installPartedCheck');
    var formatData1Check = $('#formatData1Check');
    var formatData2Check = $('#formatData2Check');

    //Useful globals + constants
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
    $("#DownloadNEFPicture").click({extension: ".NEF"}, downloadPicturesHandler);
    $("#DownloadJPGPicture").click({extension: ".thumb.masked.jpg"}, downloadPicturesHandler);
    $("#DownloadDateSelector").datepicker().on("input change", findPicturesHandler);
    $("#HDDOn").click(hddOnHandler);
    $("#HDDOff").click(hddOffHandler);
    $("#MountHDD").click(hddMountHandler);
    $("#UnmountHDD").click(hddUnmountHandler);
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
    //Code for adding to web console
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

    function timedOut(jqXHR, status, errorThrown) {
        $(configPopupGreyScreen).css('display', 'none');
        $(downloadGreyScreen).css('display', 'none');
        closeSpinner();
        if (jqXHR.status == 200) {
            addToWebConsole("ERROR: Session timed out. Redirecting to login...\n" + line);
            setTimeout(function () {
                    window.location.replace("/")
                }, 2000
            );
        }
        else {
            addToWebConsole("ERROR: NO CONNECTION\n" + line);
            doingCommand = false;
        }
    }

    /***************************************************/
    /* CODE FOR BUTTON PRESS HANDLERS, AJAX REQUESTERS */
    /***************************************************/

    function cameraOnHandler() {
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
        }).fail(timedOut);
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
        }).fail(timedOut);
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
        }).fail(timedOut);
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
        }).fail(timedOut);
    }

    function findPicturesHandler() {
        doingCommand = true;
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
                doingCommand = false;
            }).fail(timedOut);
        }
        else {
            window.alert("Please select a date.");
            doingCommand = false;
        }
    }

    function downloadPicturesHandler(event) {
        if ($(downloadTimeSelector).val() && downloadTimeSelector.find(":selected").attr("value") != null) {
            var selectedPath = downloadTimeSelector.find(":selected").attr("value");
            var path = selectedPath.replace(".NEF", event.data.extension);
            var filename = path.split("/").slice(-1)[0];
            console.log({path: path, filename: filename});
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
                    addToWebConsole("Download error: Unable to serve photo. Something went seriously wrong here!\n" + line)
                }
            });
        }
        else {
            addToWebConsole("Download error: Please select a valid date and time.\n" + line)
        }
    }

    function hddOnHandler() {
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

    function hddOffHandler() {
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

    function hddMountHandler() {
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

    function hddUnmountHandler() {
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

    function hddFormatHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("Formatting hard drives...\n");
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
            drawHDDStatus(result);
            //Open up for other commands to be run
            doingCommand = false;
        }).fail(timedOut);
    }

    function smartTestHandler() {
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

    function hddSpaceCheckHandler() {
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

    function gpsCheckHandler() {
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

    function timezoneHandler() {
        doingCommand = true;
        //Feedback on button press
        $(webConsole).append("DONE\n");
        $.getJSON("/timezonechange", {zone: timezoneCombobox.find(":selected").attr("value")}, function (result) {
            //Set feedback text
            addToWebConsole(result.consoleFeedback + "\n" + line);
            //Open up for other commands to be run
            doingCommand = false;
        }).fail(timedOut);
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
        }).fail(timedOut);
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
        }).fail(timedOut);
    }

    function restartModemHandler() {
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
        }).fail(timedOut);
    }

    function restartVPNHandler() {
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

    function intervalTestHandler() {
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
            intervalLight.css("background-color", simpleColorMapping[result.intervalTestResult])
            //Open up for other commands to be run
            doingCommand = false;
        }).fail(timedOut);
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
        }).fail(timedOut);
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
        }).fail(timedOut);
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

    function saveConfigChanges() {
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

        }).fail(timedOut);
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
            drawHDDStatus(result);
            //Open up for other commands to be run
            doingCommand = false;
        }).fail(timedOut);
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