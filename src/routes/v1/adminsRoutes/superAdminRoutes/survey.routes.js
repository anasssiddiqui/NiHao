const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require("multer")
const { ratingsActivationValidations, deleteRatingsOptionsValidations, addRatingsOptionsValidations, createWebSurveyValidations, deleteSurveyOptionValidations, addSurveyOptionValidations, categoryOptionsValidations } = require("../../../../validations/adminValidations/ratingsValidations");
const { userAuthMiddleware } = require("../../../../middlewares/auth.middleware")
const { checkRole } = require("../../../../middlewares/checkRole.middleware")
const { injectAdminDetails } = require("../../../../middlewares/injectUserDetail.middleware")
const adminSurvey = require("../../../../controllers/adminControllers/superAdminControllers/adminSurvey.controller");

const asyncHandler = require('../../../../helper/asyncHandler')




/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/survey/add-survey-option:
*   put:
*     tags:
*       - Admin survey
*     summary:  add new option for survey
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: category params =>    prices/payments , connection , teachers ,website ,support ,materials ,other ,
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               category:
*                 type: string
*                 description: static category name
*                 example: 'price/payments'
*               option: 
*                 type: string
*                 example: {"option":"best","scale":"0-6"}
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

router.put(
  "/add-survey-option",
  userAuthMiddleware,
  injectAdminDetails,
  addSurveyOptionValidations,
  asyncHandler(adminSurvey.addSurveyOption));


/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/survey/delete-survey-option:
*   delete:
*     tags:
*       - Admin survey
*     summary:  add new option for survey
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: category params =>    prices/payments , connection , teachers ,website ,support ,materials ,other ,
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               category:
*                 type: string
*                 description: static category name
*                 example: 'price/payments'
*               id: 
*                 type: string
*                 example: '6227119f223559372f254a29'
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

router.delete(
  "/delete-survey-option",
  userAuthMiddleware,
  injectAdminDetails,
  deleteSurveyOptionValidations,
  asyncHandler(adminSurvey.deleteSurveyOption));


/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/survey/create-web-survey:
*   post:
*     tags:
*       - Admin survey
*     summary:  add new option for survey
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: category params => prices/payments , connection , teachers ,website ,support ,materials ,other ,
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               category:
*                 type: string
*                 description: static category name
*                 example: 'price/payments'
*               options: 
*                 type: array
*                 description: scale must be 0-6, 7-8, 9-10,
*                 example: [{"option":"best","scale":6}]
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
  "/create-web-survey",
  userAuthMiddleware,
  injectAdminDetails,
  createWebSurveyValidations,
  asyncHandler(adminSurvey.createWebSurvey));


/** * @description - This route end point is for create a new survey */

/**
* @swagger
*
* /v1/admin/survey/create-web-survey:
*   post:
*     tags:
*       - Admin survey
*     summary:  add new option for survey
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: category params =>    prices/payments , connection , teachers ,website ,support ,materials ,other  |||    scale must be => 0-6, 7-8, 9-10,
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               category:
*                 type: string
*                 description: static category name
*                 example: 'price/payments'
*               options: 
*                 type: array
*                 description: scale must be 0-6, 7-8, 9-10,
*                 example: [{"option":"best","scale":"0-6"}]
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
  "/create-web-survey",
  userAuthMiddleware,
  injectAdminDetails,
  createWebSurveyValidations,
  asyncHandler(adminSurvey.createWebSurvey));


/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/survey/get-options:
*   get:
*     tags:
*       - Admin survey
*     summary:  add new option for ratings
*     security:
*       - bearerAuth: []
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

router.get(
  "/get-options",
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSurvey.ratingsOptions));


/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/survey/ratings-enable-disable:
*   put:
*     tags:
*       - Admin survey
*     summary:  add new option for ratings
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: in ratings send these options only  => oneStar || twoStars || threeStars || fourStars|| fiveStars,     status => true || false
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               rating:
*                 type: string
*                 example: 'oneStar'
*               status:
*                 type: string
*                 example: 'true'
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

router.put(
  "/ratings-Enable-disable",
  userAuthMiddleware,
  injectAdminDetails,
  ratingsActivationValidations,
  asyncHandler(adminSurvey.ratingsIsEnable));


/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/survey/rating-activate-deactivate:
*   put:
*     tags:
*       - Admin survey
*     summary:  add new option for ratings
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: in ratings send these options only  => oneStar || twoStars || threeStars || fourStars|| fiveStars,     status => true || false
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               rating:
*                 type: string
*                 example: 'oneStar'
*               status:
*                 type: string
*                 example: 'true'
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

router.put(
  "/rating-activate-deactivate",
  userAuthMiddleware,
  injectAdminDetails,
  ratingsActivationValidations,
  asyncHandler(adminSurvey.ratingsActivation));


/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/survey/delete-rating-options:
*   delete:
*     tags:
*       - Admin survey
*     summary:  add new option for ratings
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: in ratings send these options only  => oneStar || twoStars || threeStars || fourStars || fiveStars ,     options => any string value
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               rating:
*                 type: string
*                 example: 'oneStar'
*               option:
*                 type: string
*                 example: 'best'
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

router.delete(
  "/delete-rating-options",
  userAuthMiddleware,
  injectAdminDetails,
  deleteRatingsOptionsValidations,
  asyncHandler(adminSurvey.deleteRatingsOptions));



/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/survey/add-rating-options:
*   put:
*     tags:
*       - Admin survey
*     summary:  add new option for ratings
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: in ratings send these options only  => oneStar || twoStars || threeStars || fourStars || fiveStars ,     options => any string value
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               rating:
*                 type: string
*                 example: 'oneStar'
*               option:
*                 type: string
*                 example: 'best'
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

router.put(
  "/add-rating-options",
  userAuthMiddleware,
  injectAdminDetails,
  addRatingsOptionsValidations,
  asyncHandler(adminSurvey.addRatingsOptions));

module.exports = router;