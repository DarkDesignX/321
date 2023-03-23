const { executeSQL } = require("../database/database");
const { jwt } = require("jsonwebtoken");

function createJWT(user_email, user_password) {
  const payload = { user_email, user_password };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

const initializeAPI = (app) => {

  app.post("/api/Login", async (req, res) => {
    let request = req.body;
      try {
        const result = await executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}' AND user_password = '${request.user_password}'`);

        if (result.length !== 0) {
          createJWT(request.user_name, request.user_password);
          cook
          res.status(200).json({ message: "Login successful" });
          
        } else {
          res.status(401).json({ message: "Login failed" });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occured" });
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

  app.get("/api/GetUserByName", async (req, res) => {
    let request = req.body;

    if(request.user_name.includes("'")){
      for(let key in request){
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }
    
    if(executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.get("/api/GetUserByEmail", async (req, res) => {
    let request = req.body;

    if(request.user_email.includes("'")){
      for(let key in request){
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }
    
    if(executeSQL(`SELECT * FROM users WHERE user_email = '${request.user_email}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.get("/api/GetUserById", async (req, res) => {
    let request = req.body;
    
    if(executeSQL(`SELECT * FROM users WHERE id = '${request.id}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.put("/api/UpdateUser", async (req, res) => {
    let request = req.body;

    if(request.user_email.includes("'") || request.user_password.includes("'") || request.user_name.includes("'")){
      for(let key in request){
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if(!executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}'`)){
      res.status(401).json({message: "There is no such user"});
      return;
    }
    
    if(executeSQL(`UPDATE users SET user_email = '${request.user_email}', user_password = '${request.user_password}', user_name = '${request.user_name}' WHERE id = '${request.id}'`)){
      res.status(200).json({message: "User updated"})
      }else{
      res.status(401).json({message: "User not updated"});
      }});

  app.delete("/api/DeleteUser", async (req, res) => {
    let request = req.body;

    if(!executeSQL(`SELECT * FROM users WHERE id = '${request.id}'`)){
      res.status(401).json({message: "There is no user with this id"});
      return;
    }
    
    if(executeSQL(`DELETE FROM users WHERE id = '${request.id}'`)){
      res.status(200).json({message: "User deleted"})
      }else{
      res.status(401).json({message: "User not deleted"});
      }});

  app.get("/api/GetAllUsers", async (req, res) => {
    if(executeSQL(`SELECT * FROM users`)){
      res.status(200).json({message: "Users found"})
      }else{
      res.status(401).json({message: "Users not found"});
      }});

  app.post("/api/PostMessage", async (req, res) => {
    let request = req.body;

    if(request.message.includes("'")){
      for(let key in request){
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if(executeSQL(`INSERT INTO messages (user_id, message) VALUES ('${request.user_id}', '${request.message}')`)){
      res.status(200).json({message: "Message posted"})
    }});

  app.get("/api/GetMessageById", async (req, res) => {
    let request = req.body;

    if(executeSQL(`SELECT * FROM messages WHERE user_id = '${request.user_id}'`)){
      res.status(200).json({message: "Message found"})
      }else{
      res.status(401).json({message: "Message not found"});
      }});

  app.put("/api/UpdateMessage", async (req, res) => {
    let request = req.body;

    if(request.message.includes("'")){
      for(let key in request){
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if(executeSQL(`UPDATE messages SET message = '${request.message}' WHERE id = '${request.id}'`)){
      res.status(200).json({message: "Message updated"})
      }else{
      res.status(401).json({message: "Message not updated"});
      }});

  app.delete("/api/DeleteMessage", async (req, res) => {
    let request = req.body;

    if(executeSQL(`DELETE FROM messages WHERE id = '${request.id}'`)){
      res.status(200).json({message: "Message deleted"})
      }else{
      res.status(401).json({message: "Message not deleted"});
      }});

  app.get("/api/GetAllMessages", async (req, res) => {
    if(executeSQL(`SELECT * FROM messages`)){
      res.status(200).json({message: "Messages found"})
      }else{
      res.status(401).json({message: "Messages not found"});
      }});
  
  };

module.exports = { initializeAPI };