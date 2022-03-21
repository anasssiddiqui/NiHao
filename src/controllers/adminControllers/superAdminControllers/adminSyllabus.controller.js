const syllabusServices = require("../../../services/adminServices/superAdminServices/syllabus.services");
const { BadRequest } = require("../../../utility/apiError");
const { SuccessResponse } = require("../../../utility/apiResponse");
const { env } = require("../../../utility/config");
const { getDtoObject } = require("../../../helper/common");

//Controller Functions

/**
 * @description - This controller is used for delete lesson
 */

const updateSyllabus = async (req, res, next) => {
    const createLesson = await syllabusServices.updateSyllabus({ body: req.body, files: req.file });
    return res.send("Update syllabus successfully")
};

/**
 * @description - This controller is used for delete lesson
 */

const deleteSyllabus = async (req, res, next) => {
    const createLesson = await syllabusServices.deleteSyllabus({ body: req.body, files: req.file });
    return new SuccessResponse("Delete syllabus successfully", createLesson).send(res);
};

/**
 * @description - This controller is used for add new cources
 */

const createSyllabus = async (req, res, next) => {
    const createLesson = await syllabusServices.createSyllabus({ body: req.body });
    return new SuccessResponse("Add syllabus successfully", createLesson).send(res);
};


/**
 * @description - This controller is used for lessons listing
 */

const syllabuslisting = async (req, res, next) => {
    const findall = await syllabusServices.syllabuslisting({ body: req.body });
    return new SuccessResponse("Fetched syllabus listing  successfully", findall).send(res);
};





module.exports = {
    updateSyllabus,
    deleteSyllabus,
    createSyllabus,
    syllabuslisting,
};