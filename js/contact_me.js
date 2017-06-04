// contact form scripts
$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      // prevent default submit behaviour
      event.preventDefault();

      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();

      // parse newlines into html
      message = message.replace(/\r?\n/g, '<br />');

      // for success/failure message
      var firstName = name;

      // check for white space in name for success/fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }

      // parameters: service_id, template_id, template_parameters
      emailjs.send("gmail", "kontaktskjema", {
          name: name,
          email: email,
          phone: phone,
          message: message
        })
        .then(function(response) {
          // success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Din melding ble sendt.</strong>");
          $('#success > .alert-success')
            .append('</div>');

          // clear all fields
          $('#contactForm').trigger("reset");
        }, function(err) {
          // fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Beklager " + firstName + ", det oppstod et problem. Prøv igjen senere!"));
          $('#success > .alert-danger').append('</div>');

          // clear all fields
          $('#contactForm').trigger("reset");
        });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

// when clicking on Full hide fail/success boxes
$('#name').focus(function() {
  $('#success').html('');
});
