const Tutor = require("../models/tutor.model");
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

const socialsignUpTutor = async ({ body }) => {
    const { email, password, isAgreeWithTNC, socialId, signUpType } = body;
    const condition = { socialId: socialId };
    let user = await Tutor.findOne(condition);
    if (!user) throw new BadRequest("Invalid social Id");
    let code = "Tr-" + (Math.random() + 1).toString(30).substring(5).toUpperCase();

    const saveObject = {
        email: email.toLowerCase(),
        role: "tutor",
        loginPhase: 1,
        isAgreeWithTNC: isAgreeWithTNC,
        socialId: socialId,
        accountId: code,
        loginPhase: 1
    };

    const update = await Tutor.updateOne(condition, {
        $set: saveObject
    })

    let token = await user.generateToken();
    var finalResponse = {
        user,
        token,
    }
    return finalResponse;
};

const socialLogin = async ({ body }) => {
    const condition = { socialId: body.socialId };
    var findsocialId = await Tutor.findOne(condition);

    if (findsocialId) {
        var msg = "Social login successfully";
        return { msg, findsocialId }
    }
    else {
        var createObject = {
            isProfileVerified: 0,
            loginPhase: 0,
            socialId: body.socialId,
            signUpType: body.signUpType,
            email:body.email,
            profilePic:body.profilePic,
            firstName:body.firstName,
            lastName:body.lastName,
            mobile:body.mobile
        }

        var findsocialId = await Tutor.create(createObject)


        findsocialId = createObject
        var msg = "Social signup successfully";
        return { msg, findsocialId }
    }
};


const setNewPassword = async ({ password, token }) => {
    const decode = jwt.verify(token, jwtForgotPasswordSecret);
    let user = await Tutor.findOne({ _id: decode._id, role: decode.role })
    if (!user) {
        throw new BadRequest("User not found");
    }
    user.password = password;
    await user.save();
    return
}
/**
 * @description - This function used for forget password
 */

const verifyForgotPasswordOtp = async ({ body }) => {
    const {
        email = "",
        otp = ""
    } = body;
    var emailquery = { email }
    console.log(emailquery, "<<<<<<<<<<<<<<<emailquery")
    let user = await Tutor.findOne(emailquery);
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

const tutorForgotPassword = async ({ email }) => {
    const condition = {
        email: email.toLowerCase()
    }
    let user = await Tutor.findOne(condition)
    if (!user) {
        throw new BadRequest("The provided email address is not registered");
    }
    const { otp, otpCreatedAt, otpExpiryTime } = generateOtpData({ userId: ObjectId(user._id) })
    user.otp = otp
    user.otpCreatedAt = otpCreatedAt;
    user.otpExpiryTime = otpExpiryTime;
    await user.save();
    sendOtpByEmail({ email, otp })
    return { otp }
}


const tutorEmailLogin = async (data) => {
    var condition = { email: data.emailUsername };

    let projection = { _id: 1, isProfileVerified: 1, loginPhase: 1 };

    var user = await Tutor.findOne(condition);
    if (user) {
        if (user.isSwitchRole == true) throw new BadRequest("Hi! you currently switch the profile");
    }
    if (!user) {
        condition = { firstName: data.emailUsername };
        user = await Tutor.findOne(condition);
        if (!user) throw new BadRequest("No User found");
        if (user.isSwitchRole == true) throw new BadRequest("Hi! you currently switch the profile");
    }

    const isMatch = await user.matchPassword(data.password);
    if (!isMatch) {
        throw new BadRequest("Invalid Credentials");
    }

    if (user.isProfileVerified !== 1 && user.loginPhase == 2) {
        if (user.isProfileVerified == 2) {
            throw new BadRequest("Hi! Admin rejected your profile");
        }
        throw new BadRequest("Hi! Admin not accepted your profile yet");
    }

    if (data.notificationDetails)
        data.notificationDetails["notificationEnabled"] = true;

    const token = await user.generateToken();
    const Login = await Tutor.findOneAndUpdate({ _id: user._id }, {
        $set: {
            notificationDetails: data.notificationDetails
        }
    })
    await user.save();
    return {
        user: await Tutor.findOne(condition, projection),
        userToken: token,
    };
};



/**
 * @description - This function is used to login as a student
 */

const signUpTutor = async ({ body }) => {
    const { email, password, isAgreeWithTNC, notificationDetails } = body;
    const condition = { email: email.toLowerCase() };
    let exist = await Tutor.findOne(condition);
    if (exist) throw new BadRequest("Email Already exist");
    let tutorCode = "TR-" + (Math.random() + 1).toString(30).substring(5).toUpperCase();

    var saveObject = {
        email: email.toLowerCase(),
        password: password,
        signUpType: "email",
        role: "tutor",
        isAgreeWithTNC: isAgreeWithTNC,
        accountId: tutorCode,
        loginPhase: 1,
        notificationDetails: notificationDetails
    };


    if (body.ambassdorId !== '') {

        var ambassdorId = {
            ambassdorRef: {
                isAmbassdorRef: true,
                ambassdorCode: body.ambassdorId
            }
        }
        saveObject = Object.assign(saveObject, ambassdorId);

    }
    let user = await new Tutor(saveObject);

    let token = await user.generateToken();
    await user.save();
    return user;

};

/**
 * @description - This function is used for new user google login
 */

const newUserGoogleLogin = async (data) => {
    const { email = "", name = "", picture = "" } = data;
    /**  @description - Create a new User and return token */
    const { firstName = "", lastName = "" } = splitName(name);
    const saveObj = {
        name,
        firstName,
        lastName,
        email: email.toLowerCase(),
        signUpType: "google",
        isEmailVerified: true,
        profileImage: picture,
    };

    let newUser = await new Tutor(saveObj);
    newUser.isEmailVerified = true;
    const token = await newUser.generateToken();
    await newUser.save();
    return {
        user: await Tutor.findOne({ _id: newUser._id }, { tokens: 0, password: 0 }),
        userToken: token,
    };
};

/**
 * @description - This fucntion is used to signup as individual
 */

const newUserFacebookLogin = async (data) => {
    const { firstName = "", lastName = "" } = splitFacebookName(data);

    /**  @description - Creatae a new Account */
    const saveObj = {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        signUpType: "facebook",
        email: data.email.toLowerCase(),
        isEmailVerified: true,
    };
    let user = await new Tutor(saveObj);

    const userToken = await user.generateToken();
    await user.save();
    return {
        exist,
        user: await Tutor.findOne({ _id: user._id }, { tokens: 0 }),
        userToken,
    };
};

/**
 * @description - This fucntion is used to signup as individual
 */

const existingUserSocialLogin = async (exist, signUpType) => {
    if (exist.signUpType !== signUpType) {
        throw new BadRequest(
            "Please login with the correct method you used for the first time"
        );
    }
    let user = exist;
    const userToken = await user.generateToken();
    user.isEmailVerified = true;
    await user.save();
    return {
        user: await Tutor.findOne({ _id: user._id }, { tokens: 0 }),
        userToken,
    };
};

/**
 * @description - This fucntion is used to signup as individual
 */

const googleLogin = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId,
    });

    const data = await ticket.getPayload();
    logger.info(data);

    if (!data) {
        throw new BadRequest("Failure in getting the user data");
    }
    const condition = { email: data.email.toLowerCase() };
    const exist = await Tutor.findOne(condition);

    if (!exist) {
        return await newUserGoogleLogin(data);
    }

    return await existingUserSocialLogin(exist, "google");
};

/**
 * @description - This fucntion is used to signup as individual
 */

const implementFacebookDataChecks = async (data) => {
    if (!data) {
        throw new BadRequest("Failed to get user details");
    }

    if (data && !data.email) {
        throw new BadRequest("No email found");
    }
};

/**
 * @description - This fucntion is used to signup as individual
 */

const fbLogin = async (accessToken, appDeviceId, fcmToken) => {
    const { data = null } = await axios.get(
        `https://graph.facebook.com/me?fields=name,first_name,last_name,picture,email&access_token=${encodeURIComponent(
            accessToken
        )}`
    );
    logger.info(data);

    await implementFacebookDataChecks(data);

    const exist = await Tutor.findOne({ email: data.email.toLowerCase() });

    if (!exist) {
        return await newUserFacebookLogin(data);
    }

    /**  @description -Generate token for the existing user */
    return await existingUserSocialLogin(exist, "facebook");
};


/**
 * @description - This fucntion is used to signup as individual
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
    verifyForgotPasswordOtp,
    tutorForgotPassword,
    googleLogin,
    fbLogin,
    checkToken,
    signUpTutor,
    tutorEmailLogin,
    setNewPassword,
    socialLogin,
    socialsignUpTutor
};