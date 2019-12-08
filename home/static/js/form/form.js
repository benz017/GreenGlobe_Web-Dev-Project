$(document).on('submit','#form',function(e){
    e.preventDefault();
    msg = ''
    var $myForm = $('#form')
    var $formData = $(this).serialize()
    var $thisURL = $myForm.attr('data-url') || window.location.href
    var $Name = $('#name').val()
    var $mailID = $('#email').val()
    var $contactNumber = $('#contact_number').val()
    var $message = $('#message').val()
    var isValid=validateForm()
    if (isValid)
    {
    $.ajax({
        type:'POST',
        url:$thisURL,
        data: $formData,
        xhrFields: {
        withCredentials: true
        },
        success:handleFormSuccess,
        error:handleFormError,
    });
    }
    function handleFormSuccess(data){
        console.log($Name)
        console.log($mailID)
        console.log($contactNumber)
        console.log($message)
        console.log($formData)
        $('#loader').show();
        $('#modalText').show();
        $('#modalTextError').hide();
        $('#myModal').modal('hide');
        $('#cancel-btn').click();
        $myForm[0].reset();
            $.ajax({
            type:'POST',
            url:'/mail',
            data: $formData,
            success:function(){
            console.log('mail sent')
            }
        });

        }

     function handleFormError(jqXHR,textStatus, errorThrown, exception){
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        console.log(exception);
        if (jqXHR.status == 0||jqXHR.status == 500){
            $('#loader').hide();
            $('#modalText').hide();
            $('#modalTextError').html("<h3 id=\"modalTextError\"><b>Oops!!<br><br>Looks like a network issue.<br>Please try again later.<br></b></h3>").show();
            setTimeout(
            function() {
            $('#myModal').modal('hide');
            $('#cancel-btn').click();
            }, 5000);
            }
            setTimeout(
            function() {
           $('#loader').show();
           $('#modalText').show();
           $('#modalTextError').hide();
            }, 6000);

        }

    })


    function validateForm(){
    var $Name = $('#name').val()
    var $mailID = $('#email').val()
    var $contactNumber = $('#contact_number').val()
    var $message = $('#message').val()
    var numReg = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    var mailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ;
    var msg =''
    var isValid = false
        if (/^[a-zA-Z ]+$/.test($Name))
        {
        $('#name_error').html("<div class=\"error-text medium\"><strong>"+ msg +"</strong></div>")
           nameValid = true
        }
        else
        {
        msg = "* Enter Valid Name"
        $('#name_error').html("<div class=\"error-text medium\"><strong>"+ msg +"</strong></div>")
        msg=''
            nameValid = false
        }
        if (mailReg.test($mailID))
        {
        $('#error_mail').html("<div class=\"error-text medium\"><strong>"+ msg +"</strong></div>")
            mailValid = true
        }
        else
        {
        msg = "* Enter Valid Email ID."
        $('#error_mail').html("<div class=\"error-text medium\"><strong>"+ msg +"</strong></div>")
        msg=''
            mailValid = false
        }
        if (numReg.test($contactNumber) && $contactNumber.length==10)
        {
        $('#error_number').html("<div class=\"error-text medium\"><strong>"+ msg +"</strong></div>")
            numberValid = true
        }
        else
        {
        msg = "* Enter Valid Contact Number"
        $('#error_number').html("<div class=\"error-text medium\"><strong>"+ msg +"</strong></div>")
        msg=''
            numberValid = false
        }
        if (nameValid && numberValid && mailValid){
        isValid = true
        }
        else{
        isValid=false
        }
            return isValid
    }

    function loading(){
    var isValid = validateForm()
    if (isValid)
        {
        $('#submit_btn').html("<button type=\"submit\" title=\"Send Message\" name=\"submit\" value=\"Submit\" id=\"submit_btn\" onclick=\"return loading()\" data-toggle=\"modal\" data-target=\"#myModal\">Send Message</button>")
        }
    }


    function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });