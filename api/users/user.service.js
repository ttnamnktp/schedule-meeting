const pool = require("../../config/database");

module.exports = {

    createUser: (data, callBack) => {
        pool.query(
            `INSERT INTO users (
                userId, 
                username, 
                email, 
                passwordHash, 
                fullName
                ) VALUES (?,?,?,?,?)`,
            [
                data.userId,
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
            `SELECT * FROM users WHERE userId = ?`,
            [userId],
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
            `UPDATE users SET username = ?, email = ?, passwordHash = ?, fullName = ? WHERE userId = ?`,
            [
                data.username,
                data.email,
                data.passwordHash,
                data.fullName,
                data.userId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM users WHERE userId = ?`,
            [data.userId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
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
