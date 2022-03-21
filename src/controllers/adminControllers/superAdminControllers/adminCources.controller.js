const courcesServices = require("../../../services/adminServices/superAdminServices/cources.services");
const { BadRequest } = require("../../../utility/apiError");
const { SuccessResponse } = require("../../../utility/apiResponse");
const { env } = require("../../../utility/config");
const { getDtoObject } = require("../../../helper/common");

//Controller Functions

/**
 * @description - This controller is used for edit course
 */

 const updateCourse = async (req, res, next) => {
    await courcesServices.updateCourse({ body: req.body });
    return new SuccessResponse("Update course successfully").send(res);
};

/**
 * @description - This controller is used for add new cources
 */

const deleteCourse = async (req, res, next) => {
    await courcesServices.deleteCourse({ body: req.body });
    return new SuccessResponse("Remove course successfully").send(res);
};

/**
 * @description - This controller is used for add new cources
 */

const createCources = async (req, res, next) => {
    const createCourse = await courcesServices.createCources({ body: req.body });
    return new SuccessResponse("Add courses successfully", createCourse).send(res);
};


/**
 * @description - This controller is used for add new courses
 */

const CourcesListing = async (req, res, next) => {
    const findall = await courcesServices.courceslisting();
    return new SuccessResponse("Fetched courses listing successfully", findall).send(res);
};


/**
 * @description - This controller is used for add new cources
 */

const CourceDetails = async (req, res, next) => {
    const findall = await courcesServices.courceDetails({ body: req.body });
    return new SuccessResponse("Fetched courses details successfully", findall).send(res);
};

module.exports = {
    updateCourse,
    deleteCourse,
    CourceDetails,
    createCources,
    CourcesListing
};