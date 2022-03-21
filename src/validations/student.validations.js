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
 * @param {string} id -  type: String
 * @param {string} ratings -  type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

 const removeVideoValidations = [
    body("id")
        .notEmpty()
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
 * @description - Update account Validations This Middleware validates the body of the Request
 * @param {string} id -  type: String
 * @param {string} ratings -  type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const sumbitReviewsValidations = [
    body("id")
        .notEmpty()
        .withMessage("recevierId is required."),
    body("review")
        .notEmpty()
        .withMessage("ratings is required."),
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
 * @description - Update account Validations This Middleware validates the body of the Request
 * @param {string} id - Authorization type: String
 * @param {string} invitationId - date type: String
 * @param {string} isCompleteLesson -  type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const giveRatingsValidations = [
    body("recevierId")
        .notEmpty()
        .withMessage("recevierId is required."),
    body("ratings")
        .notEmpty()
        .withMessage("ratings is required.").isIn(['1', '2', '3', '4', '5']).withMessage('status must be =>  1, 2,3,4,5,'),
    body("comments")
        .notEmpty()
        .withMessage("comments is required."),
    body("invitationId")
        .notEmpty()
        .withMessage("invitationId is required."),
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
 * @description - Update account Validations This Middleware validates the body of the Request
 * @param {string} id - Authorization type: String
 * @param {string} invitationId - date type: String
 * @param {string} isCompleteLesson -  type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */
const todayLessonStatusValidations = [
    body("invitationId")
        .notEmpty()
        .withMessage("invitationId is required."),
    body("isCompleteLesson")
        .notEmpty()
        .withMessage("isCompleteLesson is required.").isIn(['complete', 'inComplete',]).withMessage('status must be =>  complete , inComplete'),
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
 * @description - Update account Validations This Middleware validates the body of the Request
 * @param {string} id - Authorization type: String
 * @param {string} cancelComment - date type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */
const cancelClassValidations = [
    body("id")
        .notEmpty()
        .withMessage("id is required."),
    body("cancelComment")
        .notEmpty()
        .withMessage("cancelComment is required."),
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
 * @description - Update account Validations This Middleware validates the body of the Request
 * @param {string} Authorization - Authorization type: String
 * @param {string} date - date type: Date
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */
const getCalendorBookingsValidations = [
    body("date")
        .exists()
        .withMessage("date is required."),
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
 * @description - Update account Validations This Middleware validates the body of the Request
 * @param {string} Authorization - Authorization type: String
 * @param {string} date - date type: Date
 * @param {string} tutorId - tutorId type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const getSlotsValidation = [
    header("Authorization", "Authorization is required.")
        .exists()
        .withMessage("Authorization is required."),
    body("date", "date is required.")
        .exists()
        .withMessage("date is required."),
    body("tutorId", "lastName is required.")
        .exists()
        .withMessage("tutorId is required."),
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

const tutorDetailsValidations = [
    query("id")
        .exists()
        .withMessage("id is required."),
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

const likeDislikeTutorValidation = [
    body("tutorId")
        .exists()
        .withMessage("tutorId is required."),
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
 * @param {string} firstName - firstName type: String
 * @param {string} lastName - lastName type: String
 * @param {string} email - email type: String
 * @param {string} mobile - mobile type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const updateAccountValidation = [
    body("firstName", "firstName is required.")
        .exists()
        .withMessage("firstName is required."),
    body("lastName", "lastName is required.")
        .exists()
        .withMessage("lastName is required."),
    body("email", "email is required.")
        .exists()
        .withMessage("email is required."),
    body("mobile", "mobile is required.")
        .exists()
        .withMessage("mobile is required."),
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

const updateProfileValidation = [
    body("country", "country is required.")
        .exists()
        .withMessage("country is required."),
    body("gender", "gender is required.")
        .exists()
        .withMessage("gender is required."),
    body("dob", "dob is required.")
        .exists()
        .withMessage("dob is required."),
    body("level", "level is required.")
        .exists()
        .withMessage("level is required."),
    body("goal", "goal is required.")
        .exists()
        .withMessage("goal is required."),
    body("bio", "bio is required.")
        .exists()
        .withMessage("bio is required."),
    body("corrections", "corrections is required.")
        .exists()
        .withMessage("corrections is required."),
    body("currentFocus", "currentFocus is required.")
        .exists()
        .withMessage("currentFocus is required."),
    body("comfortLevel", "comfortLevel is required.")
        .exists()
        .withMessage("comfortLevel is required."),
    body("interest", "interest is required.")
        .exists()
        .withMessage("interest is required."),
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
 * @description - Update setting Validations This Middleware validates the body of the Request
 * @param {string} appLanguage - appLanguage type: String
 * @param {string} location - location type: String
 * @param {string} timeZone - timeZone type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const updateSettingValidation = [
    body("appLanguage", "appLanguage is required.")
        .exists()
        .withMessage("appLanguage is required."),
    body("location", "location is required.")
        .exists()
        .withMessage("location is required."),
    body("timeZone", "timeZone is required.")
        .exists()
        .withMessage("timeZone is required."),
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
    removeVideoValidations,
    sumbitReviewsValidations,
    giveRatingsValidations,
    todayLessonStatusValidations,
    cancelClassValidations,
    getCalendorBookingsValidations,
    getSlotsValidation,
    tutorDetailsValidations,
    likeDislikeTutorValidation,
    updateAccountValidation,
    updateProfileValidation,
    updateSettingValidation
};