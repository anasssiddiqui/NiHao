const surveyServices = require("../../../services/adminServices/superAdminServices/survey.services");
const { BadRequest } = require("../../../utility/apiError");
const { SuccessResponse } = require("../../../utility/apiResponse");
const { env } = require("../../../utility/config");
const { getDtoObject } = require("../../../helper/common");

//Controller Functions




/**
 * @description - This controller is used for change enable or disable in boolean ------|
 *                                                                                      |-
 */

const addSurveyOption = async (req, res,) => {
    await surveyServices.addSurveyOption({ body: req.body, user: req.user });
    return res.send("add survey option  successfully")
};


/**
 * @description - This controller is used for change enable or disable in boolean ------|
 *                                                                                      |-
 */

const deleteSurveyOption = async (req, res,) => {
    await surveyServices.deleteSurveyOption({ body: req.body, user: req.user });
    return res.send("delete option successfully")
};


/**
 * @description - This controller is used for change enable or disable in boolean ------|
 *                                                                                      |-
 */

const createWebSurvey = async (req, res,) => {
    await surveyServices.createWebSurvey({ body: req.body, user: req.user });
    return res.send("create web survey successfully")
};

/**
 * @description - This controller is used for change enable or disable in boolean
 */

const ratingsOptions = async (req, res,) => {
    const { findRatings } = await surveyServices.ratingsOptions({ body: req.body, user: req.user });
    return new SuccessResponse("Get data successfully", { findRatings }).send(res);
};


/**
 * @description - This controller is used for change enable or disable in boolean
 */

const ratingsIsEnable = async (req, res,) => {
    const createOption = await surveyServices.ratingsIsEnable({ body: req.body, user: req.user });
    return res.send("Change status successfully")
};

/**
 * @description - This controller is used for add new options in ratings
 */

const deleteRatingsOptions = async (req, res,) => {
    const createOption = await surveyServices.deleteRatingsOptions({ body: req.body, user: req.user });
    return res.send("Delete option successfully")
};

/**
 * @description - This controller is used for delete ratings
 */

const addRatingsOptions = async (req, res, next) => {
    const createOption = await surveyServices.addRatingsOptions({ body: req.body, user: req.user });
    return res.send("Update survey successfully")
};

/**
 * @description - This controller is used for delete ratings
 */

const ratingsActivation = async (req, res, next) => {
    const createOption = await surveyServices.ratingsActivation({ body: req.body, user: req.user });
    return res.send("Update survey successfully")
};



module.exports = {
    addSurveyOption,
    deleteSurveyOption,
    createWebSurvey,
    ratingsOptions,
    ratingsActivation,
    deleteRatingsOptions,
    addRatingsOptions,
    ratingsIsEnable
};