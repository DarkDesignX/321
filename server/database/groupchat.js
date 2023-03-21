const { executeSQL } = require("./database.js");

const createNewGroup = async ($name) => {
    const groupChatName = "groupchat_" + $name;
  
    const newGroupChatQuery = `CREATE TABLE IF NOT EXISTS "${groupChatName}" (
      id INT NOT NULL AUTO_INCREMENT,
      user_name VARCHAR(255) NOT NULL,
      message VARCHAR(255) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (user_name) REFERENCES users(user_name)
    );`;
    await executeSQL(newGroupChatQuery);
  }

const deleteGroup = async ($name) => {
    const groupChatName = "groupchat_" + $name;

}

const getGroupMessages = async ($name) => {

}
  
module.exports = { createNewGroup };