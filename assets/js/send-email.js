var form = $("#contactForm"),
  services = $(".custom-checkbox"),
  fullname = $("#name"),
  email = $("#email"),
  company = $("#company"),
  website = $("#website"),
  message = $("#message"),
  submit = $("#submit");
service_name = [];

//form validate
function validate() {
  var valid = true;
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var services_names = $(".custom-checkbox input[type=checkbox]:checked").length;

  if (services_names === 0) {
    services.addClass("error");
    $("#errormsg").removeClass("hide");
    valid = false;
  } else {
    services.removeClass("error");
  }
  if ($.trim(fullname.val()) === "") {
    fullname.addClass("alert-danger");
    $("#errormsg").removeClass("hide");
    valid = false;
  }
  if (!regex.test(email.val())) {
    email.addClass("alert-danger");
    $("#errormsg").removeClass("hide");
    valid = false;
  }
  if ($.trim(message.val()) === "") {
    message.addClass("alert-danger");
    $("#errormsg").removeClass("hide");
    valid = false;
  }

  return valid;
}

//some other features
$(".form-control").on("keyup", function () {
  if ($.trim($(this).val()) != "") {
    $(this).removeClass("alert-danger");
  }
});
$(".custom-checkbox input[type=checkbox]").on("change", function () {
  var serv_names = $(".custom-checkbox input[type=checkbox]:checked").length;
  if ($(this).prop("checked") == true) {
    service_name.push($(this).attr("value"));
  } else {
    var valueToRemove = $(this).attr("value");
    var filteredItems = service_name.filter((item) => item !== valueToRemove);
    service_name = filteredItems;
  }
  if (serv_names != 0) {
    $(this).parent(services).removeClass("error");
  }
});

//Form Submit
function sendMail() {
  if (validate()) {
    $("#errormsg").addClass("hide");
    var val_email = $("#email").val(),
      val_fullname = $("#name").val(),
      val_company = $("#company").val(),
      val_website = $("#website").val(),
      val_message = $("#message").val();

    var email_temp =
      '<!DOCTYPE html><html><head>\
    <meta http-equiv="content-type" content="text/html; charset=utf-8">\
    <meta name="viewport" content="width=device-width, initial-scale=1">\
    <title>New Lead on Contact Form</title>\
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">\
    <style type="text/css"> * { box-sizing: border-box; } body { font-family: "Lato", sans-serif; font-weight: 400; padding: 0; margin: 0; } a { color: #55565a; text-decoration: none; } a:hover { color: #ff730e; } #mainTable { width: 642px; padding: 20px; border: solid 1px #8c0150; } #postDetails { width: 100%; float: left; } h3 { font-size: 36px; color: #3f3e3d; font-family: "Lato", sans-serif; padding-bottom: 32px; letter-spacing: 1px; margin: 0; } #postImage p { margin-bottom: 10px; color: #3f3e3d; font-weight: 300; font-size: 18px; line-height: 28px; margin-top: 0; } #postImage p strong { width: 100px; float: left; } #logoSection { width: 100%; float: left; padding-bottom: 40px; } @media only screen and (max-width:500px) { #mainTable { width: 90% !important; } #postDetails { width: 100% !important; float: right; } h3 { font-size: 28px; } #postImage p { font-size: 18px; } } </style>\
    </head><body>\
    <div style="width:100%;padding-top: 50px;" align="center">\
        <table width="100%" border="0" cellspacing="0" cellpadding="0">\
            <tr>\
                <td align="center" valign="top">\
                    <table id="mainTable" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="background-color:#ffffff;">\
                        <tr>\
                            <td align="left" valign="middle">\
                                <div id="logoSection">\
                                    <table width="100%">\
                                        <tr>\
                                            <td align="center" valign="top">\
                                                <a href="https://developeranil.github.io/" target="_blank"><img src="https://developeranil.github.io/assets/images/common/logo-with-name-web.png" width="180" alt="Code Web"></a>\
                                            </td>\
                                        </tr>\
                                    </table>\
                                </div>\
                                <div id="postDetails">\
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">\
                                        <tr>\
                                            <td>\
                                                <h3>Hey! We received a new lead from ' + val_fullname + '.</h3>\
                                            </td>\
                                        </tr>\
                                        <tr>\
                                            <td>\
                                                <div id="postImage">\
                                                    <p><strong>Name: </strong> ' + val_fullname + '</p>\
                                                    <p><strong>Email: </strong> ' + val_email + '</p>\
                                                    <p><strong>Company: </strong> ' + val_company + '</p>\
                                                    <p><strong>Website: </strong> ' + val_website + '</p>\
                                                    <p><strong>Service: </strong> ' + service_name + '</p>\
                                                    <p><strong>Message: </strong> ' + val_message + '</p>\
                                                </div>\
                                            </td>\
                                        </tr>\
                                    </table>\
                                </div>\
                            </td>\
                        </tr>\
                    </table>\
                </td>\
            </tr>\
        </table>\
    </div>\
</body>\
</html>';
    Email.send({
      Host: "smtp.gmail.com",
      Username: "ka020694@gmail.com",
      Password: "@nilKum@r",
      To: "akwebds@gmail.com",
      From: "ka020694@gmail.com",
      Subject: "New Lead on Contact Form: - " + val_fullname,
      Body: email_temp,
    }).then((message) => {
      //console.log (message);
      if (message == "OK") {
        alert("Your mail has been send. Thank you for connecting.");
      } else {
        console.error(message);
        alert("There is error at sending message. Try otther SMTP server. ");
      }
    });
  }
  //DC5FDB6F5F233FCC25B4C7434E6ADF64AD34
}
