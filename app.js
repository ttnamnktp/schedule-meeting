require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const meetingRouter = require("./api/meetingschedule/meetingschedule.router");
const responseRouter = require("./api/response/response.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Specify extended mode as true
var cors = require('cors')

app.use(cors())
app.use("/user", userRouter);
app.use("/meeting", meetingRouter);
app.use("/response", responseRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("server running on PORT: ", process.env.APP_PORT);
});