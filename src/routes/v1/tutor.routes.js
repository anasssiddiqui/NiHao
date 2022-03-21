const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require("multer")
const {
  reservationRespondValidation,
  addInfoValidations,
  getProfile,
  createProfileValidations,
  changePassword, updateAccountValidations, updateSettingsValidations, updateEmailPreferences, NotificationsSettingValidations, createAvailabilityValidations, addTeachingVideoValidations, deleteVideosValidations, getReservationsValidations, weekCalendorValidations, notificationOnOfValidations,callLogsFilterValidations } = require("../../validations/tutor.validations");
const { userAuthMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/checkRole.middleware")
const { injectUserDetails, injectTutorDetails } = require("../../middlewares/injectUserDetail.middleware")
const tutorController = require("../../controllers/tutor.controller");
const asyncHandler = require('../../helper/asyncHandler')

/** * @description - This route end point is for on of notification

/**
 * @swagger
 *
 * /v1/tutor/call-Logs-Filter:
 *   post:
 *     tags:
 *       - Tutor history
 *     summary: find call logs with date filter
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: true => on notification ; false => off notification
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 example: '1-feb-2022'
 *               todate:
 *                 type: string
 *                 example: '7-feb-2022'
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
  "/call-Logs-Filter",
  callLogsFilterValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.callLogsFilter)
);

/** * @description - This route end point is for get tutor history 

/**
 * @swagger
 *
 * /v1/tutor/get-history:
 *   get:
 *     tags:
 *       - Tutor history
 *     summary: get tutor stats and history
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

 router.get(
  "/get-history",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.history)
);


/** * @description - This route end point is for on of notification

/**
 * @swagger
 *
 * /v1/tutor/notification-on-of:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: change notification status 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: true => on notification ; false => off notification
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: true
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
  "/notification-on-of",
  notificationOnOfValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.notificationOnOf)
);


/** * @description - This route end point is for get bookings from current week first date to last date

/**
 * @swagger
 *
 * /v1/tutor/week-calendor:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: get current week data 
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
 *                 example: '1-feb-2022'
 *               todate:
 *                 type: string
 *                 example: '7-feb-2022'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.post(
  "/week-calendor",
  weekCalendorValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.weekCalendor)
);



/** * @description - This route end point is for switch role

/**
 * @swagger
 *
 * /v1/tutor/switch-role:
 *   put:
 *     tags:
 *       - Tutor
 *     summary: Switch profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.put(
  "/switch-role",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.switchRole)
);


/** * @description - This route end point is for delete pofile

/**
 * @swagger
 *
 * /v1/tutor/delete-account:
 *   delete:
 *     tags:
 *       - Tutor
 *     summary: tutor profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.delete(
  "/delete-account",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.deleteAccount)
);

/** * @description - This route end point is for cources listing

/**
 * @swagger
 *
 * /v1/tutor/course-details:
 *   post:
 *     tags:
 *       - Tutor courses
 *     summary: Get every users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: '620f1ce23c53b1a820dcae5b'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
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
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.courceDetails)
);


/** * @description - This route end point is for cources listing

/**
 * @swagger
 *
 * /v1/tutor/get-courses:
 *   get:
 *     tags:
 *       - Tutor courses
 *     summary: Get every users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.get(
  "/get-courses",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.getCourses)
);


/** * @description - This route end point is for cources listing

/**
 * @swagger
 *
 * /v1/tutor/get-every-user:
 *   get:
 *     tags:
 *       - Tutor home
 *     summary: Get every users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.get(
  "/get-every-user",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.getEveryUser)
);


/** * @description - This route end point is for cources listing

/**
 * @swagger
 *
 * /v1/tutor/get-paid-users:
 *   get:
 *     tags:
 *       - Tutor home
 *     summary: Get paid users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.get(
  "/get-paid-users",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.getPaidUsers)
);

/** * @description - This route end point is for cources listing

/**
 * @swagger
 *
 * /v1/tutor/dashboard:
 *   get:
 *     tags:
 *       - Tutor home
 *     summary: Get tutors reservations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.get(
  "/dashboard",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.dashboard)
);


/** * @description - This route end point is for update notifications settings
/**
 * @swagger
 *
 * /v1/tutor/date-reservations:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: get reservations listing basic of dates                          
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: 11-feb-2022
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


router.post("/date-reservations",
  getReservationsValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.getReservations));


/** * @description - This route end point is for update notifications settings
/**
 * @swagger
 *
 * /v1/tutor/reservation-respond:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: Change reservation status 1=> for accept ,2=> for reject                          
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: 1
 *               studentId:
 *                 type: string
 *                 example: 61fa23a34e4d4f68f8db8a0b
 *               reservationId:
 *                 type: string
 *                 example: 6204a4633fcf66acc6208864
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


router.post("/reservation-respond",
  reservationRespondValidation,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.reservationRespond));



/** * @description - This route end point is for cources listing

/**
 * @swagger
 *
 * /v1/tutor/get-reservations:
 *   get:
 *     tags:
 *       - Tutor
 *     summary: Get tutors reservations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.get(
  "/get-reservations",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.reservations)
);


/** * @description - This route end point is for cources listing

/**
 * @swagger
 *
 * /v1/tutor/availability-dates-listing:
 *   get:
 *     tags:
 *       - Tutor
 *     summary: Get tutors availability dates and slots
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.get(
  "/availability-dates-listing",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.tutorsAvailableDates)
);


/** * @description - This route end point is for create account info*/

/**
 * @swagger
 *
 * /v1/tutor/create-availability:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: Create new avalibility dates                                 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: date
 *                 example: [{"date":"9-sept-2026","slots":[{"startTime":"9:00","endTime":"10:00"},{"startTime":"11:00","endTime":"12:00"}]},{"date":"10-sept-20026","slots":[{"startTime":"9:00","endTime":"10:00"},{"startTime":"7:00","endTime":"8:00"}]}]
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


router.post("/create-availability",
  createAvailabilityValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.createAvailability));


/** * @description - This route end point is for cources listing

/**
 * @swagger
 *
 * /v1/tutor/courses-listing:
 *   get:
 *     tags:
 *       - Tutor
 *     summary: Get cources listing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.get(
  "/courses-listing",
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.courcesListing)
);


/** * @description - This route end point is for update notifications settings
/**
 * @swagger
 *
 * /v1/tutor/update-notificattions-setting:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: update account details                                 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receive24HourAdvanceEmailsEnabled:
 *                 type: string
 *                 example: true
 *               advanceWarningEnabled:
 *                 type: string
 *                 example: true
 *               receiveStudentMessageEnabled:
 *                 type: string
 *                 example: true
 *               reservationConfirmedNotification:
 *                 type: string
 *                 example: true
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


router.post("/update-notificattions-setting",
  NotificationsSettingValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.updateNotificationsSetting));


/** * @description - This route end point is for email preferences
/**
 * @swagger
 *
 * /v1/tutor/update-email-preferences:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: update account details                                 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messagesEnabled:
 *                 type: string
 *                 example: true
 *               promotionsEnabled:
 *                 type: string
 *                 example: true
 *               lessionAndProgressEnabled:
 *                 type: string
 *                 example: true
 *               scheduleUpdateEnabled:
 *                 type: string
 *                 example: true
 *               referralEnabled:
 *                 type: string
 *                 example: true
 *               accountUpdateEnabled:
 *                 type: string
 *                 example: true
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


router.post("/update-email-preferences",
  updateEmailPreferences,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.updateEmailPreferences));



/** * @description - This route end point is for Update Account
 * 
/**
 * @swagger
 *
 * /v1/tutor/update-settings:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: update account details                                 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appLanguage:
 *                 type: string
 *                 example: john
 *               location:
 *                 type: string
 *                 example: doe
 *               timezone:
 *                 type: string
 *                 example: 123567878
 *               desktopNotifications:
 *                 type: string
 *                 example: true
 *               shareMyVideos:
 *                 type: string
 *                 example: true
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


router.post("/update-settings",
  updateSettingsValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.updateSettings));



/** * @description - This route end point is for Update Account
/**
 * @swagger
 *
 * /v1/tutor/update-account:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: update account details                                 
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
 *                 example: doe
 *               mobile:
 *                type: string
 *                example: 123567878
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


router.post("/update-account",
  updateAccountValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.updateAccount));



/** * @description - This route end point is for change password*/

/**
 * @swagger
 *
 * /v1/tutor/change-password:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: change current password                                  
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
 *                 example: 123456
 *               oldPassword:
 *                 type: string
 *                 example: 123
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
  changePassword,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.changePassword));



/** * @description - This route end point is for add new teacher teaching video

/**
 * @swagger
 *
 * /v1/tutor/add-teaching-video:
 *   post:
 *     tags:
 *       - Tutor teaching videos
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teachingVideo:
 *                 type: string
 *                 example: {"file":"video","title":"video"}
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

router.post("/add-teaching-video",
  addTeachingVideoValidations,
  userAuthMiddleware,
  injectTutorDetails,
  asyncHandler(tutorController.addTeachingVideo));


/** * @description - This route end point is for create account info*/

/**
 * @swagger
 *
 * /v1/tutor/delete-teaching-videos:
 *   post:
 *     tags:
 *       - Tutor teaching videos
 *     summary: Delete teaching                                 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
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


router.post("/delete-teaching-videos",
  userAuthMiddleware,
  injectTutorDetails,
  deleteVideosValidations,
  asyncHandler(tutorController.deleteVideos));


/** * @description - This route end point is for set get videos details

/**
 * @swagger
 *
 * /v1/tutor/get-teaching-videos:
 *   get:
 *     tags:
 *       - Tutor teaching videos
 *     summary: tutor profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.get(
  "/get-teaching-videos",
  userAuthMiddleware,
  getProfile,
  injectTutorDetails,
  asyncHandler(tutorController.getTeachingVideos)
);


/** * @description - This route end point is for create account info*/

/**
 * @swagger
 *
 * /v1/tutor/create-profile:
 *   post:
 *     tags:
 *       - Tutor
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
 *                 example: 'https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643267648392sampleImage.png'
 *               firstName:
 *                 type: string
 *                 example: anas
 *               lastName:
 *                 type: string
 *                 example: khan
 *               dob:
 *                 type: string
 *                 example: 11/15/2018
 *               interest:
 *                 type: string
 *                 example: Sports
 *               comfortLevel:
 *                 type: string
 *                 example: Okey
 *               level:
 *                 type: string
 *                 example: Lower Intermediate
 *               personality:
 *                 type: string
 *                 example: Kind And Patient
 *               resume:
 *                 type: string
 *                 example: 'https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643267648392sampleImage.png'
 *               teachingVideos:
 *                 type: string
 *                 example: [{"file":"file1","title":"title video"},{"file":"file2","title":"title video"}]
 *               mobile:                                
 *                 type: string
 *                 example: 212121212
 *               goal:
 *                 type: string
 *                 example: to be a best teacher
 *               bio:
 *                 type: string
 *                 example: all about me
 *               currentFocus:
 *                 type: string
 *                 example: professional development
 *               specialitys:
 *                 type: String
 *                 example: [
 *                  friends,others
 *                  ]
 *               courses:
 *                 type: String
 *                 example: [
 *                  61efca40677135bcaaf6deb9,61efca40677135bcaaf6deb9
 *                  ]
 *               certificate:
 *                  type: string
 *                  example: 'https://ni-hao-storage.s3.us-east-2.amazonaws.com/1643267648392sampleImage.png'
 *               uploadStatus:
 *                  type: string
 *                  example: ccl
 *               certificateType:
 *                  type: string
 *                  example: cdacl
 *               country:
 *                  type: string
 *                  example: cdacscscl
 *               city:
 *                  type: string
 *                  example: mumbai
 *               state:
 *                  type: string
 *                  example: maharstra
 *               address:
 *                  type: string
 *                  example: andheri
 *               currentPreviousProfession:
 *                  type: string
 *                  example: cqlsys
 *               experience:
 *                  type: string
 *                  example: experience
 *               education:
 *                  type: string
 *                  example: ba
 *               languages:
 *                  type: string
 *                  example: [{"language":"english","level":"expert"},{"language":"arabic","level":"expert"},]
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


router.post("/create-profile",
  userAuthMiddleware,
  injectTutorDetails,
  createProfileValidations,
  asyncHandler(tutorController.createProfile));





/** * @description - This route end point is for add information

/**
 * @swagger
 *
 * /v1/tutor/add-information:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: tutor profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: string
 *                 example: to be a best teacher
 *               bio:
 *                 type: string
 *                 example: all about me
 *               currentFocus:
 *                 type: string
 *                 example: professional development
 *               myTutoringStyle:
 *                 type: string
 *                 example: fun & loving
 *               bestAt:
 *                 type: string
 *                 example: expert
 *               country: 
 *                 type: string
 *                 example: Usa 
 *               specialitys:
 *                 type: String
 *                 example: [
 *                  friends,others
 *                  ]
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.post(
  "/add-information",
  userAuthMiddleware,
  addInfoValidations,
  asyncHandler(tutorController.addInformation)
);


/** * @description - This route end point is for set new password

/**
 * @swagger
 *
 * /v1/tutor/get-profile:
 *   post:
 *     tags:
 *       - Tutor
 *     summary: tutor profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         descriptioprofilen: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 *
 */

router.post(
  "/get-profile",
  userAuthMiddleware,
  getProfile,
  asyncHandler(tutorController.getProfile)
);





module.exports = router;