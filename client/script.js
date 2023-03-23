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

const mForm = get(".send");
const mInput = get(".menssage");
const mChat = get(".chat");

mForm.addEventListener("submit", event => {
  event.preventDefault();

  const mText = mInput.value;
  if (!mText) return;

  appendMessage("right", mText);
  mInput.value = "";
});

function appendMessage(text) {
  const mHTML = `
    <div class="container-chat iam">
            <p class="text-iam">${text}</p>
    </div>
  `;

  mChat.insertAdjacentHTML("beforeend", mHTML);
  mChat.scrollTop += 500;
}

function get(selector, root = document) {
  return root.querySelector(selector);
}