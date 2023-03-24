$(document).ready(function () {
  $("#register-form").on("submit", function (event) {
    event.preventDefault();

    let formData = {
      user_name: $("input[name='user_name']").val(),
      user_email: $("input[name='user_email']").val(),
      user_password: $("input[name='user_password']").val(),
    };

    $.ajax({
      type: "POST",
      url: "/api/Registration",
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        if (response.message === "Registration successful") {
          alert("Registration successful! Redirecting to login page...");
          window.location.href = "index.html";
        } else {
          alert(response.message);
        }
      },
      error: function (jqXHR) {
        alert("Error: " + jqXHR.responseJSON.message);
      },
    });
  });
});

$(document).ready(function () {
  $("#login-form").on("submit", function (event) {
    event.preventDefault();

    let formData = {
      user_email: $("input[name='user_email']").val(),
      user_password: $("input[name='user_password']").val(),
    };

    $.ajax({
      type: "POST",
      url: "/api/Login",
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        if (response.message === "Login successful") {
          alert("Redirecting to home page...");
          window.location.href = "home.html";
        } else {
          alert(response.message);
        }
      },
      error: function (jqXHR) {
        alert("Error: " + jqXHR.responseJSON.message);
      },
    });
  });
});