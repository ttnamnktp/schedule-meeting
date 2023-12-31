const pool = require("../../config/database");

module.exports = {

    createResponse: (data, callBack) => {
        pool.query(
            `INSERT INTO response (userId, meetingId, choice)
            VALUES (?, ?, ?);`,
            [
                data.userId,
                data.meetingId,
                data.choice
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

    getAllResponses: callBack => {
        pool.query(
            `SELECT * FROM response`,
            [],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    
    updateResponse: (data, callBack) => {
        pool.query(
            `UPDATE response
            SET
              userId = ?,
              meetingId = ?,
              choice = ?,
              modifiedAt = CURRENT_TIMESTAMP()
            WHERE responseId = ?;`,
            [
                data.userId,
                data.meetingId,
                data.choice,
                data.responseId
            ],
            (error, results, fields) => {
                if(error){
                    console.log(error)
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

    deleteResponse: (data, callBack) => {
        pool.query(
            `UPDATE response SET deleted = 1 , deletedAt = CURRENT_TIMESTAMP() WHERE responseId = ?`,
            [data.responseId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

}
