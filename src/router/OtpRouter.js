import express from "express";
import { sendOtp, verifyOtp } from "../controller/OtpController.js";

export const OtpRouter = express.Router();

OtpRouter.post("/otp/send", sendOtp);
OtpRouter.post("/otp/verify", verifyOtp);
