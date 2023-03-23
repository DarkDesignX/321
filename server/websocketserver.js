const WebSocket = require("ws");
const { executeSQL } = require("./database/database");

// Intiiate the websocket server
const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  websocketServer.on("close", onClose);
};

const onConnection = (ws) => {
  console.log(`User ${ws.username} connected`);
  ws.on("message", (message) => onMessage(ws, message));
  executeSQL(`UPDATE users SET active = 1 WHERE user_name = ${ws.user_name};`);
};

const onClose = (ws) => {
  console.log(`User ${ws.user_name} disconnected`);
  executeSQL(`UPDATE users SET active = 0 WHERE user_name = ${ws.user_name};`);
};

const onMessage = (ws, message) => {
  console.log("Message received: " + message);
  executeSQL(`INSERT INTO messages (user_id, message) VALUES (${ws.user_id}, ${message});`);
  //Send message and id to all users
  //ws.send(JSON.stringify({ user_id: ws.user_id, message: message }));
  ws.send(message);

};

module.exports = { initializeWebsocketServer };