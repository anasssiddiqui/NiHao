const express = require("express");
const router = express.Router();
const {
    verifyOtpValidation
} = require("../../../../validations/userAuth.validations");
const { userAuthMiddleware } = require("../../../../middlewares/auth.middleware")
const { checkRole } = require("../../../../middlewares/checkRole.middleware")
const { injectUserDetails } = require("../../../../middlewares/injectUserDetail.middleware")
const adminAuthController = require("../../../../controllers/adminControllers/superAdminControllers/adminAuth.controller");

const asyncHandler = require('../../../../helper/asyncHandler')







/**
 * @swagger
 *
 * /v1/admin/auth/email-login:
 *   post:
 *     tags:
 *       - Admin Auth
 *     summary:  Login admin with em admin
 *     requestBody:
 *       description: Login admin with  admin
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'admin@gmail.com'
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
   asyncHandler(adminAuthController.emailLogin)
);


/**
 * @swagger
 *
 * /v1/admin/auth/forgot-password:
 *   post:
 *     tags:
 *       - Admin Auth
 *     summary:  Forgot admin password
 *     requestBody:
 *       description: send otp to your registered email
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'admin@admin.com'
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
    "/auth/forgot-password",
     asyncHandler(adminAuthController.forgotPassword)
  );


  /**
 * @swagger
 *
 * /v1/admin/auth/verify-otp:
 *   post:
 *     tags:
 *       - Admin Auth
 *     summary:  verify otp
 *     requestBody:
 *       description: verify otp to your registered email
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'admin@admin.com'
 *               otp:
 *                 type: string
 *                 example: '1234'
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
   "/auth/verify-otp",
    asyncHandler(adminAuthController.verifyForgotPassword)
 );

 router.post(
   "/auth/forgot-password",
    asyncHandler(adminAuthController.forgotPassword)
 );


 /**
* @swagger
*
* /v1/admin/auth/set-new-password:
*   post:
*     tags:
*       - Admin Auth
*     summary:  verify otp
*     requestBody:
*       description: verify otp to your registered email
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 example: 'admin@admin.com'
*               otp:
*                 type: string
*                 example: '1234'
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
  "/auth/set-new-password",
   asyncHandler(adminAuthController.setNewPassword)
);

/**
* @swagger
*
* /v1/admin/auth/logout:
*   post:
*     tags:
*       - Admin Auth
*     summary:  Logout admin
*     security:
*       - bearerAuth: []
*          
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
   "/auth/logout",
   userAuthMiddleware,
    asyncHandler(adminAuthController.logout)
 );

/**
* @swagger
*
* /v1/admin/auth/change-password:
*   post:
*     tags:
*       - Admin Auth
*     summary:  Logout admin
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: verify otp to your registered email
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               password:
*                 type: string
*                 example: 'admin@admin.com'
*               oldPassword:
*                 type: string
*                 example: '1234'
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
   "/auth/change-password",
   userAuthMiddleware,
    asyncHandler(adminAuthController.changePassword)
 );
 

module.exports = router;