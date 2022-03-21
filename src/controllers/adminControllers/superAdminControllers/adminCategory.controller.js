const categoryServices = require("../../../services/adminServices/superAdminServices/category.services");
const { BadRequest } = require("../../../utility/apiError");
const { SuccessResponse } = require("../../../utility/apiResponse");
const { env } = require("../../../utility/config");
const { getDtoObject } = require("../../../helper/common");

//Controller Functions

/**
 * @description - This controller is used for delete Category
 */

 const deleteCategory = async (req, res, next) => {
    const createCategory = await categoryServices.deleteCategory({ body: req.body });
    return res.send("Delete category successfully")
};


/**
 * @description - This controller is used for add Category
 */

const createCategory = async (req, res, next) => {
    const createCourse = await categoryServices.createCategory({ body: req.body });
    return res.send("Create category successfully")
};


/**
 * @description - This controller is used for add new cources
 */

const CategoryListing = async (req, res, next) => {
    const findall = await categoryServices.categorylisting();
    return new SuccessResponse("Fetched category listing  successfully", findall).send(res);
};






module.exports = {
    deleteCategory,
    createCategory,
    CategoryListing
};