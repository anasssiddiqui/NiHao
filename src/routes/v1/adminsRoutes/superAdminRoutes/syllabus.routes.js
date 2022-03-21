const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require("multer")
const { syllabusListValidation, addSyllabusValidation, deleteSyllabusValidations } = require("../../../../validations/adminValidations/admins.validations");
const { userAuthMiddleware } = require("../../../../middlewares/auth.middleware")
const { checkRole } = require("../../../../middlewares/checkRole.middleware")
const { injectAdminDetails } = require("../../../../middlewares/injectUserDetail.middleware")
const adminSyllabus = require("../../../../controllers/adminControllers/superAdminControllers/adminSyllabus.controller");

const asyncHandler = require('../../../../helper/asyncHandler')

var storage = multer.diskStorage({

  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, '../../../../../public/courses'))
  },

  filename: (req, file, cb) => {

    cb(null, Date.now() + path.extname(file.originalname))
    const filePath = '/courses/' + Date.now() + path.extname(file.originalname)
    file.filePath = filePath
  },

})

const lessonFile = multer({ storage: storage })
const upload = multer({
  storage: storage
}).fields([{ name: "coverImage", maxCount: 1 }, { name: "videos" }]);

/** * @description - This route end point is for update syllabus */

/**
* @swagger
*
* /v1/admin/syllabus/update-syllabus:
*   put:
*     tags:
*       - Admin syllabus
*     summary:  update syllabus
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: delete lessons
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*                 example: '620cb29d6e4a444d788728c9'
*               categoryId:
*                 type: string
*                 example: '620c8dd31194797eb804dc88'
*               title:
*                 type: string
*                 example: 'testing title'
*               description:
*                 type: string
*                 example: 'testing description'
*               file:
*                 type: string
*                 example: [https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png,https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png]
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
  "/update-syllabus",
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSyllabus.updateSyllabus));


// this route is for Delete syllabus 

/**
* @swagger
*
* /v1/admin/syllabus/delete-syllabus:
*   post:
*     tags:
*       - Admin syllabus
*     summary:  delete lessons
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: delete syllabus
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*                 example: 'casc'
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
  "/delete-syllabus",
  deleteSyllabusValidations,
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSyllabus.deleteSyllabus));

// this route is for lessons listing with course id

/**
* @swagger
*
* /v1/admin/syllabus/syllabus-listing:
*   post:
*     tags:
*       - Admin syllabus
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
  "/syllabus-listing",
  syllabusListValidation,
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSyllabus.syllabuslisting));


// this route is for create syllabus with course id

/**
 * @swagger
 *
 * /v1/admin/syllabus/create-syllabus:
 *   post:
 *     tags:
 *       - Admin syllabus
 *     summary:  add new syllabus
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: add new syllabus
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: '620c8dd31194797eb804dc88'
 *               categoryId:
 *                 type: string
 *                 example: '620c8dd31194797eb804dc88'
 *               title:
 *                 type: string
 *                 example: 'testing title'
 *               description:
 *                 type: string
 *                 example: 'testing description'
 *               file:
 *                 type: string
 *                 example: [https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png,https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png]
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
  "/create-syllabus",
  addSyllabusValidation,
  userAuthMiddleware,
  injectAdminDetails,
  asyncHandler(adminSyllabus.createSyllabus));


module.exports = router;