const express = require("express");
const router = express.Router();
const { addAdditionalInfo,
    createProfile
} = require("../../validations/ambassador.validations")
const { userAuthMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/checkRole.middleware")
const { injectAmbassadorDetails } = require("../../middlewares/injectUserDetail.middleware")
const uploadAmbassadorImage = require("../../middlewares/multer")

const ambassadorController = require("../../controllers/ambassador.controller");
const asyncHandler = require('../../helper/asyncHandler')


/**
 * @swagger
 *
 * /v1/ambassador/update-bank-Details:
 *   post:
 *     tags:
 *       - Ambassador
 *     summary:  create  update bank details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: create  update bank details send bank details in object
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankDetails:
 *                 type: object
 *                 properties:
 *                   bankAccountNo:
 *                     type: string
 *                     example: '54542154125454'
 *                   bankName:
 *                     type: string
 *                     example: Axis
 *                   swiftCode:
 *                     type: string
 *                     example: web
 *                   bankCountry:
 *                     type: string
 *                     example: in
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
    "/update-bank-Details",
    userAuthMiddleware,
    checkRole(["ambassador"]),
    injectAmbassadorDetails,
    asyncHandler(ambassadorController.updateBankDetails)
);

/** * @description - This route end point is for update account info*/

/**
 * @swagger
 *
 * /v1/ambassador/dashbord-listing:
 *   post:
 *     tags:
 *       - Ambassador
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 example: 10-feb-2022
 *               toDate:
 *                 type: string
 *                 example: 23-feb-2022
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

router.post("/dashbord-listing",
    userAuthMiddleware,
    checkRole(["ambassador"]),
    injectAmbassadorDetails,
    asyncHandler(ambassadorController.dashboardListing));



/** * @description - This route end point is for create account info*/

/**
 * @swagger
 *
 * /v1/ambassador/createProfile:
 *   post:
 *     tags:
 *       - Ambassador
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: 'https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643611986167sampleImage.png'
 *               ambassadorType:
 *                 type: string
 *                 example: tutorBroker
 *               passportName:
 *                 type: string
 *                 example: john 
 *               mobile:
 *                 type: string
 *                 example: 989898
 *               email:
 *                 type: string
 *                 example: ambassador.com
 *               ambassadorId: 
 *                 type: string
 *                 example: 78787878
 *               country:
 *                 type: string
 *                 example: dubai
 *               city:
 *                 type: string
 *                 example: Al Khawaneej
 *               language:
 *                 type: string
 *                 example: spanish
 *               gender:
 *                 type: string
 *                 example: male
 *               dob:
 *                 type: Date
 *                 example: 12/5/1998
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


router.post("/createProfile",
    userAuthMiddleware,
    checkRole(["ambassador"]),
    injectAmbassadorDetails,
    asyncHandler(ambassadorController.createProfile));


/** * @description - This route end point is for get account info */

/**
 * @swagger
 *
 * /v1/ambassador/getAccountInfo:
 *   get:
 *     tags:
 *       - Ambassador
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
router.get("/getAccountInfo",
    userAuthMiddleware,
    checkRole(["ambassador"]),
    injectAmbassadorDetails,
    asyncHandler(ambassadorController.getAccountInfo));





/** * @description - This route end point is for update account info*/

/**
 * @swagger
 *
 * /v1/ambassador/addAdditionalInfo:
 *   post:
 *     tags:
 *       - Ambassador
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: john
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               userName:
 *                 type: string
 *                 example: username544
 *               sharedLinks:
 *                 type: string
 *                 example: linked/userId
 *               howPromote: 
 *                 type: string
 *                 example: we share with our friends
 *               ambassadorType: 
 *                 type: string
 *                 example: schoolBroker
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

router.post("/addAdditionalInfo",
    userAuthMiddleware,
    checkRole(["ambassador"]),
    injectAmbassadorDetails,
    asyncHandler(ambassadorController.addAdditionalInfo));


/** * @description - This route end point is for update account info*/

/**
 * @swagger
 *
 * /v1/ambassador/change-password:
 *   post:
 *     tags:
 *       - Ambassador
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: 123
 *               oldPassword:
 *                 type: string
 *                 example: 123456
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

router.post("/change-password",
    userAuthMiddleware,
    checkRole(["ambassador"]),
    injectAmbassadorDetails,
    asyncHandler(ambassadorController.changePassword));



module.exports = router;