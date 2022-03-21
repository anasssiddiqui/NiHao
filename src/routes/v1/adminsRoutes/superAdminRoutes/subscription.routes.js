const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require("multer")
const {
  verifyOtpValidation
} = require("../../../../validations/userAuth.validations");
const { userAuthMiddleware } = require("../../../../middlewares/auth.middleware")
const { checkRole } = require("../../../../middlewares/checkRole.middleware")
const { injectAdminDetails } = require("../../../../middlewares/injectUserDetail.middleware")

const adminSubscriptionController = require("../../../../controllers/adminControllers/superAdminControllers/adminSubscription.controller");

const asyncHandler = require('../../../../helper/asyncHandler')


/**
 * @swagger
 *
 * /v1/admin/subscription/subscription-listing:
 *   post:
 *     tags:
 *       - Admin Subscription
 *     summary:  Delete subscription
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
  "/subscription-listing",
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSubscriptionController.subscriptionsList));

/**
 * @swagger
 *
 * /v1/admin/subscription/create-subscription:
 *   post:
 *     tags:
 *       - Admin Subscription
 *     summary:  add new subscription
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: add new subscription
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: image url  
 *               subscriptionType:
 *                 type: string
 *                 example: kids
 *               planName: 
 *                 type: string
 *                 example: offer
 *               currency: 
 *                 type: string
 *                 example: dollar
 *               month: 
 *                 type: string
 *                 example: month
 *               minutes:
 *                 type: string
 *                 example: 15
 *               days:
 *                 type: string
 *                 example: 1
 *               amount: 
 *                 type: number
 *                 example: 500
 *               discountPercentage:
 *                 type: number
 *                 example: 50
 *               description:
 *                 type: string
 *                 example: 'description about plan'
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
  "/create-subscription",
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSubscriptionController.createSubscription));


/**
 * @swagger
 *
 * /v1/admin/subscription/delete-subscription:
 *   post:
 *     tags:
 *       - Admin Subscription
 *     summary:  Delete subscription
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: add new subscription
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 6200c86264b191ec3f35cf0c
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
  "/delete-subscription",
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSubscriptionController.deleteSubscription));

  /**
 * @swagger
 *
 * /v1/admin/subscription/update-subscription:
 *   post:
 *     tags:
 *       - Admin Subscription
 *     summary:  Update subscription
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: add new subscription
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 6200c893972d0eec016b5b63
 *               image:
 *                 type: string
 *                 example: image url             
 *               subscriptionType:
 *                 type: string
 *                 example: kids
 *               planName: 
 *                 type: string
 *                 example: offer
 *               currency: 
 *                 type: string
 *                 example: dollar
 *               duration: 
 *                 type: string
 *                 example: month
 *               minutes:
 *                 type: string
 *                 example: 15
 *               days:
 *                 type: string
 *                 example: 1
 *               planAmount: 
 *                 type: number
 *                 example: 500
 *               discountPercentage:
 *                 type: number
 *                 example: 50
 *               description:
 *                 type: string
 *                 example: 'description about plan'
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
  "/update-subscription",
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSubscriptionController.updateSubscription));




module.exports = router;