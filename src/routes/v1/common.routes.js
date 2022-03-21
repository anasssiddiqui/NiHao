const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require("multer")
const {
  contactUsValidations, categoryOptionsValidations } = require("../../validations/comman.validations");

const commonController = require("../../controllers/common.controller");
const asyncHandler = require('../../helper/asyncHandler')
const preAssignedUrl = require("../../controllers/preAssignedUrl");



/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/common/category-options:
*   put:
*     tags:
*       - Comman apis
*     summary:  Get options basic on main category and scale
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
*               scale: 
*                 type: string
*                 example: 0-6
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
  "/category-options",
  categoryOptionsValidations,
  asyncHandler(commonController.categoryOptions));



/** * @description - This route end point is for contact us
/**
 * @swagger
 *
 * /v1/common/file-presigned-URL:
 *   post:
 *     tags:
 *       - file-presigned-URL
 *     summary: Contact us send details to admin                                 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: ecca.com
 *               contentType:
 *                 type: string
 *                 example: payment
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


router.post("/file-presigned-URL",
  asyncHandler(preAssignedUrl.generatePreSignedUrl));


/** * @description - This route end point is for contact us
/**
 * @swagger
 *
 * /v1/common/get-languages-timezones:
 *   post:
 *     tags:
 *       - Comman apis
 *     summary: Contact us send details to admin                                 
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


router.post("/get-languages-timezones",
  asyncHandler(commonController.getLangTimes));


/** * @description - This route end point is for contact us
/**
 * @swagger
 *
 * /v1/common/contact-us:
 *   post:
 *     tags:
 *       - Comman apis
 *     summary: Contact us send details to admin                                 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ecca.com
 *               subject:
 *                 type: string
 *                 example: payment
 *               message:
 *                 type: string
 *                 example: message hello hi bye
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


router.post("/contact-us",
  contactUsValidations,
  asyncHandler(commonController.contactUs));







module.exports = router;