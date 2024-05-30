import twilio from "twilio";
import dotenv from "dotenv";
import { UsersModel } from "../model/UserModel.js";
dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } =
  process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

export const sendOtp = async (req, res, next) => {
  const { phoneNumber, countryCode } = req.body;
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
      });
    res.status(200).json({
      message: "OTP sent successfully!",
      data: otpResponse,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res, next) => {
  const { phoneNumber, countryCode, otp, fullname, gender, role } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      });

    if (verifiedResponse.status === "approved") {
      const user = await UsersModel.findOneAndUpdate(
        { phoneNumber, countryCode },
        { fullname, gender, role },
        { new: true, upsert: true }
      );

      res.status(200).json({
        message: "OTP verified and user information updated successfully!",
        userId: user._id,
      });
    } else {
      res.status(400).json({
        message: "Invalid OTP!",
      });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
