
const Admin = require("../../../models/admins.model");
const WebSurvey = require("../../../models/webSurvey.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../../../utility/apiError");
const adminFunctions = require("../../../functions/adminFunctions/serveyFunctions")



/**
 * @description - this function is for activate for enable or disable rating
 * @param {string} body - { option },{ category } | from client side
 * @param {string} user - contain admin data | from jwt
 * @return {} - empty
 */

const addSurveyOption = async ({ body, user }) => {
    const { category, option } = body

    await WebSurvey.updateOne(
        { category: category },
        {
            $push: {
                "options": option
            }
        }
    )

    return
}


/**
 * @description - this function is for activate for enable or disable rating
 * @param {string} body - { id },{ category } | from client side
 * @param {string} user - contain admin data | from jwt
 * @return {} - empty
 */

const deleteSurveyOption = async ({ body, user }) => {
    const { category, id } = body

    await WebSurvey.updateOne(
        { 'category': category },
        { $pull: { options: { _id: ObjectId(id) } } },
    );

    return
}


/**
 * @description - this function is for activate for enable or disable rating
 * @param {string} body - {ratings} , {status} | from client side
 * @param {string} user - contain admin data | from jwt
 * @return {} - empty
 */

const createWebSurvey = async ({ body, user }) => {
    const create = await WebSurvey.create({
        category: body.category,
        options: body.options
    })
    return;
};

/**
 * @description - this function is for activate for enable or disable rating
 * @param {string} body - {ratings} , {status} | from client side
 * @param {string} user - contain admin data | from jwt
 * @return {object} - ratings options
 */

const ratingsOptions = async ({ body, user }) => {
    const findRatings = await Admin.findOne({}, { ratingsSurvey: 1, _id: 0 })
    return { findRatings };
};




/**
 * @description - this function is for activate for enable or disable rating
 * @param {string} body - ratings , status params comes from client side
 * @param {string} user - contain admin data 
 * @return {} - empty
 */

const ratingsIsEnable = async ({ body, user }) => {
    var { condition } = adminFunctions.ratingsIsEnablefunction({ body })// check condition
    await Admin.updateOne({ _id: user._id }, {
        $set: condition
    })
    return;
};



/**
 * @description - this function is for activate or deactivate ratings
 * @param {string} body - ratings , option params comes from client side
 * @param {string} user - contains admin data 
 * @return {} - empty
 */
const ratingsActivation = async ({ body, user }) => {
    var { condition } = adminFunctions.ratingsActivationFunction({ body })// check condition
    await Admin.updateOne({ _id: user._id }, {
        $set: condition
    })
    return;
};



/**
 * @description - this function is for delete option in ratings
 * @param {string} body - ratings , option params comes from client side
 * @param {string} user - contains admin data 
 * @return {} - empty
 */
const deleteRatingsOptions = async ({ body, user }) => {
    var { condition } = adminFunctions.deleteRatingsOptionsFunction({ body })// check condition
    await Admin.updateOne({ _id: user._id }, { $pull: condition })
    return;
};



/**
 * @description - this function is for create update lesson  basis of _id
 * @param {string} body - ratings , option params comes from client side
 * @param {string} user - contains admin data 
 * @return {}  - empty
 */

const addRatingsOptions = async ({ body, user }) => {
    var { condition } = adminFunctions.addRatingsOptionsFunction({ body })// check condition
    await Admin.updateOne({ _id: user._id }, { $push: condition })
    return;
};




module.exports = {

    addSurveyOption,
    deleteSurveyOption,
    createWebSurvey,
    ratingsOptions,
    ratingsIsEnable,
    ratingsActivation,
    addRatingsOptions,
    deleteRatingsOptions
};