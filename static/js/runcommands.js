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

    //HTML element variables
    var webConsole = $('#feedbackText');
    var timezoneCombobox = $('#timezoneSelector');
    var downloadDateSelector = $('#downloadDateSelector');
    var downloadGreyScreen = $('.downloadGreyScreen');
    var downloadPrompt = $('.downloadPrompt');
    var downloadConfirmation = $('.imageDownloadConfirmation');
    var downloadProgress = $('.imageDownloadProgress');
    var cameraLight = $('#cameraLight');
    var gpsLight = $('#GPSLight');
    var internetLight = $('#internetLight');
    var vpnLight = $('#vpnLight');
    var intervalLight = $('#intervalLight');
    var hdd0Light = $('#HDD0Light');
    var hdd1Light = $('#HDD1Light');
    var hdd2Light = $('#HDD2Light');
    var hdd3Light = $('#HDD3Light');
    var hdd1Space = $('#HDD1Space');
    var hdd2Space = $('#HDD2Space');
    var hdd3Space = $('#HDD3Space');
    var installCheck = $('#installPartedCheck');
    var formatData1Check = $('#formatData1Check');
    var formatData2Check = $('#formatData2Check');

    //Useful globals + constants
    var doingCommand = false;
    var simpleColorMapping = {true: "#00FF00", false: "#FF0000"};
    var complexColorMapping = {0: "#FF0000", 1: "#FF9900", 2: "#00FF00"}

    //Useful strings
    var line = "-------------------------------\n"

    //Button click events
    $("#CameraOn").click(cameraOnHandler);
    $("#CameraOff").click(cameraOffHandler);
    $("#CameraStatus").click(cameraStatusHandler);
    $("#DownloadPictures").click(downloadPicturesHandler);
    $("#ConfirmImageDownload").click(startPictureDownloadHandler);
    $("#CancelImageDownload").click(cancelPictureDownloadHandler);
    $("#CancelImageDownloadInProgress").click(cancelPictureDownloadHandler);
    $("#HDDOn").click(hddOnHandler);
    $("#HDDOff").click(hddOffHandler);
    $("#MountHDD").click(hddMountHandler);
    $("#UnmountHDD").click(hddUnmountHandler);
    $("#FormatDrives").click(hddFormatHandler);
    $("#CheckSpace").click(hddSpaceCheckHandler);
    $("#Data0Check").click(data0CheckHandler);
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

    //Code for adding to web console
    function addToWebConsole(inputText) {
        $(webConsole).append(inputText);
        if (webConsole.length)
            webConsole.scrollTop(webConsole[0].scrollHeight - webConsole.height());
    }

    /***************************************************/
    /* CODE FOR BUTTON PRESS HANDLERS, AJAX REQUESTERS */
    /***************************************************/

    function cameraOnHandler() {
        if (!doingCommand) {
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
    }

    function cameraOffHandler() {
        if (!doingCommand) {
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
    }

    function cameraStatusHandler() {
        if (!doingCommand) {
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
    }

    function downloadPicturesHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Fetching pictures...\n");
            //Bring up download window
            $(downloadGreyScreen).css("display", "flex");
            doingCommand = false;
        }
    }

    function startPictureDownloadHandler() {
        $(downloadConfirmation).css("display", "none");
        $(downloadProgress).css("display", "flex");
    }

    function cancelPictureDownloadHandler() {
        $(downloadConfirmation).css("display", "flex");
        $(downloadProgress).css("display", "none");
        $(downloadGreyScreen).css("display", "none");
    }

    function hddOnHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Enabling External HDDs...\n");
            //Request to enable HDDs
            $.getJSON("/enablehdd", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
                hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                hdd3Space.text(result.HDD3Space);
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
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
                hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                hdd3Space.text(result.HDD3Space);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function hddMountHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Mounting external HDDs...\n");
            //Request to enable HDDs
            $.getJSON("/mounthdd", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
                hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                hdd3Space.text(result.HDD3Space);
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
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
                hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                hdd3Space.text(result.HDD3Space);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function hddFormatHandler() {
        if (!doingCommand) {
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
                hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
                hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                hdd3Space.text(result.HDD3Space);
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
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colours
                hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
                hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                hdd3Space.text(result.HDD3Space);
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
                addToWebConsole(result.consoleFeedback + "\n" + line);

                //Set light colours
                hdd0Light.css("background-color", simpleColorMapping[result.data0Boolean]);

                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function gpsCheckHandler() {
        if (!doingCommand) {
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
            });
        }
    }

    function timezoneHandler() {
        if (!doingCommand) {
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
    }

    function outputTimeHandler() {
        if (!doingCommand) {
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
    }

    function internetCheckHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Checking internet connectivity...\n");
            //Request to check GPS status
            $.getJSON("/internetcheck", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                internetLight.css("background-color", simpleColorMapping[result.internetStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function restartModemHandler() {
        if (!doingCommand) {
            doingCommand = true;
            //Feedback on button press
            $(webConsole).append("Restarting modem...\n");
            //Request to check GPS status
            $.getJSON("/restartmodem", function (result) {
                //Set feedback text
                addToWebConsole(result.consoleFeedback + "\n" + line);
                //Set light colour
                vpnLight.css("background-color", simpleColorMapping[result.internetStatus]);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
    }

    function vpnCheckHandler() {
        if (!doingCommand) {
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
    }

    function restartVPNHandler() {
        if (!doingCommand) {
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
    }

    function intervalTestHandler() {
        if (!doingCommand) {
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
    }

    function checkPrevIntervalHandler() {
        if (!doingCommand) {
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
    }

    function statusConfigHandler() {
        if (!doingCommand) {
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
            });
        }
    }

    function systemStatusHandler() {
        if (!doingCommand) {
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
                hdd0Light.css("background-color", simpleColorMapping[result.HDD0Status]);
                hdd1Light.css("background-color", complexColorMapping[result.HDD1Status]);
                hdd2Light.css("background-color", complexColorMapping[result.HDD2Status]);
                hdd3Light.css("background-color", complexColorMapping[result.HDD3Status]);
                hdd1Space.text(result.HDD1Space);
                hdd2Space.text(result.HDD2Space);
                hdd3Space.text(result.HDD3Space);
                //Open up for other commands to be run
                doingCommand = false;
            });
        }
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
