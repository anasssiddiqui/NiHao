
const Courses = require("../../../models/courses.model");
const Syllabus = require("../../../models/syllabus.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../../../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../../../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const emailService = require("../../email.services");
const jwt = require("jsonwebtoken");


/**
 * @description - This controller is used for edit course
 */

const updateCourse = async ({ body }) => {
    var id = { _id: ObjectId(body.id) }
    const updateCourse = await Courses.updateOne({
        _id: body.id
    }, {
        $set: {
            shortDescription: body.shortDescription,
            courseFor: body.courseFor,
            name: body.name,
            category: body.category,
            schoolName: body.schoolName,
            schoolId: body.schoolId,
            schoolCountry: body.schoolCountry,
            experienceLevel: body.experienceLevel,
            whyTakeThisCourse: body.whyTakeThisCourse,
            ableToDo: body.ableToDo,
            preRequisites: body.preRequisites,
            syllabus: body.syllabus,
            videos: body.videos,
            coverImage: body.coverImage
        }
    })


    return
};


/**
 * @description - This controller is used for get course details 
 */

const deleteCourse = async ({ body }) => {
    var id = { _id: ObjectId(body.id) }
    const removeSyllabus = await Syllabus.remove({
        courseId: body.id
    })
    const remove = await Courses.remove(id)

    return
};


/**
 * @description - This controller is used for get course details 
 */

const courceDetails = async ({ body }) => {
    var filter = { _id: ObjectId(body.id) }
    var findall = await Courses.aggregate([
        {
            $match: filter
        },
        {
            $lookup: {
                from: "syllabuses",
                localField: "_id",
                foreignField: "courseId",
                as: "syllabus",
            },
        },
        {
            $lookup: {
                from: "categorys",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: '$category' },
    ])


    findall = findall[0]

    return findall
};


/**
 * @description - This controller is used for create new course
 */


const createCources = async ({ body }) => {

    var saveObject = {
        shortDescription: body.shortDescription,
        courseFor: body.courseFor,
        name: body.name,
        categoryId: ObjectId(body.categoryId),
        schoolName: body.schoolName,
        schoolId: body.schoolId,
        schoolCountry: body.schoolCountry,
        experienceLevel: body.experienceLevel,
        whyTakeThisCourse: body.whyTakeThisCourse,
        ableToDo: body.ableToDo,
        preRequisites: body.preRequisites,
        syllabus: body.syllabus,
        videos: body.videos,
        coverImage: body.coverImage
    }

    let user = await new Courses(saveObject);
    user.save()
    return;
};


/**
 * @description - This controller is used for  courses listing 
 */

const courceslisting = async () => {
    const findall = await Courses.aggregate([
        {
            $lookup: {
                from: "syllabuses",
                localField: "_id",
                foreignField: "courseId",
                as: "syllabus",
            },
        },
        { $sort: { createdAt: -1 } },
        { $project: { syllabusCount: { $size: "$syllabus" }, name: 1, coverImage: 1, experienceLevel: 1, whyTakeThisCourse: 1, courseFor: 1, shortDescription: 1 } }
    ])

    return findall
};

module.exports = {
    updateCourse,
    deleteCourse,
    courceDetails,
    createCources,
    courceslisting
};