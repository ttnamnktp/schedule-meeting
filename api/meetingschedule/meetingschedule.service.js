const pool = require("../../config/database");

module.exports = {

    createMeetingSchedule: (data, callBack) => {
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
                data.startTime,
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
            RIGHT JOIN response r ON ms.meetingId = r.meetingId
            WHERE r.userId = ? AND deleted = 0;
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

    getMeetingSchedulesByUserId: (participantId, callBack) => {
        pool.query(
            `SELECT ms.*
            FROM meetingschedule ms
            LEFT JOIN response r ON ms.meetingId = r.meetingId
            WHERE (r.userId = ? OR ms.organizerId = ?) AND ms.deleted = 0;
            `,
            [
                participantId,
                participantId
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
