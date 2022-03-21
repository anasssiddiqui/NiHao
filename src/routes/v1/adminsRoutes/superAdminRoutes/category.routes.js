const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require("multer")
const {
  createCategoryValidations
} = require("../../../../validations/adminValidations/category.validations");
const { userAuthMiddleware } = require("../../../../middlewares/auth.middleware")
const { checkRole } = require("../../../../middlewares/checkRole.middleware")
const { injectAdminDetails } = require("../../../../middlewares/injectUserDetail.middleware")
const adminCategoryController = require("../../../../controllers/adminControllers/superAdminControllers/adminCategory.controller");

const asyncHandler = require('../../../../helper/asyncHandler')


/**
 * @swagger
 *
 * /v1/admin/category/delete-category:
 *   post:
 *     tags:
 *       - Admin Category
 *     summary:  add new cource
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: add new cource
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'testing category'
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
  "/delete-category",
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminCategoryController.deleteCategory));


/**
 * @swagger
 *
 * /v1/admin/category/create-category:
 *   post:
 *     tags:
 *       - Admin Category
 *     summary:  add new cource
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: add new cource
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'testing category'
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
  "/create-category",
  userAuthMiddleware,
  createCategoryValidations,
  injectAdminDetails,
  asyncHandler(adminCategoryController.createCategory));


// /** * @description - This route end point is for categoryList

/**
 * @swagger
 *
 * /v1/admin/category/category-list:
 *   get:
 *     tags:
 *       - Admin Category
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
  "/category-list",
  userAuthMiddleware,
  asyncHandler(adminCategoryController.CategoryListing)
);


module.exports = router;