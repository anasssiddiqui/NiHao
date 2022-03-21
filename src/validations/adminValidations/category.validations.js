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

const createCategoryValidations = [
    body("name")
        .exists()
        .withMessage("name is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                logger.error("error in the create user validation ", {
                    error: errors.array(),
                });
                throw new ValidationFailure(`Validation Error`, errors.array());
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

module.exports = {
    createCategoryValidations,
};