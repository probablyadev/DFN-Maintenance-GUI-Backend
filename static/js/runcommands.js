jQuery(document).ready(function(){
    jQuery("button").click(function(){
        jQuery.get("/runcommand", { buttonID : $(this).attr('id') }, function(result){
            jQuery("#feedbackText").val(result);
          });
        });});