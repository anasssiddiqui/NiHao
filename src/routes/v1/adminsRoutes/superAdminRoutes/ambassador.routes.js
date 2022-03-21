const express = require("express");
const router = express.Router();
const {
    verifyOtpValidation
} = require("../../../../validations/userAuth.validations");
const { userAuthMiddleware } = require("../../../../middlewares/auth.middleware")
const { checkRole } = require("../../../../middlewares/checkRole.middleware")
const { injectAdminDetails } = require("../../../../middlewares/injectUserDetail.middleware")
const adminAmbassadorController = require("../../../../controllers/adminControllers/superAdminControllers/adminAmbassador.controller");

const asyncHandler = require('../../../../helper/asyncHandler')



/**
 * @swagger
 *
 * /v1/admin/ambassador/ambassador-details:
 *   post:
 *     tags:
 *       - Admin Ambassador
 *     summary:  ambassador details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: ambassador details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 61fa0df8e2a3d2a054d5bd50
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
    "/ambassador-details",
    userAuthMiddleware,
    injectAdminDetails,
    asyncHandler(adminAmbassadorController.ambassadorDetails));


/**
 * @swagger
 *
 * /v1/admin/ambassador/reject-request:
 *   post:
 *     tags:
 *       - Admin Ambassador
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
    asyncHandler(adminAmbassadorController.rejectRequest));


/**
 * @swagger
 *
 * /v1/admin/ambassador/accept-request:
 *   post:
 *     tags:
 *       - Admin Ambassador
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
    asyncHandler(adminAmbassadorController.acceptRequest));



/** * @description - This route end point is for get account info */

/**
 * @swagger
 *
 * /v1/admin/ambassador/ambassadors-list:
 *   get:
 *     tags:
 *       - Admin Ambassador
 *     summary: Get account info
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
    "/ambassadors-list",
    userAuthMiddleware,
    injectAdminDetails,
    asyncHandler(adminAmbassadorController.ambassadorsList)
  );




module.exports = router;