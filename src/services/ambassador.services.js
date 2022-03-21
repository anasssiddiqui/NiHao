const Ambassador = require("../models/ambassador.model");
const Tutor = require("../models/tutor.model");
const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const { filterDate, humanDate } = require("../helper/common");
const emailService = require("./email.services");
const jwt = require("jsonwebtoken");


/**
 * @description - This function is used for create update bank details
 */

const updateBankDetails = async ({ user, body }) => {
    const update = await Ambassador.updateOne({
        _id: user._id
    }, {
        $set: {
            bankDetails: body.bankDetails
        }

    })

    return
};



/**
 * @description - This controller is used for get dashboard listing  
 */

const dashboardListing = async ({ user, body }) => {
    var userDetails = []


    var { dateFormat } = humanDate({})
    var condition = {
        loginPhase: 2,
        isProfileVerified: 1,
        "ambassdorRef.ambassdorCode": user.ambassadorId,
    }
    if (body.fromDate !== "" && body.fromDate == "") {
        var object1 = {
            createdAt: {
                $gte: new Date(body.fromDate),
                $lt: new Date(dateFormat)
            }
        }
        condition = Object.assign(condition, object1);
    }
    if (body.toDate !== '' && body.fromDate !== '') {
        var object2 = {
            createdAt: {
                $gte: new Date(body.fromDate),
                $lt: new Date(body.toDate)
            }
        }
        condition = Object.assign(condition, object2);
    }
    if (user.ambassadorType == "tutorBroker") {
        userDetails = await Tutor.find(condition)
        return { userDetails }
    }

    return [userDetails]

};

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
 * @description - This fucntion is used to signup as student
 */
const addAccountFields = (user, body) => {
    let detailFields = ["firstName", "lastName", 'userName', "sharedLinks", "howPromote", "loginPhase", "ambassadorId", "ambassadorType"];
    detailFields.map((key) => {
        if (body[key]) {
            user[key] = body[key];
        }
    });
    return user;
};


const addAdditionalInfo = async ({ userId, body }) => {
    const condition = { _id: userId };
    const userNameCheck = { userName: body.userName };

    let primaryConditions = await Ambassador.findOne(userNameCheck)

    if (primaryConditions) throw new BadRequest("This username is already exist")
    if (body.ambassadorType == 'tutorBroker') {
        body.ambassadorId = "#BRT" + (Math.random() + 1).toString(30).substring(5).toUpperCase();
    } else {
        body.ambassadorId = "#BRS" + (Math.random() + 1).toString(30).substring(5).toUpperCase();
    }
    let user = await Ambassador.findOne(condition)
    user = addAccountFields(user, body)

    await user.save()

    return { user }
};

const createProfile = async ({ userId, body }) => {
    const condition = { _id: userId };

    let update = await Ambassador.updateOne(condition, {
        $set: {
            passportName: body.passportName,
            mobile: body.mobile,
            email: body.email,
            ambassadorId: body.ambassadorId,
            country: body.country,
            language: body.language,
            gender: body.gender,
            dob: body.dob,
            loginPhase: 3,
            profilePic: body.image,
            ambassadorType: body.ambassadorType,
            address: {
                city: body.city,
                country: body.country
            }
        }

    });
    await emailService.requestSubmitMail({ email: body.email })
    return
};

module.exports = {
    updateBankDetails,
    dashboardListing,
    addAdditionalInfo,
    createProfile,
    changePassword

};