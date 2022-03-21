const Users = require("../models/user.model");
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

const socialsignUp = async ({ body }) => {
    const { email, password, isAgreeWithTNC, socialId, signUpType, notificationDetails } = body;
    const condition = { socialId: socialId };
    let user = await Users.findOne(condition);
    if (!user) throw new BadRequest("Invalid social Id");
    let code = "Tr-" + (Math.random() + 1).toString(30).substring(5).toUpperCase();

    const saveObject = {
        email: email.toLowerCase(),
        role: "student",
        loginPhase: 1,
        isAgreeWithTNC: isAgreeWithTNC,
        socialId: socialId,
        accountId: code,
        loginPhase: 1,
        notificationDetails: notificationDetails
    };

    const update = await Users.updateOne(condition, {
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
    var findsocialId = await Users.findOne(condition);

    if (findsocialId) {
        var msg = "Social login successfully";
        return { msg, findsocialId }
    }
    else {
        var createObject = {
            socialId: body.socialId,
            signUpType: body.signUpType,
            firstName: body.firstName,
            lastName: body.lastName,
            mobile: body.mobile,
            email: body.email,
            profilePic: body.profilePic
        }

        var findsocialId = await Users.create(createObject)

        findsocialId = createObject
        var msg = "Social signup successfully";
        return { msg, findsocialId }
    }
};

const tutorEmailLogin = async (data) => {
    var condition = { email: data.emailUsername };

    let projection = { accountDetails: 1, _id: 1, };

    var user = await Users.findOne(condition);

    if (!user) {
        condition = { firstName: data.emailUsername };
        user = await Users.findOne(condition);
        if (!user) throw new BadRequest("No User found");
    }

    const isMatch = await user.matchPassword(data.password);
    if (!isMatch) {
        throw new BadRequest("Invalid Credentials");
    }

    const token = await user.generateToken();
    await user.save();
    return {
        user: await Users.findOne(condition, projection),
        userToken: token,
    };
};



/**
 * @description - This fucntion is used to login as a student
 */

const signUpTutor = async ({ body }) => {
    const { email, password, isAgreeWithTNC } = body;
    const condition = { email: email.toLowerCase() };
    let exist = await Users.findOne(condition);
    if (exist) throw new BadRequest("Email Already exist");

    const saveObject = {
        email: email.toLowerCase(),
        password: password,
        signUpType: "email",
        role: "tutor",
        isAgreeWithTNC: isAgreeWithTNC,
        isSignUp: true
    };
    if (body.ambassdorId !== '' || body.ambassdorId !== undefined) {
        var ambassdorId = {
            ambassdorRef: {
                isAmbassdorRef: true,
                ambassdorCode: body.ambassdorId
            }
        }

        saveObject = Object.assign(saveObject, ambassdorId);
    }
    let user = await new Users(saveObject);

    let token = await user.generateToken();
    await user.save();
    return { user, token };
};


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

    const token = await user.generateToken();
    await user.save();
    console.log(condition, "<<<<<<<<<<<<<<<<<<<<condition")
    return {
        user: await Ambassador.findOne(condition, projection),
        userToken: token,
    };
};

/**
 * @description - This fucntion is used to signup as student
 */
const signUpAmbassador = async ({ body }) => {
    const { email, password, isAgreeWithTNC } = body;
    const condition = { email: email.toLowerCase() };
    let exist = await Ambassador.findOne(condition);
    if (exist) throw new BadRequest("Email Already exist");

    const saveObject = {
        email: email.toLowerCase(),
        password: password,
        signUpType: "email",
        role: "ambassador",
        loginPhase: 1,
        isAgreeWithTNC: isAgreeWithTNC
    };

    let user = await new Ambassador(saveObject);

    let token = await user.generateToken();
    await user.save();
    var finalResponse = {
        userEmail: user.email,
        token,
    }
    return finalResponse;
};

const signUpStudent = async ({ body }) => {
    const { email, password, studentId, notificationDetails } = body;
    const condition = { email: email.toLowerCase() };
    let exist = await Users.findOne(condition);
    if (exist) throw new BadRequest("Email Already exist");

    const saveObject = {
        studentId,
        email: email.toLowerCase(),
        password: password,
        signUpType: "email",
        role: "student",
        notificationDetails: notificationDetails,
        isSignUp: true
    };

    let user = await new Users(saveObject);
    let token = await user.generateToken();
    await user.save();
    return { user, token };
};

/**
 * @description - This function is used to signup as employe
 */

const signUpEmployee = async ({ body }) => {
    const { email, password, employeeId } = body;
    const condition = { email: email.toLowerCase() };
    let exist = await Users.findOne(condition);
    if (exist) throw new BadRequest("Email Already exist");
    const saveObject = {
        employeeId,
        email: email.toLowerCase(),
        password: password,
        role: "employee",
        signUpType: "email",
    };
    let user = await new Users(saveObject);
    let token = await user.generateToken();
    await user.save();
    return { user, token };
};

/**
 * @description - This function is used to signup as individual
 */

const signUpIndividual = async ({ body }) => {
    const { email, password } = body;
    const condition = { email: email.toLowerCase() };
    let exist = await Users.findOne(condition);
    if (exist) throw new BadRequest("Email Already exist");
    const saveObject = {
        email: email.toLowerCase(),
        password: password,
        role: "individual",
        signUpType: "email",
    };

    let user = await new Users(saveObject);
    let token = await user.generateToken();
    await user.save();
    return { user, token };
};

/**
 * @description - This fucntion is used for new user google login
 */

const newUserGoogleLogin = async (data) => {
    const { email = "", name = "", picture = "" } = data;
    /**  @description -Create a new User and return token */
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

    let newUser = await new Users(saveObj);
    newUser.isEmailVerified = true;
    const token = await newUser.generateToken();
    await newUser.save();
    return {
        user: await Users.findOne({ _id: newUser._id }, { tokens: 0, password: 0 }),
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
    let user = await new Users(saveObj);

    const userToken = await user.generateToken();
    await user.save();
    return {
        exist,
        user: await Users.findOne({ _id: user._id }, { tokens: 0 }),
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
        user: await Users.findOne({ _id: user._id }, { tokens: 0 }),
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
    const exist = await Users.findOne(condition);

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

    const exist = await Users.findOne({ email: data.email.toLowerCase() });

    if (!exist) {
        return await newUserFacebookLogin(data);
    }

    /**  @description -Generate token for the existing user */
    return await existingUserSocialLogin(exist, "facebook");
};

/**
 * @description - This fucntion is used for implement email login check
 */
const implementEmailLoginChecks = async (user, password) => {
    if (!user) throw new BadRequest("No User found");
    if (user.password == '' || user.password == undefined) throw new BadRequest("This email already used in social login");
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new BadRequest("Invalid Credentials");
    }
};

/**
 * @description - This function uses the email to login
 */

const emailLogin = async ({ body }) => {
    const { email = "", password = "", notificationDetails } = body;

    const condition = { email: email.toLowerCase() };
    let user = await Users.findOne(condition);

    await implementEmailLoginChecks(user, password);

    const token = await user.generateToken();
    
    if (notificationDetails)
        body.notificationDetails["notificationEnabled"] = true;

    const updated = await Users.findOneAndUpdate({ _id: user._id }, { $set: { notificationDetails: notificationDetails } })
    return {
        user: updated,
        userToken: token,
    };
};

/**
 * @description - This function is used to signup as individual
 */

const logoutAmbassador = async ({ userId, token }) => {
    let user = await Ambassador.findOne({ _id: ObjectId(userId) });
    user.token = "";
    user.failedLoginAttempts = 0;
    await user.save();
    return;
};

const logoutUser = async ({ userId }) => {
    let user = await Users.findOne({ _id: ObjectId(userId) });
    user.token = "";
    user.failedLoginAttempts = 0;
    await user.save();
    return;
};

/**
 * @description - This function used for forget password
 */
const forgotPasswordAmbassador = async ({ email }) => {
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
    if (env !== "development")
        sendOtpByEmail({ email, otp })
    // emailServices.sendForgotPasswordEmail({ email, token })
    return { otp }
}

const forgotPassword = async ({ email }) => {
    const condition = {
        email: email.toLowerCase()
    }
    let user = await Users.findOne(condition)
    if (!user) {
        throw new BadRequest("The provided email address is not registered");
    }
    const { otp, otpCreatedAt, otpExpiryTime } = generateOtpData({ userId: ObjectId(user._id) })
    user.otp = otp
    user.otpCreatedAt = otpCreatedAt;
    user.otpExpiryTime = otpExpiryTime;
    await user.save();
    console.log("<<<<<<<<<<<<<<<,,,env", env)
    sendOtpByEmail({ email, otp })
    // emailServices.sendForgotPasswordEmail({ email, token })
    return { otp }
}


/**
* @description - This Function is used to verify forget password otp
*/

const verifyForgotPasswordOtpAmbassador = async ({ body }) => {
    const {
        email = "",
        otp = ""
    } = body;
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

const verifyForgotPasswordOtp = async ({ body }) => {
    const {
        email = "",
        otp = ""
    } = body;
    var emailquery = { email }
    let user = await Users.findOne(emailquery);
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
 * @description - This function used for set new password
 */

const setNewPassword = async ({ password, token }) => {
    const decode = jwt.verify(token, jwtForgotPasswordSecret);
    let user = await Users.findOne({ _id: decode.userId, role: decode.role })
    if (!user) {
        throw new BadRequest("User not found");
    }
    user.password = password;
    await user.save();
    return
}

/**
 * @description - This function is used for change password
 */

const changePassword = async ({ body, userId }) => {
    const condition = { _id: userId }
    const { password, oldPassword } = body
    let user = await Users.findOne(condition)
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
 * @description - This fucntion is used to signup as individual
 */
const checkToken = async ({ token }) => {
    const decode = jwt.verify(token, jwtForgotPasswordSecret);
    const userId = decode.userId
    const condition = { _id: userId }
    const user = await Users.findOne(condition)
    if (!user) {
        throw new BadRequest("No user found")
    }
    return
};



module.exports = {
    socialsignUp,
    socialLogin,
    signUpStudent,
    signUpEmployee,
    signUpIndividual,
    googleLogin,
    fbLogin,
    emailLogin,
    logoutUser,
    forgotPassword,
    verifyForgotPasswordOtp,
    setNewPassword,
    checkToken,
    changePassword,
    signUpAmbassador,
    ambassadorEmailLogin,
    logoutAmbassador,
    forgotPasswordAmbassador,
    verifyForgotPasswordOtpAmbassador,
    signUpTutor,
    tutorEmailLogin
};