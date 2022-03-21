const Admin = require("../../../models/admins.model");
const Ambassador = require("../../../models/ambassador.model");
const Tutor = require("../../../models/tutor.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../../../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../../../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const { generateVerificationToken, generateOtpData, generateJWTToken } = require("../../../helper/common");
const emailService = require("../../email.services");
const jwt = require("jsonwebtoken");


const sendTutorVerificationEmail = ({
    user
}) => {
    emailService
        .sendTutorVerificationEmail({ user })
        .then((r) => logger.info("Verification id send successfully", r))
        .catch((err) =>
            logger.error("failure in sending the otp on email", err)
        );
};



/**
 * @description - This controller is used for accept ambassador request
 */

const tutorsDetails = async ({ body }) => {

    let tutordetails = await Tutor.findOne({ _id: body.id }, {

    });

    return { tutordetails }
};


/**
 * @description - This controller is used for accept ambassador request
 */

const rejectRequest = async ({ body }) => {

    let update = await Tutor.updateOne({ _id: body.id }, {
        isProfileVerified: 2,
    });

    return;
};


/**
 * @description - This controller is used for accept ambassador request
 */

const acceptRequest = async ({ body }) => {
    let tutorInfo = await Tutor.findOne({ _id: ObjectId(body.id) });

    await sendTutorVerificationEmail(
        { user: tutorInfo }
    )

    let update = await Tutor.updateOne({ _id: body.id }, {
        isProfileVerified: 1,
        otpVerificationTime: new Date(),
    });

    return;
};


/**
 * @description - This controller is used for logout super admin
 */

const tutorsList = async () => {

    const projection = { emailPreferences: 0, password: 0, failedLoginAttempts: 0, isAgreeWithTNC: 0, token: 0, isOtpVerified: 0, avalaibleDates: 0 }

    let tutorsList = await Tutor.find({ loginPhase: 2 }, projection).sort({ createdAt: -1 });

    return tutorsList;

};

module.exports = {
    tutorsDetails,
    rejectRequest,
    tutorsList,
    acceptRequest,
};