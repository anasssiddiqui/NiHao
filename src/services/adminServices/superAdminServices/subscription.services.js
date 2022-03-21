
const Subscription = require("../../../models/subscription.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../../../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../../../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const { generateVerificationToken, generateOtpData, generateJWTToken } = require("../../../helper/common");
const emailService = require("../../email.services");
const jwt = require("jsonwebtoken");
// services files



/**
 * @description - This controller is used for create new subscription plan
 */


const updateSubscription = async ({ body }) => {

    const find = await Subscription.findOne({
        subscriptionType: body.subscriptionType,
        duration: {
            month: body.month,
        },
        minutes: body.minutes,
        days: body.days,
    })

    if (find) throw new BadRequest("Hi you already added this subscription plan please change plan");

    var finalAmount = Number((body.discountPercentage)) / 100 * Number((body.amount))
    var condition = { _id: body.id }
    var saveObject = {
        image: body.image,
        subscriptionType: body.subscriptionType,
        planName: body.planName,
        currency: body.currency,
        duration: {
            month: body.month,
            discount: body.discountPercentage,
        },
        minutes: body.minutes,
        days: body.days,
        amount: {
            planAmount: body.amount,
            afterDiscount: finalAmount
        },
        description: body.description,
    }

    await Subscription.updateOne(condition, saveObject)

    return;
};


/**
 * @description - This controller is used for create new subscription plan
 */


const createSubscription = async ({ body }) => {

    const find = await Subscription.findOne({
        subscriptionType: body.subscriptionType,
        duration: {
            month: body.month,
        },
        minutes: body.minutes,
        days: body.days,

    })
    if (find) throw new BadRequest("Hi you already added this subscription plan please change plan");

    var finalAmount = Number((body.discountPercentage)) / 100 * Number((body.amount))
    console.log(finalAmount)
    var saveObject = {
        image: body.image,
        subscriptionType: body.subscriptionType,
        planName: body.planName,
        currency: body.currency,
        duration: {
            month: body.month,
            discount: body.discountPercentage,
        },
        minutes: body.minutes,
        days: body.days,
        amount: {
            planAmount: body.amount,
            afterDiscount: finalAmount
        },
        description: body.description,
    }

    let user = await new Subscription(saveObject);
    user.save()
    return;
};

/**
 * @description - This controller is used for delete subscription plan with id
 */

const deleteSubscription = async ({ body }) => {

    await Subscription.deleteOne({ _id: body.id });

    return;
};

/**
 * @description - This controller is used for get subscription plan list
 */

const subscriptionsList = async ({ body }) => {

    const subscription = await Subscription.find({});

    return { subscription }
};


module.exports = {
    subscriptionsList,
    updateSubscription,
    deleteSubscription,
    createSubscription,
};