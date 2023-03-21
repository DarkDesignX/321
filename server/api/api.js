// const {
//     register,
//     login,
//     getAllUsersInterface,
//   } = require("./user");
  
//   const {
//     sendPrivateMessage,
//     createPrivateChat,
//     recievePrivateMessages,
//     sendPublicMessage,
//     recievePublicMessages,
//   } = require("./groupchat");
  
//   const initializeAPI = (app) => {
  
//     app.post("/api/Register", register);
//     app.post("/api/Login", login);
//     app.get("/api/Users", getAllUsersInterface);
  
//     app.post("/api/private/NewChat", createPrivateChat);
//     app.post("/api/private/Send", sendPrivateMessage);
//     app.get("/api/private/Recieve", recievePrivateMessages);
  
//     app.post("/api/public/Send", sendPublicMessage);
//     app.get("/api/public/Recieve", recievePublicMessages);

//   };
  
//   module.exports = { initializeAPI };

const initializeAPI = (app) => {
  app.get("/api/hello", hello);
};

const hello = (req, res) => {
  res.send("Hello World!");
};

module.exports = { initializeAPI };