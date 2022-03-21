const express = require("express");
const router = express.Router();
const {
    verifyOtpValidation
} = require("../../validations/userAuth.validations");
const { userAuthMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/checkRole.middleware")
const { injectUserDetails } = require("../../middlewares/injectUserDetail.middleware")
const ambassadorAuthController = require("../../controllers/ambassadorAuth.controller");

const asyncHandler = require('../../helper/asyncHandler')






/** * @description - This route end point is for set new password

/**
 * @swagger
 *
 * /v1/ambassador/auth/set-password/{token}:
 *   post:
 *     tags:
 *       - Ambassador Auth
 *     summary: Set new password for Ambassador
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Set new password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: 12345678
 *               confirmPassword:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

 router.post(
  "/auth/set-password/:token",
  asyncHandler(ambassadorAuthController.setNewPassword)
);


/**
 * @swagger
 *
 * /v1/ambassador/auth/forget-password/verify-otp:
 *   post:
 *     tags:
 *       - Ambassador Auth
 *     summary: Verify forget password otp
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'globber@yopmail.com'
 *               otp:
 *                 type: string
 *                 example: '00088'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

 router.post(
  "/auth/forget-password/verify-otp",
  verifyOtpValidation,
  asyncHandler(ambassadorAuthController.verifyForgotPasswordOtpAmbassador)
);

/** * @description - This route end point is for sendotp  out the ambassador */


/**
 * @swagger
 *
 * /v1/ambassador/auth/forgotPassword:
 *   post:
 *     tags:
 *       - Ambassador Auth
 *     summary: Ambassador forgot password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example.com
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

 router.post("/auth/forgotPassword",
 asyncHandler(ambassadorAuthController.forgotPasswordAmbassador));


/** * @description - This route end point is for logging out the ambassador */

/**
 * @swagger
 *
 * /v1/ambassador/auth/logout:
 *   get:
 *     tags:
 *       - Ambassador Auth
 *     summary: User Logout api
 *     security:
 *       - bearerAuth: []
 *     responses :
 *        '200':
 *          description: Ok
 *        '400':
 *          description: Bad Reuest
 *        '401':
 *          description: Authorization Failure
 *        '422':
 *          description: Validation Error
 *        '500':
 *          description: Internal Server Error
 *
 */

 router.get("/auth/logout",
 userAuthMiddleware,
 checkRole(["ambassador"]),
 asyncHandler(ambassadorAuthController.logoutAmbassador));

/** * @description - This route end point is for Login ambassador

/**
 * @swagger
 *
 * /v1/ambassador/auth/email-login:
 *   post:
 *     tags:
 *       - Ambassador Auth
 *     summary:  Login as a ambassador
 *     requestBody:
 *       description: Login as a ambassador
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailUsername:
 *                 type: string
 *                 example: 'email@ex.in'
 *               password:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

 router.post(
  "/auth/email-login",
  asyncHandler(ambassadorAuthController.ambassadorEmailLogin)
);




/** * @description - This route end point is for signup as ambassador*/

/**
 * @swagger
 *
 * /v1/ambassador/auth/signup:
 *   post:
 *     tags:
 *       - Ambassador Auth
 *     summary: ambassador signup with email and password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: email@ex.in
 *               password:
 *                 type: string
 *               socialId:
 *                 type: string 
 *                 example:
 *               isAgreeWithTNC:
 *                 type: Bolean
 *                 example: true
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

 router.post("/auth/signup", 
 // signupStudentValidation, 
 asyncHandler(ambassadorAuthController.signUpAmbassador));

/** * @description - This route end point is for signup as ambassador*/

/**
 * @swagger
 *
 * /v1/ambassador/auth/social_login:
 *   post:
 *     tags:
 *       - Ambassador Auth
 *     summary: ambassador signup with email and password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fcmToken:
 *                 type: string
 *                 example: email@ex.in
 *               signUpType:
 *                 type: string
 *                 example: 'google,linkedin'  
 *               role:
 *                 type: Bolean
 *                 example: true,
 *               socialId:
 *                 type: string
 *                 example: 12121212121
 *               image:
 *                 type: string
 *                 example: https
 *               firstName:
 *                 type: string
 *                 example: firstName
 *               lastName:
 *                 type: string
 *                 example: lastName
 *               mobile:
 *                 type: string
 *                 example: 15151515151
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

 router.post("/auth/social_login", 
 // signupStudentValidation, 
 asyncHandler(ambassadorAuthController.socialLogin));

module.exports = router;