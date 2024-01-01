const pool = require("../../config/database");

module.exports = {

    createResponse: (data, callBack) => {
        const choiceJson = JSON.stringify(data.choice);
        pool.query(
            `INSERT INTO response (userId, meetingId, choice)
            VALUES (?, ?, ?);`,
            [
                data.userId,
                data.meetingId,
                choiceJson
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

    getResponseByUserMeetingId: (data, callBack) => {
        pool.query(
            `SELECT * FROM response WHERE userId = ? AND meetingId = ?`,
            [
                data.userId,
                data.meetingId
            ],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getResponseByUserId: (userId, callBack) => {
        pool.query(
            `SELECT * FROM response WHERE userId = ?`,
            [
                userId
            ],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                for (let i = 0; i < results.length; i++){
                    const choiceJsonString = results[i].choice;
                    const choiceObject = JSON.parse(choiceJsonString);
                    results[i].choice = choiceObject;
                }
                return callBack(null, results);
            }
        )
    },
    
    updateResponse: (data, callBack) => {
        const choiceJson = JSON.stringify(data.choice);
        pool.query(
            `UPDATE response
            SET
              choice = ?,
              modifiedAt = CURRENT_TIMESTAMP()
            WHERE responseId = ?;`,
            [
                choiceJson,
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
            [
                data.responseId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

}
