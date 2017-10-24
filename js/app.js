$(function (){

    $(".lc-spinner").hide();
    $(".lc-welcome-screen").hide();
    $(".lc-password-match-message").hide();
    $(".lc-date-match-message").hide();

    $("#submit").click(function(){
        var dob = $("#dob").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        var dateControl = document.querySelector('input[type="date"]');

        var enteredDate = new Date(dateControl.value);
        var today = new Date();

        var dataString = 'dob1='+ dob + '&email1='+ email + '&password1='+ password;
        
        if( dob=='' || email==''|| password=='') {
            console.log("Please Fill All Fields");
        } else if (password !== confirmPassword) {
            showConfirmPasswordMessage();
        } else if (enteredDate.valueOf() > today.valueOf()) {
            showConfirmDateMessage();
        } else {
            $.ajax({
                type: "POST",
                url: "form.php",
                data: dataString,
                cache: false,
                success: function(result){
                       
                  $(".lc-spinner").show();
                
                    setTimeout(function(){
                        $(".lc-spinner").hide();
                        showWelcomeScreen(result);
                    }, 1500);
                }
              });
            }
            return false;
    });

    function showWelcomeScreen(email){
      $(".lc-welcome-screen__title").html("Welcome " + email);

        $(".lc-welcome-screen").fadeIn("slow", 'jswing', function(){
            $(this).show();
        });

        setTimeout(function(){
            $(".lc-welcome-screen").fadeOut("slow", 'jswing', function(){
                $(this).hide();
            });
            $("#submit").attr("disabled", "true");
        }, 4000);
    }

    function showConfirmPasswordMessage(){
      $(".lc-password-match-message").show();

        setTimeout(function(){
              $(".lc-password-match-message").hide();
        }, 2000);
    }

    function showConfirmDateMessage(){
      $(".lc-date-match-message").show();

        setTimeout(function(){
            $(".lc-date-match-message").hide();
        }, 2000);
    }
});