const pool = require("../../config/database");

module.exports = {

    createUser: (data, callBack) => {
        pool.query(
            `INSERT INTO users (
                username, 
                email, 
                passwordHash, 
                fullName
                ) VALUES (?,?,?,?)`,
            [
                data.username,
                data.email,
                data.passwordHash,
                data.fullName
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

    getUsers: callBack => {
        pool.query(
            `SELECT * FROM users`,
            [],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUserByUserId: (userId, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE userId = ? AND deleted = 0`,
            [userId],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUserByUsername: (username, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE username = ? AND deleted = 0`,
            [username],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users SET username = ? WHERE userId = ? AND deleted = 0`,
            [
                data.username,
                data.userId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

    updateUsername: (data, callBack) => {
        pool.query(
            `UPDATE users SET username = ? WHERE userId = ? AND deleted = 0`,
            [
                data.username,
                data.userId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

    deleteUser: (data, callBack) => {
        console.log(data.userId);
        pool.query(
            `UPDATE users SET deleted = 1, deletedAt = CURRENT_TIMESTAMP() WHERE userId = ?`,
            [data.userId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ? AND deleted = 0`,
            [email],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

}