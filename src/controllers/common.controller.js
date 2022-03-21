const commonService = require("../services/common.services");
const { BadRequest } = require("../utility/apiError");
const { SuccessResponse } = require("../utility/apiResponse");
const { env } = require("../utility/config");
const { getDtoObject } = require("../helper/common");
var languages = require('language-list')();
var timezones = require('timezones-list');

// let Country = require('country-state-city').Country;
// let State = require('country-state-city').State;
// var City = require('country-state-city').City;
let Country = require('country-state-city');


/**
 * @description - This controller is used for change enable or disable in boolean ------
 *                                                                                      
 */

const categoryOptions = async (req, res,) => {
    const { options } = await commonService.categoryOptions({ body: req.body, user: req.user });
    return new SuccessResponse("Get data successfully", { options }).send(res);
};


/**
 * @description - This controller is used for Get languages
 */

const getLangTimes = async (req, res, next) => {
    var allLanguages = languages.getData()
    var allTimeZonessss = timezones
    var finalResponse = {
        allLanguages: allLanguages,
        allTimeZonessss: allTimeZonessss,
        countrys: Country.Country.getAllCountries()
    }
    return new SuccessResponse("Get details successfully", finalResponse).send(res);
};


const contactUs = async (req, res,) => {
    await commonService.contactUs({ body: req.body });
    return new SuccessResponse("Send details successfully").send(res);
};


module.exports = {
    categoryOptions,
    getLangTimes,
    contactUs
}