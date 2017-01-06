$(document).ready(function() {

  //Code for tab controls
  function changeTab(event)
  {
    var i, tabContent, tabControl;
    var contentName = event.data.contentName;
    var tabName = event.data.tabName;

    $(".tabContent").each(function() {
      $(this).css("display", "none");
    })

    $(".tabControl li").each(function() {
      $(this).removeClass("active");
    })

    $("." + contentName).css("display", "block");
    $("#" + tabName).addClass("active");
  }

  $("#statusTab").click({tabName: "statusTab", contentName: "statusControl"}, changeTab);
  $("#cameraTab").click({tabName: "cameraTab", contentName: "cameraControl"}, changeTab);
  $("#hddTab").click({tabName: "hddTab", contentName: "hddControl"}, changeTab);
  $("#networkTab").click({tabName: "networkTab", contentName: "networkControl"}, changeTab);
  $("#gpsTab").click({tabName: "gpsTab", contentName: "gpsControl"}, changeTab);
  $("#advancedTab").click({tabName: "advancedTab", contentName: "advancedControl"}, changeTab);
  $("#statusTab").trigger("click");
});
