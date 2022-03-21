const ContactUs = require("../models/contactUs.model");
const WebSurvey = require("../models/webSurvey.model");


/**
 * @description - this function is for activate for enable or disable rating
 * @param {string} body - { category },{ scale } | from client side
 * @param {string} user - contain admin data | from jwt
 * @return {} - empty
 */

 const categoryOptions = async ({ body, user }) => {
    const { category, scale } = body

    const options = await WebSurvey.findOne(
        {
            category: category,
            "options.scale":scale
        },{
            "options.option.$":1
        }
    )
    return { options }
}

const contactUs = async ({ body }) => {

    var create = await ContactUs.create({
        email: body.email,
        subject: body.createsubject,
        message:body.message
    })

    return
}


module.exports = {
    categoryOptions,
contactUs
}