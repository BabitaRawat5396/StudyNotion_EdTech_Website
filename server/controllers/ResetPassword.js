const User = require("../models/user");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");

//reset Password token
exports.resetPasswordToken = async (req, res) => {
  try {
    //fetch data
    const email = req.body.email;

    // check if user exist or not
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.json({
        success: false,
        message: `Entered email is not Registered. Please enter a Valid Email `,
      });
    }

    //generate token
    const token = crypto.randomBytes(20).toString("hex");

    //save token for respective email
    const savedUser = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // create URL
    // const url = `http://localhost:3000/update-password/${token}`;
    const url = `https://studynotion-edtech-website.vercel.app/update-password/${token}`;

    //send link to the mail
    await mailSender(
      email,
      "Reset Password Link",
      `Password Reset Link : ${url}`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
      token: token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Unable to send reset link, Please try again.",
      error: error.message,
    });
  }
};

//reset Password
exports.resetPassword = async (req, res) => {
  try {
    // fetch data
    const { password, confirmPassword, token } = req.body; //here token is present in url and we are fetching it using req.body and not url(line30) params that is because it is inserted in url in frontend

    //is password strong
    const isPassStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isPassStrong) {
      res.json({
        success: false,
        message: "Password is not strong",
      });
    }

    //validation
    if (password !== confirmPassword) {
      res.json({
        success: false,
        message: "Password didn't match",
      });
    }

    // fetch user using token and check expiration date
    const user = await User.findOne({ token });
    if (!user) {
      res.json({
        success: false,
        message: "Invalid token",
      });
    }

    // check if token is expired
    if (!(user.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    //hash the password
    const encryptedPass = await bcrypt.hash(password, 10);

    //update the password
    await User.findOneAndUpdate(
      { token },
      { password: encryptedPass },
      { new: true }
    );

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error while reseting password",
    });
  }
};
