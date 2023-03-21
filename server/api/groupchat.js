const { validateToken } = require("../validation/token");

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

    res.status(201).json({
      message: "needs fixing",
    });
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