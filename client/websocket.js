const Websocket = require('ws');

const server = new webSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.send('Welcome to the WebSocket server!');

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        socket.send(`You said: ${message}`);
      });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is listening on port 3000');