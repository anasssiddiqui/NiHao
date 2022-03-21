const express = require("express");
const router = express.Router();
const {
    verifyOtpValidation
} = require("../../../../validations/userAuth.validations");
const { userAuthMiddleware } = require("../../../../middlewares/auth.middleware")
const { checkRole } = require("../../../../middlewares/checkRole.middleware")
const { injectAdminDetails } = require("../../../../middlewares/injectUserDetail.middleware")
const adminTutorController = require("../../../../controllers/adminControllers/superAdminControllers/adminTutor.controller");

const asyncHandler = require('../../../../helper/asyncHandler')

/**
 * @swagger
 *
 * /v1/admin/tutor/tutor-details:
 *   post:
 *     tags:
 *       - Admin Tutor
 *     summary: get tutor details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: get tutor details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: '61f24e3e0a51e489b3f36c64'
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
    "/tutor-details",
    userAuthMiddleware,
    injectAdminDetails,
    asyncHandler(adminTutorController.tutorsDetails));


/**
 * @swagger
 *
 * /v1/admin/tutor/reject-request:
 *   post:
 *     tags:
 *       - Admin Tutor
 *     summary:  Forgot admin password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: send otp to your registered email
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: '61e7ba5e619d769de37fb170'
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
    "/reject-request",
    userAuthMiddleware,
    injectAdminDetails,
    asyncHandler(adminTutorController.rejectRequest));


/**
 * @swagger
 *
 * /v1/admin/tutor/accept-request:
 *   post:
 *     tags:
 *       - Admin Tutor
 *     summary:  Accept request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Accept tutor request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 'hdfhghghg'
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
    "/accept-request",
    userAuthMiddleware,
    injectAdminDetails,
    asyncHandler(adminTutorController.acceptRequest));


// /** * @description - This route end point is for get account info */

/**
 * @swagger
 *
 * /v1/admin/tutor/tutors-list:
 *   get:
 *     tags:
 *       - Admin Tutor
 *     summary: Get tutors account info
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
 router.get(
    "/tutors-list",
    userAuthMiddleware,
    injectAdminDetails,
    asyncHandler(adminTutorController.tutorsList)
  );




module.exports = router;