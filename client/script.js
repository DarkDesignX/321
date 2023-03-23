const sendForm = document.getElementById("send");
const chatMain = document.getElementById("chat");

const button = document.querySelector('#myButton');
if (button !== null) {
  button.addEventListener('click', () => {
    sendForm.addEventListener("submit", function(event) {
      event.preventDefault();
    
      const messageInput = document.getElementById("menssage");
      const message = messageInput.value;
    
      const newMessage = document.createElement("div");
      newMessage.classList.add("container-chat", "iam");
      newMessage.innerHTML = `<p class="text-iam">${message}</p>`;
    
      chatMain.appendChild(newMessage);
    
      messageInput.value = "";
    });
  });
}

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