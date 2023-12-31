const { 
    createUser, 
    getUserByUserId, 
    getUsers, 
    updateUser, 
    deleteUser,
    getUserByEmail,
    getUserByUsername } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        console.log(body.passwordHash);
        const salt = genSaltSync(10);
        body.passwordHash = hashSync(body.passwordHash, salt);
        createUser(body, (error, results) => {
            if(error) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((error, results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success:1,
                data: results
            });
        });
    },

    getUserByUserId: (req, res) => {
        const userId = req.params.userId;
        getUserByUserId(userId, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.json({
                success:1,
                data: results
            })
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.passwordHash = hashSync(body.passwordHash, salt);
        updateUser(body, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update"
                })
            }
            return res.json({
                success:1,
                result: results,
                message: "Updated successfully"
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                result: results
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (error, results) => {
            if(error){
                console.log(error);
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.passwordHash, results.passwordHash);

            if (result) {
                results.passwordHash = undefined;
                const jsontoken = sign({ result: results}, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    data: results
                });
            }
            else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
        });
    },

    getUserByUsername: (req, res) => {
        const username = req.params.username;
        getUserByUsername(username, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.json({
                success:1,
                data: results
            })
        });
    },

};