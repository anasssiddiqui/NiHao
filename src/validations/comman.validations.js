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



const contactUsValidations = [
    body("email")
        .exists()
        .withMessage("Email id :- this filed is required."),
    body("subject")
        .exists()
        .withMessage("Subject :- this filed is required."),
    body("message")
        .exists()
        .withMessage("message :- this filed is required."),
    
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
    contactUsValidations,
   
};