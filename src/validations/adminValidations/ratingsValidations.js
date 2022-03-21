const { ValidationFailure } = require("../../utility/apiError");
const {
    check,
    header,
    body,
    query,
    validationResult,
} = require("express-validator");


/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} category - ratings type: String
 * @param {Boolean} id - option _id
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const categoryOptionsValidations = [
    body("category")
        .notEmpty().withMessage("category :- this field cannot be empty.")
        .isIn(['prices/payments', 'connection', 'teachers', 'website', 'support', 'materials', 'other']).withMessage('category must be => prices/payments , connection , teachers , website ,support ,materials ,other'),
    body("scale")
        .notEmpty().withMessage("scale :- this field cannot be empty.").isIn(['0-6', '7-8', '9-10']).withMessage('scale must be => 0-6, 7-8, 9-10'),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];



/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} category - ratings type: String
 * @param {Boolean} id - option _id
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const addSurveyOptionValidations = [
    body("category")
        .notEmpty().withMessage("category :- this field cannot be empty.")
        .isIn(['prices/payments', 'connection', 'teachers', 'website', 'support', 'materials', 'other']).withMessage('category must be => prices/payments , connection , teachers , website ,support ,materials ,other'),
    body("option")
        .notEmpty().withMessage("option :- this field cannot be empty."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} category - ratings type: String
 * @param {Boolean} id - option _id
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const deleteSurveyOptionValidations = [
    body("category")
        .notEmpty().withMessage("category :- this field cannot be empty.")
        .isIn(['prices/payments', 'connection', 'teachers', 'website', 'support', 'materials', 'other']).withMessage('category must be => prices/payments , connection , teachers , website ,support ,materials ,other'),
    body("id")
        .notEmpty().withMessage("id :- this field cannot be empty."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} rating - ratings type: String
 * @param {string} status - status type: Boolean
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const createWebSurveyValidations = [
    body("category")
        .notEmpty().withMessage("category :- this field cannot be empty.")
        .isIn(['prices/payments', 'connection', 'teachers', 'website', 'support', 'materials', 'other']).withMessage('category must be => prices/payments , connection , teachers , website ,support ,materials ,other'),
    body("options")
        .notEmpty().withMessage("options :- this field cannot be empty."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];



/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} rating - ratings type: String
 * @param {string} status - status type: Boolean
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const ratingsIsEnableValidations = [
    body("rating")
        .notEmpty().withMessage("rating :- this field cannot be empty.")
        .isIn(['oneStar', 'twoStars', 'threeStars', 'fourStars', 'fiveStars']).withMessage('rating must be oneStar,twoStars,threeStars,fourStars,fiveStars'),
    body("status")
        .notEmpty().withMessage("status :- this field cannot be empty.")
        .isIn(['true', 'false',]).withMessage('status must be true | false'),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];



/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} rating - ratings type: String
 * @param {string} option - status type: string
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const addRatingsOptionsValidations = [
    body("rating")
        .notEmpty().withMessage("rating :- this field cannot be empty.")
        .isIn(['oneStar', 'twoStars', 'threeStars', 'fourStars', 'fiveStars']).withMessage('rating must be oneStar,twoStars,threeStars,fourStars,fiveStars'),
    body("option")
        .notEmpty().withMessage("option :- this field cannot be empty."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} rating - ratings type: String
 * @param {string} option - status type: string
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const deleteRatingsOptionsValidations = [
    body("rating")
        .notEmpty().withMessage("rating :- this field cannot be empty.")
        .isIn(['oneStar', 'twoStars', 'threeStars', 'fourStars', 'fiveStars']).withMessage('rating must be oneStar,twoStars,threeStars,fourStars,fiveStars'),
    body("option")
        .notEmpty().withMessage("option :- this field cannot be empty."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} rating - ratings type: String
 * @param {string} status - status type: Boolean
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const ratingsActivationValidations = [
    body("rating")
        .notEmpty().withMessage("rating :- this field cannot be empty.")
        .isIn(['oneStar', 'twoStars', 'threeStars', 'fourStars', 'fiveStars']).withMessage('rating must be oneStar,twoStars,threeStars,fourStars,fiveStars'),
    body("status")
        .notEmpty().withMessage("status :- this field cannot be empty.")
        .isIn(['true', 'false',]).withMessage('status must be true | false'),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


module.exports = {
    categoryOptionsValidations,
    addSurveyOptionValidations,
    deleteSurveyOptionValidations,
    createWebSurveyValidations,
    ratingsIsEnableValidations,
    addRatingsOptionsValidations,
    ratingsActivationValidations,
    deleteRatingsOptionsValidations
};