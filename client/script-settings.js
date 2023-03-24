$(document).ready(function () {
    $("#setting-form").on("submit", function (event) {
      event.preventDefault();
  
      let formData = {
        user_name: $("input[name='user_name']").val(),
        new_user_name: $("input[name='new_user_name']").val(),
      };
  
      $.ajax({
        type: "PUT",
        url: "/api/UpdateUsername",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
          if (response.message === "Username updated") {
            alert("update successfully, Redirecting to home page...");
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