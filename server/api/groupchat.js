const { validateToken } = require("../validation/token.js");
const { newPublicMessageSend, newPrivateMessageSend } = require("../websocketserver.js");

const createPrivateChat = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  res.status(201).json({
    message: "needs fixing",
  });
};

const sendPrivateMessage = (req, res) => {
    const user = validateToken(req.cookies.token, res).name;
  
    res.status(201).json({
      message: "needs fixing",
    });
};

const recievePrivateMessages = (req, res) => {
    const user = validateToken(req.cookies.token, res).name;

    res.status(201).json({
      message: "needs fixing",
    });
};

const sendPublicMessage = (req, res) => {
    const user = validateToken(req.cookies.token, res).name;

    try {
      let data = [];
      req.on("data", (chunk) => {
        data.push(chunk);
      });
      req.on("end", () => {
        const message = JSON.parse(data).message;

        if (!message) {
          res.status(400).json({
            message: "No message sent",
          });
        }

        newPublicMessageSend(user, message);

        res.status(200).json({
          message: "sen successful",
        });
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        message: "sending Failed",
      });
    }
};

const recievePublicMessages = (req, res) => {
    const user = validateToken(req.cookies.token, res).name;

    res.status(201).json({
      message: "needs fixing",
    });
};

module.exports = { 
  sendPrivateMessage, createPrivateChat, recievePrivateMessages,
  sendPublicMessage, recievePublicMessages
 };