const Admin = require("../../../models/admins.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../../../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../../../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const { generateVerificationToken, generateOtpData, generateJWTToken } = require("../../../helper/common");
const emailService = require("../../email.services");
const jwt = require("jsonwebtoken");

const sendOtpByEmail = ({
    email,
    otp,
}) => {
    emailService
        .sendOtpEmail({ otp, email })
        .then((r) => logger.info("Otp sent on email successfully", r))
        .catch((err) =>
            logger.error("failure in sending the otp on email", err)
        );
};

/**
 * @description - This controller is used for logout super admin
 */

const logout = async ({userId}) => {
    let user = await Admin.findOne({ _id: ObjectId(userId) });
    user.token = "";
    user.failedLoginAttempts = 0;
    await user.save();
    return;
};

/**
 * @description - This controller is used for set new password as super admin
 */

 const changePassword = async ({ body, userId }) => {
    const condition = { _id: userId }
    const { password, oldPassword } = body
    let user = await Admin.findOne(condition)
    if (!user) {
        throw new BadRequest("User not found");
    }
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
        throw new Error("Invalid old password!");
    }
    user.password = password;
    await user.save();
    return
}

 const setNewPassword = async ({ password, token }) => {
    const decode = jwt.verify(token, jwtForgotPasswordSecret);
    let user = await Admin.findOne({ _id: decode.userId, role: decode.role })
    if (!user) {
        throw new BadRequest("User not found");
    }
    user.password = password;
    await user.save();
    return
}


 const verifyForgotPassword = async ({ body }) => {
  const {
      email = "",
      otp=""
      } = body
  var emailquery = { email }
  let user = await Admin.findOne(emailquery);
  if (!user) {
      throw new BadRequest(`User not found`);
  }
  if (user.otp != otp.trim()) {
      throw new BadRequest("Invalid Otp");
  };
  let currentTime = new Date();
  if (currentTime.getTime() >= user.otpExpiryTime.getTime()) {
      throw new BadRequest("OTP Expired");
  }
  user.isOtpVerified = true;
  user.otpVerificationTime = new Date()

  
  const token = await generateJWTToken(
      {
          payload: { _id: user._id.toString(), role: user.role },
          secret: jwtForgotPasswordSecret,
          expiresIn: '1h'
      })
  user.forgotPasswordToken = token
  await user.save();
  return { token };
};

 const forgotPassword = async ({ email }) => {

  const condition = {
      email: email.toLowerCase(),
      role:"superAdmin"
  }

  let user = await Admin.findOne(condition)
  if (!user) {
      throw new BadRequest("The provided email address is not registered");
  }
  const { otp, otpCreatedAt, otpExpiryTime } = generateOtpData({ userId: ObjectId(user._id) })
  user.otp = otp
  user.otpCreatedAt = otpCreatedAt;
  user.otpExpiryTime = otpExpiryTime;
  await user.save();
  if (env !== "development")
      sendOtpByEmail({ email, otp })
  // emailServices.sendForgotPasswordEmail({ email, token })
  return { otp }
}


 
/**
 * @description - This function used for emailLogin
 */

const emailLogin = async (data) => {
    var condition = {
    email:data.emailUsername,
    role:"superAdmin"
   };

    let projection = {accountDetails:1, _id: 1,};

    var user = await Admin.findOne(condition);

    if(!user){
         condition = {firstName:data.emailUsername };
         user = await Admin.findOne(condition);
         if (!user) throw new BadRequest("No User found");
    }

    const isMatch = await user.matchPassword(data.password);

    
    if (!isMatch) {
      throw new BadRequest("Invalid Credentials");
    }  
    
    const token = await user.generateToken();
    await user.save();
    console.log(condition,"<<<<<<<<<<<<<<<<<<<<condition")
    return {
      user: await Admin.findOne(condition,{ratingsSurvey:0}),
      userToken: token,
    };
  };







module.exports = {
  emailLogin,
  forgotPassword,
  verifyForgotPassword,
  setNewPassword,
  changePassword,
  logout
};