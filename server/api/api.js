const initializeAPI = (app) => {

  app.get("/api/Login", (req, res) => {
    let { user_email, user_password} = req.body;
    
    if(executeSQL(`SELECT * FROM users WHERE user_email = '${user_email}' AND user_password = '${user_password}'`)){
      res.status(200).json({message: "Login successful"})
      }else{
      res.status(401).json({message: "Login failed"});
      }});
    
    app.get("/api/Registration", (req, res) => {
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
    };

module.exports = { initializeAPI };