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

document.addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('.chat-input input');
  const chat = document.querySelector('.chat-input button');
  const messages = document.querySelector('.chat-messages');

  const socket = new WebSocket("ws://localhost:3000");

  socket.addEventListener("open", (event) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = event.data;
    messages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  button.addEventListener("click", sendMessage);
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
function sendMessage() {
    const message = input.value.trim();
    if (message.length > 0) {
      socket.send(message);
      input.value = "";
    }
  }
});