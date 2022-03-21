
const Categorys = require("../../../models/categorys.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../../../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../../../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const { generateVerificationToken, generateOtpData, generateJWTToken } = require("../../../helper/common");
const emailService = require("../../email.services");
const jwt = require("jsonwebtoken");



/**
 * @description - This controller is used for create new Category
 */


const createCategory = async ({ body }) => {


    var saveObject = {
        name: body.name,
    }

    let user = await new Categorys(saveObject);
    user.save()
    return;
};


/**
 * @description - This controller is used for  courses listing 
 */

const categorylisting = async () => {
    var projection = { name: 1, }
    const findall = await Categorys.find({}, projection)

    return findall
};

/**
 * @description - This controller is used for  courses listing 
 */

 const deleteCategory = async () => {
    var projection = { name: 1, }
    const findall = await Categorys.find({}, projection)

    return findall
};

module.exports = {
    deleteCategory,
    createCategory,
    categorylisting
};