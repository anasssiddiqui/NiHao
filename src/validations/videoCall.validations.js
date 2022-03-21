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
 * @param {string} id - Authorization type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const disconnectCallValidations = [
    body("invitationId")
        .notEmpty()
        .withMessage("invitationId:- this field is required."),
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
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const endCallValidations = [
    body("invitationId")
        .notEmpty()
        .withMessage("invitationId:- this field is required."),
    body("talkTime")
        .notEmpty()
        .withMessage("talkTime:- this field is required."),
    body("videoCallRecording")
        .notEmpty()
        .withMessage("videoCallRecording:- this field is required."),
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
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const sendJoinInvitationValidations = [
    body("senderId")
        .notEmpty()
        .withMessage("senderId:- this field is required."),
    body("recevierId")
        .notEmpty()
        .withMessage("recevierId:- this field is required."),
    body("courseId")
        .notEmpty()
        .withMessage("courseId:- this field is required."),
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
 * @param {string} invitationId - type: String
 * @param {string} recevierId - type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const acceptInvitationValidations = [
    body("invitationId")
        .notEmpty()
        .withMessage("invitationId this field is required."),
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
 * @param {string} roomName - date type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */
const createTokenValidations = [
    body("roomName")
        .notEmpty()
        .withMessage("room name is required."),
    body("senderId")
        .notEmpty()
        .withMessage("senderId:- this field is required."),
    body("senderRole")
        .notEmpty()
        .withMessage("senderRole:- senderRole is required.").isIn(['tutor', 'student']).withMessage('tutor', 'student'),
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
    disconnectCallValidations,
    endCallValidations,
    sendJoinInvitationValidations,
    acceptInvitationValidations,
    createTokenValidations,
};