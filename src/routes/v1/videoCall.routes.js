const express = require("express");
const router = express.Router();
const {
    createTokenValidations,
    acceptInvitationValidations,
    sendJoinInvitationValidations,
    endCallValidations,
    disconnectCallValidations
} = require("../../validations/videoCall.validations")
const { userAuthMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/checkRole.middleware")
const { injectUserDetails } = require("../../middlewares/injectUserDetail.middleware")
const videocallController = require("../../controllers/videocall.controller");
const asyncHandler = require('../../helper/asyncHandler')

/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/videoCall/disconnect-call:
 *   put:
 *     tags:
 *       - video call
 *     summary: this is call end 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invitationId:
 *                 type: string
 *                 example: '6227555a93ccba56c8b1478e'
 *               talkTime:
 *                 type: string
 *                 example: 'in seconds'
 *               videoCallRecording:
 *                 type: string
 *                 example: 'https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png'
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

router.put("/disconnect-call",
    disconnectCallValidations,
    asyncHandler(videocallController.disconnectCall));

/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/videoCall/end-call:
 *   put:
 *     tags:
 *       - video call
 *     summary: this is call end 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invitationId:
 *                 type: string
 *                 example: '6227555a93ccba56c8b1478e'
 *               talkTime:
 *                 type: string
 *                 example: 'in seconds'
 *               videoCallRecording:
 *                 type: string
 *                 example: 'https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png'
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

router.put("/end-call",
    endCallValidations,
    asyncHandler(videocallController.endCall));


/** * @description - This route end point is for accept invitation on tutor side*/

/**
 * @swagger
 *
 * /v1/videoCall/accept-invitation:
 *   put:
 *     tags:
 *       - video call
 *     summary: Student send video call request to tutor 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invitationId:
 *                 type: string
 *                 example: '6227555a93ccba56c8b1478e'
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

router.put("/accept-invitation",
    acceptInvitationValidations,
    asyncHandler(videocallController.acceptInvitation));


/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/videoCall/send-Join-invitation:
 *   post:
 *     tags:
 *       - video call
 *     summary: Student send video call request to tutor 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *                 example: '621cb9064668bf8402b7aae4'
 *               recevierId:
 *                 type: string
 *                 example: '621efc23a4378647b1908fc3'
 *               courseId:
 *                 type: string
 *                 example: '620f1ce23c53b1a820dcae5b'
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

router.post("/send-Join-invitation",
    sendJoinInvitationValidations,
    asyncHandler(videocallController.sendJoinInvitation));

/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/videoCall/create-token:
 *   post:
 *     tags:
 *       - video call
 *     summary: This route use for generate token 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *                 example: 'My new room'
 *               senderId:
 *                 type: string
 *                 example: '621cb9064668bf8402b7aae4'
 *               senderRole:
 *                 type: string
 *                 example: 'student'
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

router.post("/create-token",
    createTokenValidations,
    asyncHandler(videocallController.createToken));




module.exports = router;