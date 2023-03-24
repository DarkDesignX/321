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