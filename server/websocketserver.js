const WebSocket = require("ws");

let global_counter = 0;
let all_active_connections = {};

// Intiiate the websocket server
const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
};

const onConnection = (ws) => {
  console.log("New websocket connection");
  var id = global_counter++;
  all_active_connections[id] = ws;
  ws.id = id;
  ws.on("message", (message) => {
    for (conn in all_active_connections) {
      all_active_connections[conn].send(message);
    }
  }).on('close', function() {
    delete all_active_connections[ws.id];
  });
};

const newPublicMessageSend = (user_name, message) => {
  for (conn in all_active_connections) {
    all_active_connections[conn].send(`{
      "chatname": "public",
      "name": "${user_name}",
      "message": "${message}"
    }`);
  }
}

const newPrivateMessageSend = (user_name, message, chat) => {

}

module.exports = { initializeWebsocketServer, newPublicMessageSend, newPrivateMessageSend };