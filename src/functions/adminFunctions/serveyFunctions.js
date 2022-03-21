
/**
 * @description - This function is used to get condition basis on ratings value  
 * @param {string} body  - {ratings} , {status}  params comes from client side
 * @returns {string} condition  - return mongodb column columns syntax  
 */

const ratingsIsEnablefunction = ({ body }) => {
    const { rating, status } = body
    if (rating == "oneStar") {
        var condition = { "ratingsSurvey.oneStar.enable": status }
    } else if (rating == "twoStars") {
        var condition = { "ratingsSurvey.twoStars.enable": status }
    } else if (rating == "threeStars") {
        var condition = { "ratingsSurvey.threeStars.enable": status }
    } else if (rating == "fourStars") {
        var condition = { "ratingsSurvey.fourStars.enable": status }
    } else {
        var condition = { "ratingsSurvey.fiveStars.enable": status }
    }
    return { condition }
}


/**
 * @description - This function is used to get condition basis on ratings value  
 * @param {string} body  - ratings , option params comes from client side
 * @returns {string} condition  - return mongodb columns syntax  
 */

const ratingsActivationFunction = ({ body }) => {
    const { rating, status } = body
    if (rating == "oneStar") {
        var condition = { "ratingsSurvey.oneStar.activationEnable": status }
    } else if (rating == "twoStars") {
        var condition = { "ratingsSurvey.twoStars.activationEnable": status }
    } else if (rating == "threeStars") {
        var condition = { "ratingsSurvey.threeStars.activationEnable": status }
    } else if (rating == "fourStars") {
        var condition = { "ratingsSurvey.fourStars.activationEnable": status }
    } else {
        var condition = { "ratingsSurvey.fiveStars.activationEnable": status }
    }
    return { condition }
}

/**
 * @description - This function is used to get condition basis on ratings value  
 * @param {string} body  - ratings , option params comes from client side
 * @returns {string} condition  - return mongodb columns syntax  
 */

const deleteRatingsOptionsFunction = ({ body }) => {
    const { rating, option } = body
    if (rating == "oneStar") {
        var condition = { "ratingsSurvey.oneStar.params": option }
    } else if (rating == "twoStars") {
        var condition = { "ratingsSurvey.twoStars.params": option }
    } else if (rating == "threeStars") {
        var condition = { "ratingsSurvey.threeStars.params": option }
    } else if (rating == "fourStars") {
        var condition = { "ratingsSurvey.fourStars.params": option }
    } else {
        var condition = { "ratingsSurvey.fiveStars.params": option }
    }
    return { condition }
}

/**
 * @description - This function is used to get condition basis on ratings value  
 * @param {string} body  - ratings , option params comes from client side
 * @returns {string} condition  - return mongodb columns syntax  
 */

const addRatingsOptionsFunction = ({ body }) => {
    const { rating, option } = body
    if (rating == "oneStar") {
        var condition = { "ratingsSurvey.oneStar.params": option }
    } else if (rating == "twoStars") {
        var condition = { "ratingsSurvey.twoStars.params": option }
    } else if (rating == "threeStars") {
        var condition = { "ratingsSurvey.threeStars.params": option }
    } else if (rating == "fourStars") {
        var condition = { "ratingsSurvey.fourStars.params": option }
    } else {
        var condition = { "ratingsSurvey.fiveStars.params": option }
    }
    return { condition }
}

module.exports = {
    ratingsIsEnablefunction,
    ratingsActivationFunction,
    deleteRatingsOptionsFunction,
    addRatingsOptionsFunction
}