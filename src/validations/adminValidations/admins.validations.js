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
 * @param {string} email - email type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

 const deleteSyllabusValidations = [
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

const syllabusListValidation = [
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

const addSyllabusValidation = [
    body("courseId",)
        .exists()
        .withMessage("courseId is required."),
    body("categoryId")
        .exists()
        .withMessage("categoryId is required."),
    body("title",)
        .exists()
        .withMessage("title is required."),
    body("description",)
        .exists()
        .withMessage("description is required."),
    body("file")
        .exists()
        .withMessage("file is required."),
            
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
    deleteSyllabusValidations,
    syllabusListValidation,
    addSyllabusValidation
};