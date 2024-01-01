const pool = require("../../config/database");

module.exports = {

    createMeetingSchedule: (data, callBack) => {
        // console.log(data.startTime);
        const startTimeJson = JSON.stringify(data.startTime);
        // console.log(startTimeJson);

        pool.query(
            `INSERT INTO meetingschedule (
                title, 
                organizerId, 
                startTime, 
                duration, 
                location, 
                description, 
                status, 
                createdBy
              ) VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.title,
                data.organizerId,
                startTimeJson,
                data.duration,
                data.location,
                data.description,
                data.status,
                data.createdBy
            ],
            (error, resultsMeeting, fields) => {
                if(error){
                    return callBack(error);
                }
                // Lấy số phần tử trong startTime
                const danhSachKeys = Object.keys(data.startTime);
                const soLuongPhanTu = danhSachKeys.length;

                // tạo response
                const doanText = {};
                for (let i = 0; i < soLuongPhanTu; i++) {
                    doanText[i] = 'yes';
                }
                const choiceJson = JSON.stringify(doanText);

                const meetingId = resultsMeeting.insertId;

                pool.query(
                    `INSERT INTO response (userId, meetingId, choice)
                    VALUES (?, ?, ?);`,
                    [
                        data.organizerId,
                        meetingId,
                        choiceJson
                    ],
                    (error, resultsResponse, fields) => {
                        if(error){
                            return callBack(error);
                        }
                        return callBack(null,resultsMeeting,resultsResponse);
                    }
                )
            }
        )
    },

    getAllMeetingSchedules: callBack => {
        pool.query(
            `SELECT * FROM meetingschedule`,
            [],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                for (let i = 0; i < results.length; i++){
                    // Lấy giá trị của trường startTime từ kết quả
                    const startTimeJsonString = results[i].startTime;

                    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
                    const startTimeObject = JSON.parse(startTimeJsonString);

                    // Gán giá trị startTimeObject vào thuộc tính startTime của kết quả
                    results[i].startTime = startTimeObject;
                }
                return callBack(null, results);
            }
        )
    },

    getMeetingSchedulesByOrganizerId: (organizerId, callBack) => {
        pool.query(
            `SELECT * FROM meetingschedule WHERE organizerId = ? AND deleted = 0`,
            [organizerId],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                for (let i = 0; i < results.length; i++){
                    // Lấy giá trị của trường startTime từ kết quả
                    const startTimeJsonString = results[i].startTime;

                    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
                    const startTimeObject = JSON.parse(startTimeJsonString);

                    // Gán giá trị startTimeObject vào thuộc tính startTime của kết quả
                    results[i].startTime = startTimeObject;
                }
                return callBack(null, results);
            }
        )
    },

    getMeetingSchedulesByParticipantId: (participantId, callBack) => {
        pool.query(
            `SELECT ms.*
            FROM meetingschedule ms
            JOIN response r ON ms.meetingId = r.meetingId
            WHERE r.userId = ? AND ms.deleted = 0 AND ms.organizerId != r.userId;
            `,
            [participantId],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                for (let i = 0; i < results.length; i++){
                    // Lấy giá trị của trường startTime từ kết quả
                    const startTimeJsonString = results[i].startTime;

                    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
                    const startTimeObject = JSON.parse(startTimeJsonString);

                    // Gán giá trị startTimeObject vào thuộc tính startTime của kết quả
                    results[i].startTime = startTimeObject;
                }
                return callBack(null, results);
            }
        )
    },

    getMeetingSchedulesByUserId: (userId, callBack) => {
        pool.query(
            `SELECT ms.*
            FROM meetingschedule ms
            JOIN response r ON ms.meetingId = r.meetingId
            WHERE (r.userId = ? OR ms.organizerId = ?) AND ms.deleted = 0;
            `,
            [
                userId,
                userId
            ],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                for (let i = 0; i < results.length; i++){
                    // Lấy giá trị của trường startTime từ kết quả
                    const startTimeJsonString = results[i].startTime;

                    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
                    const startTimeObject = JSON.parse(startTimeJsonString);

                    // Gán giá trị startTimeObject vào thuộc tính startTime của kết quả
                    results[i].startTime = startTimeObject;
                }
                return callBack(null, results);
            }
        )
    },

    getConfirmedMeetingSchedules: (userId, callBack) => {
        pool.query(
            `SELECT ms.*
            FROM meetingschedule ms
            JOIN response r ON ms.meetingId = r.meetingId
            WHERE (r.userId = ? OR ms.organizerId = ?) AND status = 'confirmed' AND ms.deleted = 0;
            `,
            [
                userId,
                userId
            ],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                for (let i = 0; i < results.length; i++){
                    // Lấy giá trị của trường startTime từ kết quả
                    const startTimeJsonString = results[i].startTime;

                    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
                    const startTimeObject = JSON.parse(startTimeJsonString);

                    // Gán giá trị startTimeObject vào thuộc tính startTime của kết quả
                    results[i].startTime = startTimeObject;
                }
                return callBack(null, results);
            }
        )
    },

    getMeetingSchedulesByTitle: (title, callBack) => {
        pool.query(
            `SELECT * FROM meetingschedule WHERE title = ? AND deleted = 0`,
            [title],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                for (let i = 0; i < results.length; i++){
                    // Lấy giá trị của trường startTime từ kết quả
                    const startTimeJsonString = results[i].startTime;

                    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
                    const startTimeObject = JSON.parse(startTimeJsonString);

                    // Gán giá trị startTimeObject vào thuộc tính startTime của kết quả
                    results[i].startTime = startTimeObject;
                }
                return callBack(null, results);
            }
        )
    },

    updateMeetingSchedule: (data, callBack) => {
        const startTimeJson = JSON.stringify(data.startTime);
        pool.query(
            `UPDATE meetingschedule
            SET
              title = ?,
              startTime = ?,
              duration = ?,
              location = ?,
              description = ?,
              status = ?,
              modifiedAt = CURRENT_TIMESTAMP(),
              modifiedBy = organizerId
            WHERE meetingId = ?;`,
            [
                data.title,
                startTimeJson,
                data.duration,
                data.location,
                data.description,
                data.status,
                data.meetingId
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

    deleteMeetingSchedule: (data, callBack) => {
        pool.query(
            `UPDATE meetingschedule SET deleted = 1 , deletedAt = CURRENT_TIMESTAMP(), deletedBy = organizerId WHERE meetingId = ?`,
            [data.meetingId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

}
