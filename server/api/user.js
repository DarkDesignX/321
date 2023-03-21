const { createToken, validateToken } = require("../validation/token");
const {
  registerNewUser,
  getOneUserByName,
  getAllUsers,
} = require("../database/main");


const register = (req, res) => {
  try {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const user_name = JSON.parse(data).user_name;
      const user_password = JSON.parse(data).user_password;

      if (!user_name) {
        res.status(404).json({
          message: "User was not found",
        });
      }
      if (!user_password && user_password.lenght > 9) {
        res.status(404).json({
          message: "User was not found",
        });
      }

      registerNewUser(user_name, user_password);

      res.status(200).json({
        message: "Login successful",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Registration Failed",
    });
  }
};

const login = (req, res) => {
  try {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const user = getOneUserByName(JSON.parse(data).user_name);

      if (!user.user_name) {
        res.status(404).json({
          message: "User was not found",
        });
      }
      if (!user.user_password !== JSON.parse(data).user_password) {
        res.status(404).json({
          message: "User was not found",
        });
      }

      res.cookie("token", createToken(user.user_name), {
        httpOnly: true,
        maxAge: 600000, // 6h
      });

      res.status(201).json({
        message: "Login successful",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Login Failed",
    });
  }
};

const getAllUsersInterface = (req, res) => {
  validateToken(req.cookies.token, res);

  const users = getAllUsers();

  if (users != false) {
    res.status(200).json(users);
  }
  res.status(404).json({
    message: "No Users found",
  });
};

module.exports = { register, login, getAllUsersInterface };