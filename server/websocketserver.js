const WebSocket = require("ws");
const { executeSQL } = require("./database/database");
let users = {};

// Intiiate the websocket server
const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  websocketServer.on("close", onClose);
};

const onConnection = (ws) => {
  console.log('User connected');
  ws.on("message", (message) => messageRouter(ws, message));
};

const onClose = (ws) => {
  console.log('User disconnected');
};

const onMessage = (ws, message) => {
  console.log("Message received: " + message);
  message = JSON.parse(message);
  executeSQL('INSERT INTO messages (user_id, message) VALUES (${message.user_id}, ${message.message});');
  //Send message and id to all users
  //ws.send(JSON.stringify({ user_id: ws.user_id, message: message }));
  ws.send(message);
};

const messageRouter = (ws, message) => {
  message = JSON.parse(message);
  if (message.hasOwnProperty("message")) {
    onMessage(ws, message);
  }
  if (message.hasOwnProperty("checkUsers")) {
    checkUsers(ws, message);
  }
  if (message.hasOwnProperty("user_name")) {
    setActiveUser(ws, message);
  }
} 
const setActiveUser = (ws, message) => {
  users.add(message.user_name);
}

module.exports = { initializeWebsocketServer };