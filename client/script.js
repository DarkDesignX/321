$(document).ready(function () {
  $("#login-form").on("submit", function (event) {
    event.preventDefault();

    let formData = {
      user_name: $("input[name='user_name']").val(),
    };

    $.ajax({
      type: "POST",
      url: "/api/Login",
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        if (response.message === "Login successful! Redirecting to home page...") {
          alert("Login successful, Redirecting to home page...");
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