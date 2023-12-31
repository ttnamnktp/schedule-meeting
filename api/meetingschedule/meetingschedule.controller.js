const { 
    createMeetingSchedule,
    getAllMeetingSchedules,
    getMeetingSchedulesByOrganizerId,
    getMeetingSchedulesByParticipantId,
    getMeetingSchedulesByUserId,
    getMeetingSchedulesByTitle,
    updateMeetingSchedule,
    deleteMeetingSchedule
    } = require("./meetingschedule.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {

    createMeetingSchedule: (req, res) => {
        const body = req.body;
        createMeetingSchedule(body, (error, results) => {
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

    getAllMeetingSchedules: (req, res) => {
        getAllMeetingSchedules((error, results) => {
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

    getMeetingSchedulesByOrganizerId: (req, res) => {
        const organizerId = req.params.organizerId;
        getMeetingSchedulesByOrganizerId(organizerId, (error, results) => {
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

    getMeetingSchedulesByParticipantId: (req, res) => {
        const participantId = req.params.participantId;
        getMeetingSchedulesByParticipantId(participantId, (error, results) => {
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

    getMeetingSchedulesByUserId: (req, res) => {
        const userId = req.params.userId;
        getMeetingSchedulesByUserId(userId, (error, results) => {
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

    getMeetingSchedulesByTitle: (req, res) => {
        const title = req.params.title;
        getMeetingSchedulesByTitle(title, (error, results) => {
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

    updateMeetingSchedule: (req, res) => {
        const body = req.body;
        updateMeetingSchedule(body, (error, results) => {
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
                message: "Updated successfully"
            });
        });
    },

    deleteMeetingSchedule: (req, res) => {
        const data = req.body;
        deleteMeetingSchedule(data, (error, results) => {
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

};