const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require("multer")
const {
  deleteCourseValidations,
  CourceDetailsValidations,
  createCourcesValidations,
  updateCourseValidations,
} = require("../../../../validations/adminValidations/courses.validations");
const { userAuthMiddleware } = require("../../../../middlewares/auth.middleware")
const { checkRole } = require("../../../../middlewares/checkRole.middleware")
const { injectAdminDetails } = require("../../../../middlewares/injectUserDetail.middleware")
const adminCourcesController = require("../../../../controllers/adminControllers/superAdminControllers/adminCources.controller");

const asyncHandler = require('../../../../helper/asyncHandler')


/**
 * @swagger
 *
 * /v1/admin/courses/update-course:
 *   put:
 *     tags:
 *       - Admin Cources
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
 *               id:
 *                 type: string
 *                 example: '620f1ce23c53b1a820dcae5b'
 *               courseFor:
 *                 type: string
 *                 example: 'For School'
 *               name:
 *                 type: string
 *                 example: 'casc'
 *               categoryId:
 *                 type: string
 *                 example: 'cascas'
 *               schoolName:
 *                 type: string
 *                 example: 'fasfas'
 *               schoolId:
 *                 type: string
 *                 example: 'fwffsf'
 *               schoolCountry:
 *                 type: string
 *                 example: 'wfsafasf'
 *               experienceLevel:
 *                 type: string
 *                 example: 'wffasfasf'
 *               whyTakeThisCourse:
 *                 type: string
 *                 example: 'gsdggsdg'
 *               ableToDo:
 *                 type: string
 *                 example: 'Hello hi bye'
 *               preRequisites:
 *                 type: string
 *                 example: 'veveffaf'
 *               shortDescription:
 *                 type: string
 *                 example: 'short description'
 *               coverImage:
 *                 type: string
 *                 example: 'https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png'
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

 router.put(
  "/update-course",
  userAuthMiddleware,
  updateCourseValidations,
  injectAdminDetails,
  asyncHandler(adminCourcesController.updateCourse));

/**
 * @swagger
 *
 * /v1/admin/courses/delete-course:
 *   delete:
 *     tags:
 *       - Admin Cources
 *     summary:  delete course
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: delete course
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: '620c9dcf205c875a7bcb3b9f'
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

router.delete(
  "/delete-course",
  deleteCourseValidations,
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminCourcesController.deleteCourse));

/**
 * @swagger
 *
 * /v1/admin/courses/course-details:
 *   post:
 *     tags:
 *       - Admin Cources
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
 *               id:
 *                 type: string
 *                 example: 'casc'
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
  "/course-details",
  CourceDetailsValidations,
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminCourcesController.CourceDetails));


/**
 * @swagger
 *
 * /v1/admin/courses/create-courses:
 *   post:
 *     tags:
 *       - Admin Cources
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
 *               courseFor:
 *                 type: string
 *                 example: 'For School'
 *               name:
 *                 type: string
 *                 example: 'casc'
 *               categoryId:
 *                 type: string
 *                 example: 'cascas'
 *               schoolName:
 *                 type: string
 *                 example: 'fasfas'
 *               schoolId:
 *                 type: string
 *                 example: 'fwffsf'
 *               schoolCountry:
 *                 type: string
 *                 example: 'wfsafasf'
 *               experienceLevel:
 *                 type: string
 *                 example: 'wffasfasf'
 *               whyTakeThisCourse:
 *                 type: string
 *                 example: 'gsdggsdg'
 *               ableToDo:
 *                 type: string
 *                 example: 'Hello hi bye'
 *               preRequisites:
 *                 type: string
 *                 example: 'veveffaf'
 *               shortDescription:
 *                 type: string
 *                 example: 'short description'
 *               coverImage:
 *                 type: string
 *                 example: 'https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png'
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
  "/create-courses",
  userAuthMiddleware,
  createCourcesValidations,
  injectAdminDetails,
  asyncHandler(adminCourcesController.createCources));


// /** * @description - This route end point is for get account info */

/**
 * @swagger
 *
 * /v1/admin/courses/courses-list:
 *   get:
 *     tags:
 *       - Admin Cources
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
  "/courses-list",
  userAuthMiddleware,
  asyncHandler(adminCourcesController.CourcesListing)
);


module.exports = router;