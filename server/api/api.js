const initializeAPI = (app) => {

  app.post("/api/Login", (req, res) => {
    //needs fixing
    let { user_email, user_password} = req.body;
    
    if(executeSQL(`SELECT * FROM users WHERE user_email = '${user_email}' AND user_password = '${user_password}'`)){
      res.status(200).json({message: "Login successful"})
      }else{
      res.status(401).json({message: "Login failed"});
      }});
    
  app.post("/api/Registration", (req, res) => {
    let { user_email, user_password, user_name} = req.body;
    
    if(executeSQL(`SELECT * FROM users WHERE user_email = '${user_email}'`)){
      res.status(401).json({message: "user_email already exists"});
      return;
    }
    
    if(executeSQL(`INSERT INTO users (user_email, user_password, user_name) VALUES ('${user_email}', '${user_password}', '${user_name}')`)){
      res.status(200).json({message: "Registration successful"})
    }
    
    else {
      res.status(401).json({message: "Registration failed"});
    }});

  app.get("/api/GetUserByName", (req, res) => {
    let { user_name } = req.body;
    
    if(executeSQL(`SELECT * FROM users WHERE user_name = '${user_name}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.get("/api/GetUserByEmail", (req, res) => {
    let { user_email } = req.body;
    
    if(executeSQL(`SELECT * FROM users WHERE user_email = '${user_email}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.get("/api/GetUserById", (req, res) => {
    let { user_id } = req.body;
    
    if(executeSQL(`SELECT * FROM users WHERE user_id = '${user_id}'`)){
      res.status(200).json({message: "User found"})
      }else{
      res.status(401).json({message: "User not found"});
      }});

  app.put("/api/UpdateUser", (req, res) => {
    let { user_id, user_email, user_password, user_name } = req.body;
    
    if(executeSQL(`UPDATE users SET user_email = '${user_email}', user_password = '${user_password}', user_name = '${user_name}' WHERE user_id = '${user_id}'`)){
      res.status(200).json({message: "User updated"})
      }else{
      res.status(401).json({message: "User not updated"});
      }});

  app.delete("/api/DeleteUser", (req, res) => {
    let { user_id } = req.body;
    
    if(executeSQL(`DELETE FROM users WHERE user_id = '${user_id}'`)){
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
    let { user_id, message } = req.body;

    if(executeSQL(`INSERT INTO messages (user_id, message) VALUES ('${user_id}', '${message}')`)){
      res.status(200).json({message: "Message posted"})
    }});

  app.get("/api/GetMessageById", (req, res) => {
    let { message_id } = req.body;

    if(executeSQL(`SELECT * FROM messages WHERE message_id = '${message_id}'`)){
      res.status(200).json({message: "Message found"})
      }else{
      res.status(401).json({message: "Message not found"});
      }});

  app.put("/api/UpdateMessage", (req, res) => {
    let { message_id, message } = req.body;

    if(executeSQL(`UPDATE messages SET message = '${message}' WHERE message_id = '${message_id}'`)){
      res.status(200).json({message: "Message updated"})
      }else{
      res.status(401).json({message: "Message not updated"});
      }});

  app.delete("/api/DeleteMessage", (req, res) => {
    let { message_id } = req.body;

    if(executeSQL(`DELETE FROM messages WHERE message_id = '${message_id}'`)){
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