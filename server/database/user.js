const { executeSQL, pool } = require("./database");

const registerNewUser = async (user_name, user_password) => {
    return await executeSQL(`INSERT INTO users (id, user_name, user_password) VALUES (NULL, ?, ?);`, [pool.escape(user_name), pool.escape(user_password)]);
}

const deleteUserbyName = async (user_name) => {
    return await executeSQL("DELETE FROM users WHERE user_name = ?;", [pool.escape(user_name)]);
}

const getOneUserById = async (id) => {
    return await executeSQL(`SELECT * FROM users WHERE id = ?;`, [pool.escape(id)]);
}

const getOneUserByName = async (user_name) => {
    return await executeSQL(`SELECT * FROM users WHERE user_name = ?;`, [pool.escape(user_name)]);
}

const getAllUsers = async () => {
    return await executeSQL("SELECT id, user_name FROM users;");
}

module.exports = {
    registerNewUser, deleteUserbyName, getOneUserById,
    getOneUserByName, getAllUsers
};