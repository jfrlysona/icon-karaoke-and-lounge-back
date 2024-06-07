const express = require("express");
const { sendOtp, verifyOtp } = require("../controller/OtpController.js");

const OtpRouter = express.Router();

OtpRouter.post("/otp/send", sendOtp);
OtpRouter.post("/otp/verify/:email", verifyOtp);

module.exports = { OtpRouter };
