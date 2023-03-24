const sendButton = document.getElementById('send-m');
const messageInput = document.getElementById('menssage');
const chatMessages = document.getElementById('chat');


function sendMessage() {
  console.log('Botón enviar funciona');
  if (messageInput.value.trim() !== '') {
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