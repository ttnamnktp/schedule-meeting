const pool = require("../../config/database");

module.exports = {

    createMeetingSchedule: (data, callBack) => {
        console.log(data.startTime);
        const startTimeJson = JSON.stringify(data.startTime);
        console.log(startTimeJson);

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
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )

        // // tạo response
        // // Sử dụng split để chia chuỗi thành mảng dựa trên dấu ":"
        // const mangChuoi = trangThai.split(":");
        // // Đếm số lượng phần tử trong mảng, trừ 1 để đếm số dấu ":"
        // const soLuongDauChamHoi = mangChuoi.length - 1;
        // const doanText = {};
        // for (let i = 0; i < soLuongPhanTu; i++) {
        //     doanText[i] = 'yes';
        // }
        // console.log(JSON.stringify(doanText));

    },

    getAllMeetingSchedules: callBack => {
        pool.query(
            `SELECT * FROM meetingschedule`,
            [],
            (error, results, fields) => {
                if (error){
                    callBack(error);
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
                return callBack(null, results);
            }
        )
    },

    updateMeetingSchedule: (data, callBack) => {
        pool.query(
            `UPDATE meetingschedule
            SET
              title = ?,
              organizerId = ?,
              startTime = ?,
              duration = ?,
              location = ?,
              description = ?,
              status = ?,
              createdBy = ?,
              modifiedAt = CURRENT_TIMESTAMP(),
              modifiedBy = organizerId
            WHERE meetingId = ?;`,
            [
                data.title,
                data.organizerId,
                data.startTime,
                data.duration,
                data.location,
                data.description,
                data.status,
                data.createdBy,
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
