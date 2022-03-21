
const syllabus = require("../../../models/syllabus.model");

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
 * @description - this function is for create update lesson  basis of _id
 */

const updateSyllabus = async ({ body, files }) => {


    var saveObject = {
        categoryId: body.categoryId,
        title: body.title,
        description: body.description,
        file: body.file
    }
    await syllabus.updateOne({ _id: body.id }, { $set: saveObject })

    return;
};


/**
 * @description - this function is for get lesson listing  basis of course id
 */

const deleteSyllabus = async ({ body }) => {

    const deleteSyllabus = await syllabus.remove({ _id: body.id })
    return

};


/**
 * @description - this function is for create lesson  basis of course id
 */

const createSyllabus = async ({ body, files }) => {


    var saveObject = {
        categoryId: body.categoryId,
        courseId: body.courseId,
        title: body.title,
        description: body.description,
        file: body.file
    }


    let user = await new syllabus(saveObject);

    user.save()

    return;
};

/**
 * @description - this function is for get lesson listing basis of course id
 */

const syllabuslisting = async ({ body }) => {

    const findall = await syllabus.find({ courseId: body.id })
    return findall
};


module.exports = {
    updateSyllabus,
    deleteSyllabus,
    createSyllabus,
    syllabuslisting
};