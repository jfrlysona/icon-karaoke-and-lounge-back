//otp for phone number using twilio start
// const jwt = require("jsonwebtoken");
// const twilio = require("twilio");
// const dotenv = require("dotenv");
// const UsersModel = require("../model/UserModel.js");

// dotenv.config();

// const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_KEY } =
//   process.env;

// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
//   lazyLoading: true,
// });

// const sendOtp = async (req, res, next) => {
//   const { phoneNumber, countryCode } = req.body;
//   try {
//     const otpResponse = await client.verify.v2
//       .services(TWILIO_SERVICE_SID)
//       .verifications.create({
//         to: `+${countryCode}${phoneNumber}`,
//         channel: "sms",
//       });
//     res.status(200).json({
//       message: "OTP sent successfully!",
//       data: otpResponse,
//     });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(400).json({
//       message: "Something went wrong!",
//       error: error.message,
//     });
//   }
// };

// const verifyOtp = async (req, res, next) => {
//   const { phoneNumber, countryCode, otp, fullname, gender, role } = req.body;
//   try {
//     const verifiedResponse = await client.verify.v2
//       .services(TWILIO_SERVICE_SID)
//       .verificationChecks.create({
//         to: `+${countryCode}${phoneNumber}`,
//         code: otp,
//       });

//     if (verifiedResponse.status === "approved") {
//       let user = await UsersModel.findOneAndUpdate(
//         { phoneNumber, countryCode },
//         { fullname, gender, role },
//         { new: true, upsert: true }
//       );

//       if (!user) {
//         return res.status(404).json({ message: "User not found!" });
//       }

//       const token = jwt.sign(
//         {
//           userId: user._id,
//           phoneNumber: user.phoneNumber,
//           countryCode: user.countryCode,
//           fullname: user.fullname,
//           role: user.role,
//         },
//         JWT_KEY,
//         {
//           expiresIn: "1h",
//         }
//       );

//       res.status(200).json({
//         message: "OTP verified and user information updated successfully!",
//         userId: user._id,
//         token: token,
//       });
//     } else {
//       res.status(400).json({
//         message: "Invalid OTP!",
//       });
//     }
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(400).json({
//       message: "Something went wrong!",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   sendOtp,
//   verifyOtp,
// };
//otp for phone number using twilio end

//otp for email using nodemailer start
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
const UsersModel = require("../model/UserModel.js");

dotenv.config();

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, JWT_KEY } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});
function generateNumericOtp(length) {
  const otp = crypto.randomInt(
    Math.pow(10, length - 1),
    Math.pow(10, length) - 1
  );
  return otp.toString().padStart(length, "0");
}

const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const otp = generateNumericOtp(4);
    const mailOptions = {
      from: `"ICON" <${EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
      html: `<b>Your OTP code is ${otp}</b>`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).json({
      message: "OTP sent successfully!",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const verifyOtp = async (req, res, next) => {
  const { otp, fullname, gender, role } = req.body;
  const { email } = req.params;
  try {
    const storedOtp = otp;

    if (otp === storedOtp) {
      let user = await UsersModel.findOneAndUpdate(
        { email },
        { fullname, gender, role },
        { new: true, upsert: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          fullname: user.fullname,
          role: user.role,
        },
        JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "OTP verified and user information updated successfully!",
        userId: user._id,
        token: token,
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

module.exports = {
  sendOtp,
  verifyOtp,
};

//otp for email using nodemailer end
