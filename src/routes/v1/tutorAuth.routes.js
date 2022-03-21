const express = require("express");
const router = express.Router();
const {
  verifyOtpValidation, resetPasswordValidation, forgotPasswordValidation, emailLoginValidation
} = require("../../validations/userAuth.validations");
const { userAuthMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/checkRole.middleware")
const { injectUserDetails } = require("../../middlewares/injectUserDetail.middleware")
const userAuthController = require("../../controllers/tutorAuth.controller");

const asyncHandler = require('../../helper/asyncHandler')



/** * @description - This route end point is for set new password

/**
 * @swagger
 *
 * /v1/tutor/auth/set-password/{token}:
 *   post:
 *     tags:
 *       - Tutor Auth
 *     summary: Set new password for Tutor
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
  resetPasswordValidation,
  asyncHandler(userAuthController.setNewPassword)
);


/**
 * @swagger
 *
 * /v1/tutor/auth/forget-password/verify-otp:
 *   post:
 *     tags:
 *       - Tutor Auth
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
  asyncHandler(userAuthController.verifyForgotPassword)
);


/** * @description - This route end point is for sendotp  out the ambassador */


/**
 * @swagger
 *
 * /v1/tutor/auth/forget-password:
 *   post:
 *     tags:
 *       - Tutor Auth
 *     summary: Tutor forgot password
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

router.post("/auth/forget-password",
  forgotPasswordValidation,
  asyncHandler(userAuthController.tutorforgotPassword));

/** * @description - This route end point is for Login tutor

/**
 * @swagger
 *
 * /v1/tutor/auth/email-login:
 *   post:
 *     tags:
 *       - Tutor Auth
 *     summary:  Login as a tutor
 *     requestBody:
 *       description: Login as a tutor
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
 *               notificationDetails:
 *                 type: object
 *                 properties:
 *                   operatingSystem:
 *                     type: string
 *                     enum: 
 *                          - ios
 *                          - windows
 *                          - android
 *                   token:
 *                     type: boolean
 *                     example: tokken
 *                   loginType:
 *                     type: string
 *                     example: web
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
  emailLoginValidation,
  asyncHandler(userAuthController.tutorEmailLogin)
);


// ** * @description - This route end point is for signup as tutor*/

/**
 * @swagger
 *
 * /v1/tutor/auth/signup:
 *   post:
 *     tags:
 *       - Tutor Auth
 *     summary: Tutor signup with email and password
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
 *                 example: 123456
 *               ambassdorId:
 *                 type: string
 *                 example: 'BRS-5B1787KQ'
 *               notificationDetails:
 *                 type: object
 *                 properties:
 *                   operatingSystem:
 *                     type: string
 *                     enum: 
 *                          - ios
 *                          - windows
 *                          - android
 *                   token:
 *                     type: boolean
 *                     example: tokken
 *                   loginType:
 *                     type: string
 *                     example: web              
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
  asyncHandler(userAuthController.signUpTutor));


// ** * @description - This route end point is for social login*/

/**
 * @swagger
 *
 * /v1/tutor/auth/social-login:
 *   post:
 *     tags:
 *       - Tutor Auth
 *     summary: Tutor social login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               signUpType:
 *                 type: string
 *                 example: facebook
 *               socialId:
 *                 type: string
 *                 example: 123456
 *               profilePic:
 *                 type: string
 *                 example: https
 *               firstName:
 *                 type: string
 *                 example: firstname
 *               lastName:
 *                 type: string
 *                 example: lastname
 *               mobile:
 *                 type: string
 *                 example: 123456
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

router.post("/auth/social-login",
  asyncHandler(userAuthController.socialLogin));


module.exports = router;