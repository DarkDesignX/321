// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", function(event) {

  // Get the login form element
  var loginForm = document.getElementById("login-form");

  // Add an event listener for form submission
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the entered username value
    var username = loginForm.elements["user_email"].value;

    // Display an alert message with the entered username
    alert("Welcome, " + username + "!");
    window.location.href = "home.html";
  });

});