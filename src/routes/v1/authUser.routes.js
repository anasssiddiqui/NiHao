const express = require("express");
const router = express.Router();
const {
  signupStudentValidation,
  signupEmployeeValidation,
  signupIndividualValidation,
  emailLoginValidation,
  resetPasswordValidation,
  changePasswordValidation,
  forgotPasswordValidation,
  verifyOtpValidation
} = require("../../validations/userAuth.validations");
const { userAuthMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/checkRole.middleware")
const { injectUserDetails } = require("../../middlewares/injectUserDetail.middleware")
const userAuthController = require("../../controllers/userAuth.controller");

const asyncHandler = require('../../helper/asyncHandler')


/** * @description - This route end point is for signup as student*/

/**
 * @swagger
 *
 * /v1/user/auth/social-login:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Student social login  with social id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socialId:
 *                 type: string
 *                 example: email@ex.in
 *               signUpType:
 *                 type: string
 *                 example: linkedin
 *               firstName:
 *                 type: string
 *                 example: firstName
 *               lastName:
 *                 type: string
 *                 example: lastName
 *               mobile:
 *                 type: string
 *                 example: 875488484
 *               email:
 *                 type: string
 *                 example: email
 *               profilePic:
 *                 type: string
 *                 example: profilePic
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
 // signupStudentValidation, 
 asyncHandler(userAuthController.socialLogin));


/** * @description - This route end point is for signup as employee*/




/** * @description - This route end point is for signup as student*/

/**
 * @swagger
 *
 * /v1/user/auth/signup-student:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Student signup with email and password
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
 *               confirmPassword:
 *                 type: string
 *                 example: 123456
 *               studentId: 
 *                 type: string
 *                 example: '879613'
 *               socialId: 
 *                 type: string
 *                 example: '879613'
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

router.post("/auth/signup-student",
  // signupStudentValidation, 
  asyncHandler(userAuthController.signUpStudent));


/** * @description - This route end point is for signup as employee*/

/**
 * @swagger
 *
 * /v1/user/auth/signup-employee:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Employee signup with email and password
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
 *               confirmPassword:
 *                 type: string
 *                 example: 123456
 *               employeeId: 
 *                 type: number
 *                 example: 879613
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

router.post("/auth/signup-employee",
  //  signupEmployeeValidation,
  asyncHandler(userAuthController.signUpEmployee));

/** * @description - This route end point is for signup as individual*/

/**
 * @swagger
 *
 * /v1/user/auth/signup-individual:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Individual signup with email and password
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
 *               confirmPassword:
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

router.post("/auth/signup-individual",
  //  signupIndividualValidation,
  asyncHandler(userAuthController.signUpIndividual));

/** * @description - This route end point is for email login */

/**
 * @swagger
 *
 * /v1/user/auth/email-login:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: User login with email and password
 *     requestBody:
 *       description: operatingSystem => "ios" , "windows", "android" || loginType => "web","device" || token => device or web tokken
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

router.post("/auth/email-login",
  //  emailLoginValidation,
  asyncHandler(userAuthController.emailLogin));

/** * @description - This route end point is for logging out the user */

/**
 * @swagger
 *
 * /v1/user/auth/logout:
 *   get:
 *     tags:
 *       - User Auth
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
  checkRole(["student", "employee", "individual"]),
  asyncHandler(userAuthController.logout));


/** * @description - This route end point is for forget password

/**
 * @swagger
 *
 * /v1/user/auth/forget-password:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Send forget password email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: email@ex.in
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
  "/auth/forget-password",
  asyncHandler(userAuthController.forgotPassword)
);

/** * @description - This route end point is for verify forget password otp

/**
 * @swagger
 *
 * /v1/user/auth/forget-password/verify-otp:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Verify forget password otp
 *     requestBody:
 *       description: send email and otp
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
  asyncHandler(userAuthController.verifyForgotPasswordOtp)
);

/** * @description - This route end point is for set new password

/**
 * @swagger
 *
 * /v1/user/auth/set-password/{token}:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Set new password for user
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

// /** * @description - This route end point is for change password

// /**
//  * @swagger
//  *
//  * /v1/user/auth/change-password:
//  *   post:
//  *     tags:
//  *       - User Auth
//  *     summary: Change password
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               oldPassword:
//  *                 type: string
//  *                 example: 87654321
//  *               password:
//  *                 type: string
//  *                 example: 12345678
//  *               confirmPassword:
//  *                 type: string
//  *                 example: 12345678
//  *     responses:
//  *       '200':
//  *         description: OK
//  *       '400':
//  *         description: Bad Request
//  *       '401':
//  *         description: Authorization Failure
//  *       '422':
//  *         description: Validation Error
//  *       '500':
//  *         description: Internal Server Error
//  *
//  */

// router.post(
//     "/auth/change-password",
//     userAuthMiddleware,
//     checkRole(["artist", "shop", "client"]),
//     injectUserDetails,
//     changePasswordValidation,
//     asyncHandler(userAuthController.changePassword)
// );

module.exports = router;