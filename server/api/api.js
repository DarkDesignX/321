const { executeSQL } = require("../database/database");
const initializeAPI = (app) => {

  app.post("/api/Login", (req, res) => {
    let request = req.body;

    if(request.user_name.includes("'") || request.user_password.includes("'")){
      for(let key in request){
        //A global replacement, source: https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if(!request.user_name || !request.user_password){
      res.status(401).json({message: "Please fill out all fields"});
      return;
    }
    
    if(executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}' AND user_password = '${request.user_password}'`)){
      res.status(401).json({message: "Login successful"});
      }else{
      res.status(200).json({message: "Login failed"})
      }});
    
  app.post("/api/Registration", (req, res) => {
    let request = req.body;
    
    if(request.user_email.includes("'") || request.user_password.includes("'") || request.user_name.includes("'")){
      for(let key in request){
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if(!request.user_email || !request.user_password || !request.user_name){
      res.status(401).json({message: "Please fill out all fields"});
      return;
    }

    if(!executeSQL(`SELECT * FROM users WHERE user_email = '${request.user_email}'`)){
      res.status(401).json({message: "There is already an account with this user_email"});
      return;
    }
    if(executeSQL(`INSERT INTO users (user_email, user_password, user_name) VALUES ('${request.user_email}', '${request.user_password}', '${request.user_name}')`)){
      res.status(200).json({message: "Registration successful"})
      return;
    }
    else {
       res.status(401).json({message: "Something went wrong while creating your account"});
        return;
    }});

  app.get("/api/GetUserByName", (req, res) => {
    let request = req.body;

    if(request.user_name.includes("'")){
      for(let key in request){
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if(!executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}'`)){
      res.status(401).json({message: "Ther is no user with this user_name"});
      return;
    }
    
    if(executeSQL(`SELECT * FROM users WHERE user_name = '${request.user_name}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.get("/api/GetUserByEmail", (req, res) => {
    let request = req.body;

    if(request.user_email.includes("'")){
      for(let key in request){
        request[key] = request[key].replace(/'/g, "''");
      }
      return;
    }

    if(!executeSQL(`SELECT * FROM users WHERE user_email = '${request.user_email}'`)){
      res.status(401).json({message: "Ther is no user with this user_email"});
      return;
    }
    
    if(executeSQL(`SELECT * FROM users WHERE user_email = '${request.user_email}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.get("/api/GetUserById", (req, res) => {
    let request = req.body;

    if(!executeSQL(`SELECT * FROM users WHERE id = '${request.id}'`)){
      res.status(401).json({message: "Ther is no user with this id"});
      return;
    }
    
    if(executeSQL(`SELECT * FROM users WHERE id = '${request.id}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.put("/api/UpdateUser", (req, res) => {
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

  app.delete("/api/DeleteUser", (req, res) => {
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

  app.get("/api/GetAllUsers", (req, res) => {
    if(executeSQL(`SELECT * FROM users`)){
      res.status(200).json({message: "Users found"})
      }else{
      res.status(401).json({message: "Users not found"});
      }});

  app.post("/api/PostMessage", (req, res) => {
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

  app.get("/api/GetMessageById", (req, res) => {
    let request = req.body;

    if(executeSQL(`SELECT * FROM messages WHERE user_id = '${request.user_id}'`)){
      res.status(200).json({message: "Message found"})
      }else{
      res.status(401).json({message: "Message not found"});
      }});

  app.put("/api/UpdateMessage", (req, res) => {
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

  app.delete("/api/DeleteMessage", (req, res) => {
    let request = req.body;

    if(executeSQL(`DELETE FROM messages WHERE id = '${request.id}'`)){
      res.status(200).json({message: "Message deleted"})
      }else{
      res.status(401).json({message: "Message not deleted"});
      }});

  app.get("/api/GetAllMessages", (req, res) => {
    if(executeSQL(`SELECT * FROM messages`)){
      res.status(200).json({message: "Messages found"})
      }else{
      res.status(401).json({message: "Messages not found"});
      }});
  
  };

module.exports = { initializeAPI };