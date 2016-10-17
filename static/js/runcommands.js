jQuery(document).ready(function(){
    // Function makes an AJAX request to the server, with the clicked button's ID as input.
    jQuery(".commandbutton").click(function(){
        jQuery.get("/runcommand", { buttonID : $(this).attr('id') }, function(result){
                var psconsole = $('#feedbackText');
                jQuery(psconsole).append(result);
                if(psconsole.length)
                    psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
          });
        });
    });