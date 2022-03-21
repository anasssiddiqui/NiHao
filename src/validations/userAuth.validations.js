const { ValidationFailure } = require("../utility/apiError");
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

const signupStudentValidation = [
    body("email", "email is required.")
        .exists()
        .isEmail()
        .withMessage("email is required."),
    body("password", "password is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("password is required."),
    body("confirmPassword", "confirmPassword is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("confirmPassword is required.")
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;
            if (password !== confirmPassword) {
                throw new Error("Password and confirm password must be same");
            }
        }),
    body("studentId", "studentId is required.")
        .exists()
        .withMessage("studentId is required."),
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


/**
 * @description - Signup Validations This Middleware validates the body of the Request
 * @param {string} email - email type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const signupEmployeeValidation = [
    body("email", "email is required.")
        .exists()
        .isEmail()
        .withMessage("email is required."),
    body("password", "password is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("password is required."),
    body("confirmPassword", "confirmPassword is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("confirmPassword is required.")
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;
            if (password !== confirmPassword) {
                throw new Error("Password and confirm password must be same");
            }
        }),
    body("employeeId", "employeeId is required.")
        .exists()
        .withMessage("employeeId is required."),
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


/**
 * @description - Social Login Validations This Middleware validates the body of the Request
 * @param {string} token - token type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const socialLoginValidation = [
    body("token", "token is required.")
        .exists()
        .withMessage("token is required."),
    body("signUpType", "signUpType is required.")
        .exists()
        .withMessage("signUpType is required."),
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

/**
 * @description - Google Login Validations This Middleware validates the body of the Request
 * @param {string} token - token type: String
 * @return - Go to next middleware on success
 * @return - GO to next error  middleware on Failure
 */

const googleLoginValidation = [
    body("token", "token is required.")
        .exists()
        .withMessage("token is required."),

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

/**
 * @description - This Middleware validates the body of the Request FB Login Validations
 * @param {string} accessToken - accessToken type: String
 * @return - error on Failure and move to next error handler middleware
 * @return - GO to next middleware on Success
 */

const fbLoginValidation = [
    body("accessToken", "accessToken is required.")
        .exists()
        .withMessage("accessToken is required."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the login user validation ", {
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
 * @description - This middleware is used for validating the body of email Login router end point
 * @returns - Returns control to next function
 */

const emailLoginValidation = [
    body("emailUsername", "email is required.")
        .exists()
        .isEmail()
        .withMessage("Valid Email is required."),
    body("password", "password is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("password is required."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the email login validation ", {
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
 * @description - This middleware is used for validating the email verification router end point
 * @returns - Returns control to next function
 */

const emailVerifyValidation = [
    body("email", "email is required.")
        .exists()
        .isEmail()
        .withMessage("Valid Email is required."),
    body("otp", "otp is required.")
        .exists()
        .isLength({ min: 4, max: 8 })
        .withMessage("Valid Otp is required."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the email verify validation ", {
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
 * @description - This middleware is used for validating the body of mobile login router end point
 * @returns - Returns control to next function
 */

const mobileLoginValidation = [
    body("mobile", "mobile is required.")
        .exists()
        .isLength({ min: 8, max: 10 })
        .withMessage("Valid Mobile is required."),
    body("mobileCountryCode", "mobile  country code is required.")
        .exists()
        .isLength({ min: 1, max: 7 })
        .withMessage("Valid Mobile country code is required."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the mobile Login validation ", {
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
 * @description - This middleware is used for validating the body of mobile verification router end point
 * @returns - Returns control to next function
 */

const mobileVerifyValidation = [
    body("mobile", "mobile is required.")
        .exists()
        .isLength({ min: 8, max: 10 })
        .withMessage("Valid Mobile is required."),
    body("mobileCountryCode", "mobile  country code is required.")
        .exists()
        .isLength({ min: 1, max: 7 })
        .withMessage("Valid Mobile coutnry code is required."),
    body("otp", "otp is required.")
        .exists()
        .isLength({ min: 4, max: 8 })
        .withMessage("Valid Otp is required."),

    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the mobile verify validation ", {
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
 * @description - This middleware is used for validating the body of forgot password
 * @returns - Returns control to next function
 */

const forgotPasswordValidation = [
    body("email", "email is required.")
        .exists()
        .withMessage("Email is required."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the forgot password validation ", {
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
 * @description - This middleware is used for validating the body of reset password router end point
 * @returns - Returns control to next function
 */

const resetPasswordValidation = [
    body("password", "password is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("password is required."),
    body("confirmPassword", "confirmPassword is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("confirmPassword is required.")
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;
            if (password !== confirmPassword) {
                throw new Error("Password and confirm password must be same");
            }
        }),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the reset password validation ", {
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
 * @description - This middleware is used for validating the body of change password router end point
 * @returns - Returns control to next function
 */

const changePasswordValidation = [
    body("oldPassword", "oldPassword is required.")
        .exists()
        .isLength({ min: 8, max: 10 })
        .withMessage("Valid oldPassword is required."),
    body("password", "password is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("password is required."),
    body("confirmPassword", "confirmPassword is required.")
        .exists()
        .isLength({ min: 6, max: 128 })
        .withMessage("confirmPassword is required.")
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;
            if (password !== confirmPassword) {
                throw new Error("Password and confirm password must be same");
            }
        }),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the change password validation ", {
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
 * @description - This middleware is used for validating the body of verify otp end point
 * @returns - Returns control to next function
 */

const verifyOtpValidation = [
    body("email", "email is required.")
        .exists()
        .withMessage("Valid email is required."),
    body("otp", "otp is required.")
        .exists()
        .withMessage("otp is required."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error("error in the verify otp validation ", {
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
    googleLoginValidation,
    socialLoginValidation,
    signupStudentValidation,
    signupEmployeeValidation,
    fbLoginValidation,
    emailLoginValidation,
    mobileLoginValidation,
    mobileVerifyValidation,
    emailVerifyValidation,
    resetPasswordValidation,
    changePasswordValidation,
    forgotPasswordValidation,
    verifyOtpValidation
};