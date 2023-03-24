const { executeSQL } = require("../database/database");

const initializeAPI = (app) => {
  app.post("/api/Login", async (req, res) => {

    let request = req.body;

    if (request.user_name.includes("'")) {
      for (let key in request) {
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if (!request.user_name) {
      res.status(401).json({ message: "Please fill out the username fields" });
      return;
    }

    try {
      const checkUsername = await executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}'`);

      if (checkUsername.length === 0) {
        const result = await executeSQL(`INSERT INTO users (user_name) VALUES ('${request.user_name}')`);
        res.status(200).json({ message: "Registration successful" });
        return;
      }
      
      else if (checkUsername.length !== 0) {
        res.status(401).json({ message: "welcome!" });
        return;
      }

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "An server error occured" });
    }
  });

  app.put("/api/UpdateUsername", async (req, res) => {
    let request = req.body;

    if (request.id.includes("'") || request.user_name.includes("'")) {
      for (let key in request) {
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if (!request.id || !request.user_name) {
      res.status(401).json({ message: "Please fill out all fields" });
      return;
    }

    try {
      const checkUsername = await executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}'`);

      if (checkUsername.length === 0) {
        const result = await executeSQL(`UPDATE users SET user_name = '${request.user_name}' WHERE id = '${request.id}')`);
        res.status(200).json({ message: "Username updated" });
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

  app.post("/api/Message", async (req, res) => {
    let request = req.body;

    if (request.message.includes("'") || request.user_id.includes("'")) {
      for (let key in request) {
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if (!request.message || !request.user_id) {
      res.status(401).json({ message: "Please fill out all fields" });
      return;
    }

    try {
      const result = await executeSQL(`INSERT INTO messages (message, user_id) VALUES ('${request.message}', '${request.user_id}')`);
      res.status(200).json({ message: "Message sent" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "An server error occured" });
    }
  });

  app.get("/api/GetMessages", async (req, res) => {
    try {
      const result = await executeSQL(`SELECT * FROM messages`);
      res.status(200).json(result);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "An server error occured" });
    }
  });


};

module.exports = { initializeAPI };