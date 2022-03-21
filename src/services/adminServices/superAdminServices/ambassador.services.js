const Admin = require("../../../models/admins.model");
const Ambassador = require("../../../models/ambassador.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../../../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../../../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const { generateVerificationToken, generateOtpData, generateJWTToken } = require("../../../helper/common");
const emailService = require("../../email.services");
const jwt = require("jsonwebtoken");


const sendVerificationEmail = ({
    user
}) => {
    emailService
        .sendVerificationEmail({ user })
        .then((r) => logger.info("Otp sent on email successfully", r))
        .catch((err) =>
            logger.error("failure in sending the otp on email", err)
        );
};


/**
 * @description - This controller is used for get ambassador details
 */

const ambassadorDetails = async ({ body }) => {

    let ambassadorDetails = await Ambassador.findOne({ _id: body.id }, {
    });

    return { ambassadorDetails }
};


/**
 * @description - This controller is used for accept ambassador request
 */

const rejectRequest = async ({ body }) => {

    let update = await Ambassador.updateOne({ _id: body.id }, {
        isProfileVerified: 2,
    });

    return;
};


/**
 * @description - This controller is used for accept ambassador request
 */

const acceptRequest = async ({ body }) => {
    let ambassadorInfo = await Ambassador.findOne({ _id: body.id });
    await sendVerificationEmail({ user: ambassadorInfo })
    let update = await Ambassador.updateOne({ _id: body.id }, {
        isProfileVerified: 1,
        otpVerificationTime: new Date()

    });
    return;
};


/**
 * @description - This controller is used for logout super admin
 */

const ambassadorsList = async () => {
    const projection = { emailPreferences: 0, password: 0, failedLoginAttempts: 0, isAgreeWithTNC: 0, token: 0, isOtpVerified: 0 }
    let ambassadorList = await Ambassador.find({}, projection).sort({ createdAt: -1 });

    return ambassadorList;
};




module.exports = {
    ambassadorDetails,
    rejectRequest,
    ambassadorsList,
    acceptRequest
};