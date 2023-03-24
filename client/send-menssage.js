const sendButton = document.getElementById('send-m');
const messageInput = document.getElementById('menssage');
const chatMessages = document.getElementById('chat');

const socket = new WebSocket('wss://loclahost:3000');

socket.addEventListener('open', () => {
  console.log('work');
});

socket.addEventListener('message', (event) => {
  const message = document.createElement('div');
  message.classList.add('container-chat', 'bot');
  message.innerHTML = `<p class="text-bot">${event.data}</p>`;
  chatMessages.insertBefore(message, null);
});

function sendMessage() {
  console.log('work:)');
  if (messageInput.value.trim() !== '') {
    socket.send(messageInput.value);

    const message = document.createElement('div');
    message.classList.add('container-chat', 'iam');
    message.innerHTML = `<p class="text-iam">${messageInput.value}</p>`;
    chatMessages.insertBefore(message, null);
    
    messageInput.value = '';
  }
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});
