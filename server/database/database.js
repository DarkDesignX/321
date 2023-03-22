let pool = null;

const initializeMariaDB = async () => {
  const mariadb = require("mariadb");
  const config = {
    database: process.env.DB_NAME || "mychat",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "supersecret123",
    connectionLimit: 5,
  };

};

const executeSQL = async (query) => {
  console.log(query);
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query);
    conn.end();
    console.log(res);
    console.log('');
    return res;
  } catch (err) {
    conn.end();
    console.log(err)
  }
};

const initializeDBSchema = async () => {
  const deleteMessageTable = `DROP TABLE IF EXISTS messages;`;
  await executeSQL(deleteMessageTable);
  const deleteUserTable = `DROP TABLE IF EXISTS users;`;
  await executeSQL(deleteUserTable);
  const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
  );`;
  await executeSQL(userTableQuery);
  
  const messageTableQuery = `CREATE TABLE IF NOT EXISTS messages (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`;
  await executeSQL(messageTableQuery);
};

module.exports = { executeSQL, initializeMariaDB, initializeDBSchema };
