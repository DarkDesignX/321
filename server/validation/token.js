//Source: https://github.com/bgdnvk/nodejs-auth

const jwt = require("jsonwebtoken");

const SECRET = "secret";

const createToken = (name) => {
  const token = jwt.sign({ name }, SECRET, {
    expiresIn: 72000,
  });

  return token;
};

const validateToken = (token, res) => {
  try {
    let verifiedtoken = jwt.verify(token, SECRET);
    return verifiedtoken;
  } catch (e) {
    res.status(401).json({
        message: "Invalid Token",
    });
  }
};

module.exports = { createToken, validateToken };