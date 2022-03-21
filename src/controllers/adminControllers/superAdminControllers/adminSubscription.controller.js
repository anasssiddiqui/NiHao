const subscriptionServices = require("../../../services/adminServices/superAdminServices/subscription.services");

const { BadRequest } = require("../../../utility/apiError");
const { SuccessResponse } = require("../../../utility/apiResponse");
const { env } = require("../../../utility/config");
const { getDtoObject } = require("../../../helper/common");

//Controller Functions


/**
 * @description - This controller is used for edit subscription plan
 */

const subscriptionsList = async (req, res, next) => {
    const { subscription } = await subscriptionServices.subscriptionsList({ body: req.body });
    return new SuccessResponse("Get subscription plans successfully", { subscription }).send(res);
};


/**
 * @description - This controller is used for edit subscription plan
 */

const updateSubscription = async (req, res, next) => {
    await subscriptionServices.updateSubscription({ body: req.body });
    return res.send("Update subscription successfully")
};


/**
 * @description - This controller is used for create new subscription plan
 */

const createSubscription = async (req, res, next) => {
    await subscriptionServices.createSubscription({ body: req.body });
    return res.send("Create subscription successfully")
};


/**
 * @description - This controller is used for delete subscription plan
 */

const deleteSubscription = async (req, res, next) => {
    await subscriptionServices.deleteSubscription({ body: req.body });
    return res.send("Delete subscription successfully")
};



module.exports = {
    subscriptionsList,
    updateSubscription,
    deleteSubscription,
    createSubscription,
};