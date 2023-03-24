const { executeSQL } = require("../database/database");
const { jwt } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const initializeAPI = (app) => {
  app.post("/api/Login", async (req, res) => {
    let request = req.body;
    
      const result = await executeSQL(`SELECT * FROM users WHERE user_email = '${request.user_email}' AND user_password = '${request.user_password}'`);

      if (result.length !== 0) {
        res.status(200).json({ message: "Login successful" });
        
      } else {
        res.status(401).json({ message: "Login failed" });
      }
  });


  app.post("/api/Registration", async (req, res) => {

    let request = req.body;

    if (request.user_email.includes("'") || request.user_password.includes("'") || request.user_name.includes("'")) {
      for (let key in request) {
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if (!request.user_email || !request.user_password || !request.user_name) {
      res.status(401).json({ message: "Please fill out all fields" });
      return;
    }

    try {
      const checkEmail = await executeSQL(`SELECT * FROM users WHERE user_email = '${request.user_email}'`);
      const checkUsername = await executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}'`);

      if (checkEmail.length === 0 && checkUsername.length === 0) {
        const result = await executeSQL(`INSERT INTO users (user_email, user_password, user_name) VALUES ('${request.user_email}', '${request.user_password}', '${request.user_name}')`);
        res.status(200).json({ message: "Registration successful" });
        return;
      }
      
      else if (checkEmail.length !== 0) {
        res.status(401).json({ message: "user_email already exists" });
        return;
      }
      else if (checkUsername.length !== 0) {
        res.status(401).json({ message: "user_name already exists" });
        return;
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "An server error occured" });
    }
  });
};

module.exports = { initializeAPI };