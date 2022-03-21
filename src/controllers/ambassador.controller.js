const ambassadorService = require("../services/ambassador.services");
const { BadRequest } = require("../utility/apiError");
const { SuccessResponse } = require("../utility/apiResponse");
const fs = require("fs");
const multer = require("multer");

//Controller Functions

/**
 * @description - This controller is used for create update bankDetails
 */

const updateBankDetails = async (req, res, next) => {
    await ambassadorService.updateBankDetails({ user: req.user, body: req.body });
    return res.send("Add bank details sucessfully")
};

/**
 * @description - This controller is used for tutor account
 */

const dashboardListing = async (req, res, next) => {
    const { userDetails } = await ambassadorService.dashboardListing({ user: req.user, body: req.body })
    return new SuccessResponse("Get listing sucessfully", { userDetails }).send(res);
};

/**
 * @description - This controller is used for change password
 */

const changePassword = async (req, res, next) => {
    await ambassadorService.changePassword({ body: req.body, userId: req.user._id })
    return res.send("Password changed successfully")
};

/**
 * @description - This controller is used for get accountInfo
 */

const addAdditionalInfo = async (req, res, next) => {
    req.body.loginPhase = 2
    let { user } = await ambassadorService.addAdditionalInfo({ userId: req.user._id, body: req.body });
    return new SuccessResponse("Account info retrieved successfully", { user }).send(res);
};

const createProfile = async (req, res, next) => {
    let user = await ambassadorService.createProfile({ userId: req.user._id, body: req.body });
    return new SuccessResponse("Account info retrieved successfully", req.user).send(res);
};

const getAccountInfo = async (req, res, next) => {
    return new SuccessResponse("Account info retrieved successfully", req.user).send(res);
};


module.exports = {
    updateBankDetails,
    dashboardListing,
    addAdditionalInfo,
    createProfile,
    getAccountInfo,
    changePassword
};