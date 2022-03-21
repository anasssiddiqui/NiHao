const Ambassador = require("../models/ambassador.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const { generateVerificationToken, generateOtpData, generateJWTToken } = require("../helper/common");
const emailService = require("./email.services");
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
 * @description - This function is used to Set change password as Ambassador
 */

const changePassword = async ({ body, userId }) => {
    const condition = { _id: userId }
    const { password, oldPassword } = body
    let user = await Ambassador.findOne(condition)
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


/**
 * @description - This fucntion is used to Set new password as Ambassador
 */


const setNewPassword = async ({ password, token }) => {
    const decode = jwt.verify(token, jwtForgotPasswordSecret);
    let user = await Ambassador.findOne({ _id: decode._id, role: decode.role })
    if (!user) {
        throw new BadRequest("User not found");
    }
    user.password = password;
    await user.save();
    return
}


/**
 * @description - This fucntion is used to Eamil login as Ambassador
 */


const ambassadorEmailLogin = async (data) => {
    var condition = { email: data.emailUsername };

    let projection = { accountDetails: 1, _id: 1, };

    var user = await Ambassador.findOne(condition);

    if (!user) {
        condition = { firstName: data.emailUsername };
        user = await Ambassador.findOne(condition);
        if (!user) throw new BadRequest("No User found");
    }

    const isMatch = await user.matchPassword(data.password);
    if (!isMatch) {
        throw new BadRequest("Invalid Credentials");
    }

    if (user.loginPhase == 1 || user.loginPhase == 0) {
        const token = await user.generateToken();
        await user.save();
        return {
            user: await Ambassador.findOne(condition),
            userToken: token,
        };
    } else if (user.loginPhase == 2 && user.isProfileVerified == 0) {
        throw new BadRequest("Hi! your profile is not accepted by admin yet please try after sometime");
    } else if (user.isProfileVerified == 2) {
        throw new BadRequest("Hi! your profile is rejected by admin  please signup again");
    } else {
        const token = await user.generateToken();
        await user.save();
        return {
            user: await Ambassador.findOne(condition),
            userToken: token,
        };
    }

};

/**
 * @description - This fucntion is used to signup as Ambassador
 */
const signUpAmbassador = async ({ body }) => {
    const { email, password, isAgreeWithTNC, socialId } = body;
    const condition = { email: email.toLowerCase() };
    let exist = await Ambassador.findOne(condition);
    if (exist) throw new BadRequest("Email Already exist");

    const saveObject = {
        email: email.toLowerCase(),
        password: password,
        signUpType: "email",
        role: "ambassador",
        loginPhase: 1,
        isAgreeWithTNC: isAgreeWithTNC,
    };

    let user = await new Ambassador(saveObject);
    let token = await user.generateToken();
    await user.save();
    var finalResponse = {
        userEmail: user,
        token,
    }
    return finalResponse;
};

const socialsignUpAmbassador = async ({ body }) => {
    const { email, password, isAgreeWithTNC, socialId, signUpType } = body;
    const condition = { socialId: socialId };
    let user = await Ambassador.findOne(condition);
    if (!user) throw new BadRequest("Invalid social Id");

    const saveObject = {
        email: email.toLowerCase(),
        role: "ambassador",
        loginPhase: 1,
        isAgreeWithTNC: isAgreeWithTNC,
        socialId: socialId,
    };

    const update = await Ambassador.updateOne(condition, {
        $set: saveObject
    })

    let token = await user.generateToken();
    var finalResponse = {
        user,
        token,
    }
    return finalResponse;
};


/**
 * @description - This fucntion is used to signup as individual
 */

const socialLogin = async ({ body }) => {
    const condition = { socialId: body.socialId };
    var findsocialId = await Ambassador.findOne(condition);

    if (findsocialId) {
        var msg = "Social login successfully";
        return { msg, findsocialId }
    }


    else {
        
        var createObject = {
            socialId: body.socialId,
            signUpType: body.signUpType,
            image: image,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile
        }

        var findsocialId = await Ambassador.create(createObject)
        var msg = "Social signup successfully";
        return { msg, findsocialId }
    }
};
/**
 * @description - This fucntion is used for implement email login check
 */
// const implementEmailLoginChecks = async (user, password) => {
//     if (!user) throw new BadRequest("No User found");
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//         user.failedLoginAttempts = user.failedLoginAttempts + 1;
//         user.save();
//         throw new BadRequest("Invalid Credentials");
//     }
// };



/**
 * @description - This fucntion is used to signup as individual
 */

const logoutAmbassador = async ({ userId, token }) => {
    let user = await Ambassador.findOne({ _id: ObjectId(userId) });
    user.token = "";
    user.failedLoginAttempts = 0;
    await user.save();
    return;
};



/**
 * @description - This function used for forget password
 */

const forgotPassword = async ({ email }) => {
    const condition = {
        email: email.toLowerCase()
    }

    let user = await Ambassador.findOne(condition)

    if (!user) {
        throw new BadRequest("The provided email address is not registered");
    }
    const { otp, otpCreatedAt, otpExpiryTime } = generateOtpData({ userId: ObjectId(user._id) })
    user.otp = otp
    user.otpCreatedAt = otpCreatedAt;
    user.otpExpiryTime = otpExpiryTime;
    await user.save();
    sendOtpByEmail({ email, otp })
    // emailServices.sendForgotPasswordEmail({ email, token })
    return { otp }
}




/**
* @description - This Function is used to verify forget password otp
*/

const verifyForgotPasswordOtpAmbassador = async ({ body }) => {
    const {
        email = "", otp = "" } = body
    var emailquery = { email }
    let user = await Ambassador.findOne(emailquery);
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

/**
 * @description - This function is used to signup as individual
 */

const checkToken = async ({ token }) => {
    const decode = jwt.verify(token, jwtForgotPasswordSecret);
    const userId = decode.userId
    const condition = { _id: userId }
    const user = await Tutor.findOne(condition)
    if (!user) {
        throw new BadRequest("No user found")
    }
    return
};



module.exports = {
    socialLogin,
    checkToken,
    signUpAmbassador,
    ambassadorEmailLogin,
    logoutAmbassador,
    forgotPassword,
    verifyForgotPasswordOtpAmbassador,
    setNewPassword,
    socialsignUpAmbassador,
    changePassword
};