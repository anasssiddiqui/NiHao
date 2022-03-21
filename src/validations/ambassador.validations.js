const { ValidationFailure } = require("../utility/apiError");
const {
    check,
    header,
    body,
    query,
    validationResult,
} = require("express-validator");



/**
 * @description - Update account Validations This Middleware validates the body of the Request
 * @param {string} firstName - firstName type: String
 * @param {string} lastName - lastName type: String
 * @param {string} howPromote - email type: String
 * @param {string} sharedLinks - mobile type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const addAdditionalInfo = [
    header("Authorization", "Authorization is required.")
    .exists()
    .withMessage("Authorization is required."),
    body("firstName", "firstName is required.")
        .exists()
        .withMessage("firstName is required."),
    body("lastName", "lastName is required.")
        .exists()
        .withMessage("lastName is required."),
    body("howPromote", "howPromote is required.")
        .exists()
        .withMessage("howPromote is required."),
    body("sharedLinks", "sharedLinks is required.")
        .exists()
        .withMessage("sharedLinks is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                logger.error("error in the update account validation ", {
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

/**
 * @description - Update account Validations This Middleware validates the body of the Request
 * @param {string} country - country type: String
 * @param {string} gender - gender type: String
 * @param {string} dob - dob type: String
 * @param {string} level - level type: String
 * @param {string} goal - goal type: String
 * @param {string} bio - bio type: String
 * @param {string} corrections - corrections type: String
 * @param {string} currentFocus - currentFocus type: String
 * @param {string} comfortLevel - comfortLevel type: String
 * @param {string} interest - interest type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const createProfile = [
    body("passportName", "passportName is required.")
        .exists()
        .withMessage("passportName is required."),
    body("mobile", "mobile is required.")
        .exists()
        .withMessage("mobile is required."),
    body("email", "email is required.")
        .exists()
        .withMessage("email is required."),
    body("ambassadorId", "ambassadorId is required.")
        .exists()
        .withMessage("ambassadorId is required."),
    body("country", "country is required.")
        .exists()
        .withMessage("country is required."),
    body("city", "city is required.")
        .exists()
        .withMessage("city is required."),
    body("gender", "language is required.")
        .exists()
        .withMessage("gender is required."),
    body("dob", "dob is required.")
        .exists()
        .withMessage("dob is required."),
  
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                logger.error("error in the update account validation ", {
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
    addAdditionalInfo,
    createProfile
};