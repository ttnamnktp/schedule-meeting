const { 
    createResponse,
    getAllResponses,
    updateResponse,
    deleteResponse
    } = require("./response.service");

module.exports = {

    createResponse: (req, res) => {
        const body = req.body;
        createResponse(body, (error, results) => {
            if(error) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error or record already existed!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAllResponses: (req, res) => {
        getAllResponses((error, results) => {
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

    updateResponse: (req, res) => {
        const body = req.body;
        updateResponse(body, (error, results) => {
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

    deleteResponse: (req, res) => {
        const data = req.body;
        deleteResponse(data, (error, results) => {
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