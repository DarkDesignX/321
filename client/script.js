<<<<<<< HEAD
const sendButton = document.getElementById('send-m');
const messageInput = document.getElementById('menssage');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', () => {
  console.log('Botón enviar funciona');
  if (messageInput.value.trim() !== '') {
    const message = document.createElement('div');
    message.classList.add('container-chat', 'iam');
    message.innerHTML = `<p class="text-iam">${messageInput.value}</p>`;
    chatMessages.appendChild(message);
    messageInput.value = '';
  }
});
=======
const ws = new WebSocket("ws://localhost:3000");

document.querySelector('form').onsubmit = ev => {
  ev.preventDefault();
  const input = document.querySelector('input');
  ws.send(input.value);
  showmessage(true, input.value);
  input.value = '';
}
>>>>>>> 230ab2d5189094a1428a26b6201c1aa157e312b5

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
      user_name: $("input[name='user_name']").val(),
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