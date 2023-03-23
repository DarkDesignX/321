const { executeSQL } = require("./database/database");
const { jwt } = require("jsonwebtoken");

function createJWT(email, password) {
  const payload = { email, password };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

const initializeAPI = (app) => {
  app.post("/api/Login", async (req, res) => {
    let request = req.body;
    try {
      const result = await executeSQL(`SELECT * FROM users WHERE email = '${request.email}' AND password = '${request.password}'`);

      if (result.length !== 0) {
        createJWT(request.email, request.password);
        cook
        res.status(200).json({ message: "Login successful" });
        
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "An server error occured" });
    }
  });


  app.post("/api/Registration", async (req, res) => {

    let request = req.body;

    if (request.email.includes("'") || request.password.includes("'") || request.username.includes("'")) {
      for (let key in request) {
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if (!request.email || !request.password || !request.username) {
      res.status(401).json({ message: "Please fill out all fields" });
      return;
    }

    try {
      const checkEmail = await executeSQL(`SELECT * FROM users WHERE email = '${request.email}'`);
      const checkUsername = await executeSQL(`SELECT * FROM users WHERE username = '${request.username}'`);

      if (checkEmail.length === 0 && checkUsername.length === 0) {
        const result = await executeSQL(`INSERT INTO users (email, password, username) VALUES ('${request.email}', '${request.password}', '${request.username}')`);
        res.status(200).json({ message: "Registration successful" });
        return;
      }
      
      else if (checkEmail.length !== 0) {
        res.status(401).json({ message: "Email already exists" });
        return;
      }
      else if (checkUsername.length !== 0) {
        res.status(401).json({ message: "Username already exists" });
        return;
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "An server error occured" });
    }
  });
};

module.exports = { initializeAPI };