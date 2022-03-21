const { ValidationFailure } = require("../../utility/apiError");
const {
    check,
    header,
    body,
    query,
    validationResult,
} = require("express-validator");

/**
 * @description -  update Validations This Middleware validates the body of the Request
 * @param {string} id - id type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const updateCourseValidations = [
    body("id")
        .exists()
        .withMessage("id is required."),
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
 * @description -  deleteCourse Validations This Middleware validates the body of the Request
 * @param {string} id - email type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const createCourcesValidations = [
    body("courseFor")
        .notEmpty()
        .withMessage("courseFor is required."),
    body("name")
        .notEmpty()
        .withMessage("name is required."),
    body("categoryId")
        .notEmpty()
        .withMessage("categoryId is required."),
    body("experienceLevel")
        .notEmpty()
        .withMessage("experienceLevel is required."),
    body("whyTakeThisCourse")
        .notEmpty()
        .withMessage("whyTakeThisCourse is required."),
    body("preRequisites")
        .notEmpty()
        .withMessage("preRequisites is required."),
    body("coverImage")
        .notEmpty()
        .withMessage("coverImage is required."),
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
 * @description -  deleteCourse Validations This Middleware validates the body of the Request
 * @param {string} id - email type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const CourceDetailsValidations = [
    body("id")
        .exists()
        .withMessage("id is required."),
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
 * @description -  deleteCourse Validations This Middleware validates the body of the Request
 * @param {string} id - email type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const deleteCourseValidations = [
    body("id")
        .exists()
        .withMessage("id is required."),
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
    updateCourseValidations,
    createCourcesValidations,
    CourceDetailsValidations,
    deleteCourseValidations,
};