const express = require("express");
const router = express.Router();
const { updateAccountValidation,
    updateProfileValidation,
    updateSettingValidation,
    likeDislikeTutorValidation,
    getSlotsValidation,
    getCalendorBookingsValidations,
    cancelClassValidations,
    todayLessonStatusValidations,
    giveRatingsValidations,
    sumbitReviewsValidations,
    removeVideoValidations
} = require("../../validations/student.validations")
const { userAuthMiddleware } = require("../../middlewares/auth.middleware")
const { checkRole } = require("../../middlewares/checkRole.middleware")
const { injectUserDetails } = require("../../middlewares/injectUserDetail.middleware")
const studentController = require("../../controllers/student.controller");
const asyncHandler = require('../../helper/asyncHandler')




/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/student/remove-video:
 *   post:
 *     tags:
 *       - Student
 *     summary: This route use send today lesson status
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
 *                 example: '6229eb0f3372b79a74f6bc27'
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

 router.post("/remove-video",
 userAuthMiddleware,
 checkRole(["student"]),
 injectUserDetails,
 removeVideoValidations,
 asyncHandler(studentController.removeVideo));


/** * @description - This route end point is for get all hide tutors 

/**
 * @swagger
 *
 * /v1/student/progress-report:
 *   get:
 *     tags:
 *       - Student
 *     summary: get progress report
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

 router.get("/progress-report",
 userAuthMiddleware,
 checkRole(["student"]),
 injectUserDetails,
 asyncHandler(studentController.progressReport));


/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/student/submit-reviews:
 *   post:
 *     tags:
 *       - Student ratings
 *     summary: This route use send today lesson status
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
 *                 example: '6229eb0f3372b79a74f6bc27'
 *               review:
 *                 type: string
 *                 example: 'nice one'
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

router.post("/submit-reviews",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    sumbitReviewsValidations,
    asyncHandler(studentController.sumbitReviews));



/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/student/give-ratings:
 *   post:
 *     tags:
 *       - Student ratings
 *     summary: This route use send today lesson status
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tutorId:
 *                 type: string
 *                 example: '621cbf8ac6c8a72c40c6d775'
 *               review:
 *                 type: string
 *                 example: 'nice one'
 *               ratings:
 *                 type: string
 *                 example: '5'
 *               comments:
 *                 type: string
 *                 example: [best,good]
 *               invitationId:
 *                 type: string
 *                 example: '62287dfb1bce36274ca38b0d'
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

router.post("/give-ratings",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    giveRatingsValidations,
    asyncHandler(studentController.giveRatings));


/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/student/today-lesson-status:
 *   post:
 *     tags:
 *       - Student
 *     summary: This route use send today lesson status
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invitationId:
 *                 type: string
 *                 example: '62287dfb1bce36274ca38b0d'
 *               isCompleteLesson:
 *                 type: string
 *                 example: 'complete'
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

router.post("/today-lesson-status",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    todayLessonStatusValidations,
    asyncHandler(studentController.todayLessonStatus));



/** * @description - This route end point is for get all hide tutors 

/**
 * @swagger
 *
 * /v1/student/get-hide-tutors:
 *   get:
 *     tags:
 *       - Student
 *     summary: get all hide tutors listing
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

router.get("/get-hide-tutors",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.hideTutorsListing));


/** * @description - This route end point is for get all courses 

/**
 * @swagger
 *
 * /v1/student/switch-role:
 *   put:
 *     tags:
 *       - Student
 *     summary: Get all courses listing
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

router.put("/switch-role",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.switchRole));

/** * @description - This route end point is for get all courses 

/**
 * @swagger
 *
 * /v1/student/our-courses:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get all courses listing
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

router.get("/our-courses",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.ourCourses));


/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/student/cancel-class:
 *   post:
 *     tags:
 *       - Student
 *     summary: This route use for cancel calls 
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
 *                 example: '62133de0b09edc1733affb58'
 *               cancelComment:
 *                 type: string
 *                 example: 'buzy on this date'
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

router.post("/cancel-class",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    cancelClassValidations,
    asyncHandler(studentController.cancelClass));


/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/student/get-calendor-bookings:
 *   post:
 *     tags:
 *       - Student
 *     summary: Get bookings basic of calendor dare
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
 *                 example: 12-feb-2022
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

router.post("/get-calendor-bookings",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    getCalendorBookingsValidations,
    asyncHandler(studentController.getCalendorBookings));

/** * @description - This route end point is for get subscription plan

/**
 * @swagger
 *
 * /v1/student/reserve-booking:
 *   post:
 *     tags:
 *       - Student
 *     summary: Reserve booking sucessfully
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tutorId:
 *                 type: string
 *                 example: 61f24e3e0a51e489b3f36c64
 *               slotId:
 *                 type: string
 *                 example: 61fcdd4edec733f74c11bc13
 *               availabilityId:
 *                 type: string
 *                 example: 61fcdd4edec733f74c11bc12
 *               date: 
 *                 type: date
 *                 example: 9-sep-2022
 *               timeFrom: 
 *                 type: string
 *                 example: 9:00
 *               timeTo: 
 *                 type: string
 *                 example: 10:00    
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

router.post("/reserve-booking",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.reserveBooking));


/** * @description - This route end point is for get subscription plan

/**
 * @swagger
 *
 * /v1/student/purchase-subscription:
 *   post:
 *     tags:
 *       - Student subscription
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minutes:
 *                 type: string
 *                 example: 15
 *               days:
 *                 type: number
 *                 example: 1
 *               month:
 *                 type: number
 *                 example: 1
 *               currency:
 *                 type: string
 *                 example: dollar
 *               duration:
 *                 type: number
 *                 example: 1
 *               amount:
 *                 type: number
 *                 example: 200         
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

router.post("/purchase-subscription",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.purchaseSubscription));


/** * @description - This route end point is for get subscription plan

/**
 * @swagger
 *
 * /v1/student/get-subscription-plan:
 *   post:
 *     tags:
 *       - Student subscription
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minutes:
 *                 type: string
 *                 example: 15
 *               days:
 *                 type: string
 *                 example: 1
 *               month:
 *                 type: string
 *                 example: 1         
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

router.post("/get-subscription-plan",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.getSubscriptionPlan));


/** * @description - This route end point is for follow tutor */

/**
 * @swagger
 *
 * /v1/student/get-slots:
 *   post:
 *     tags:
 *       - Student
 *     summary: Get tutors slots for bookings
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
 *                 example: 9-sept-2026
 *               tutorId:
 *                 type: string
 *                 example: 61f24e3e0a51e489b3f36c64            
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

router.post("/get-slots",
    getSlotsValidation,
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.getSlots));


/** * @description - This route end point is for follow tutor */

/**
 * @swagger
 *
 * /v1/student/search-Tutor:
 *   post:
 *     tags:
 *       - Student
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               level:
 *                 type: string
 *                 example: ["Lower Intermediate"]
 *               courseId:
 *                 type: string
 *                 example: ["61efca40677135bcaaf6deb9"]
 *               languages:
 *                 type: string
 *                 example: ["arabics","english"]   
 *               personality:
 *                 type: string
 *                 example: ["Kind And Patient"]
 *               date:
 *                 type: string
 *                 example: 9-sept-2026             
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

router.post("/search-Tutor",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.searchTutor));


/** * @description - This route end point is for favrouite tutors */

/**
 * @swagger
 *
 * /v1/student/filter-cources-listing:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get filter cources listing
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

router.get("/filter-cources-listing",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.filterCourcesListing));


/** * @description - This route end point is for favrouite tutors */

/**
 * @swagger
 *
 * /v1/student/fav-tutors-List:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get profile info
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

router.get("/fav-tutors-List",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.favTutorsList));



/** * @description - This route end point is for follow tutor */

/**
 * @swagger
 *
 * /v1/student/unfollow-tutor:
 *   post:
 *     tags:
 *       - Student follow unfollow
 *     summary: Update account info
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
 *                 example: 423v23cv43434
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

router.post("/unfollow-tutor",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.unfollowTutor));

/** * @description - This route end point is for follow tutor */

/**
 * @swagger
 *
 * /v1/student/follow-tutor:
 *   post:
 *     tags:
 *       - Student follow unfollow
 *     summary: Update account info
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
 *                 example: 423v23cv43434
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

router.post("/follow-tutor",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.followTutor));


/** * @description - This route end point is for like dislike tutor*/

/**
 * @swagger
 *
 * /v1/student/hide-tutor:
 *   post:
 *     tags:
 *       - Student hide Unhide
 *     summary: Update account info
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
 *                 example: 423v23cv43434
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

router.post("/hide-tutor",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.hideTutor));

/** * @description - This route end point is for unhide tutor */

/**
 * @swagger
 *
 * /v1/student/unhide-tutor:
 *   post:
 *     tags:
 *       - Student hide Unhide
 *     summary: Update account info
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
 *                 example: 423v23cv43434
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

router.post("/unhide-tutor",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.unhideTutor));


/** * @description - This route end point is for add in  tutor to notify user*/

/**
 * @swagger
 *
 * /v1/student/add-notify:
 *   post:
 *     tags:
 *       - Student notify
 *     summary: Update account info
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
 *                 example: 423v23cv43434
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

router.post("/add-notify",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.notifyTeacherOnline));


/** * @description - This route end point is for remove notify list*/

/**
 * @swagger
 *
 * /v1/student/remove-notify:
 *   post:
 *     tags:
 *       - Student notify
 *     summary: Update account info
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
 *                 example: 423v23cv43434
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

router.post("/remove-notify",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.removeNotify));

/** * @description - This route end point is for set new password

/**
 * @swagger
 *
 * /v1/student/tutor-details:
 *   post:
 *     tags:
 *       - Student
 *     summary: Set new password for Ambassador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 423v23cv43434
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
    "/tutor-details",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.tutorDetails)
);




/** * @description - This route end point is for get account info */

/**
 * @swagger
 *
 * /v1/student/tutors-list:
 *   get:
 *     tags:
 *       - Student
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

router.get("/tutors-list",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.getTutorsList));

/** * @description - This route end point is for like dislike tutor*/

/**
 * @swagger
 *
 * /v1/student/likeDislikeTutor:
 *   post:
 *     tags:
 *       - Student
 *     summary: Update account info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tutorId:
 *                 type: string
 *                 example: 423v23cv43434
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

router.post("/likeDislikeTutor",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    likeDislikeTutorValidation,
    asyncHandler(studentController.likeDislikeTutor));



/** * @description - This route end point is for get account info */

/**
 * @swagger
 *
 * /v1/student/account-info:
 *   get:
 *     tags:
 *       - Student
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

router.get("/account-info",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.getAccountInfo));

/** * @description - This route end point is for update account info*/

/**
 * @swagger
 *
 * /v1/student/account-info:
 *   post:
 *     tags:
 *       - Student
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
 *               email:
 *                 type: string
 *                 example: email@ex.in
 *               mobile: 
 *                 type: string
 *                 example: 3214569870
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

router.post("/account-info",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    updateAccountValidation,
    asyncHandler(studentController.updateAccountInfo));

/** * @description - This route end point is for get profile info */

/**
 * @swagger
 *
 * /v1/student/profile-info:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get profile info
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

router.get("/profile-info",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.getProfileInfo));

/** * @description - This route end point is for update profile info*/

/**
 * @swagger
 *
 * /v1/student/update-profile-info:
 *   post:
 *     tags:
 *       - Student
 *     summary: Update profile info
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 example: "aws image link"
 *               country:
 *                 type: string
 *                 example: ch
 *               gender:
 *                 type: string
 *                 example: Doe
 *               dob:
 *                 type: string
 *                 example: dd/mm/yyyy
 *               level:
 *                 type: string
 *                 example: begineer
 *               goal:
 *                 type: string
 *                 example: any string
 *               bio:
 *                 type: string
 *                 example: any string
 *               corrections:
 *                 type: string
 *                 example: any string
 *               currentFocus:
 *                 type: string
 *                 example: any string
 *               comfortLevel:
 *                 type: string
 *                 example: any string
 *               interest:
 *                 type: string
 *                 example: any string
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

router.post("/update-profile-info",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    updateProfileValidation,
    asyncHandler(studentController.updateProfileInfo));

/** * @description - This route end point is for get setting info */

/**
 * @swagger
 *
 * /v1/student/setting-info:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get setting info
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

router.get("/setting-info",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.getSettingInfo));

/** * @description - This route end point is for update setting info*/

/**
 * @swagger
 *
 * /v1/student/setting-info:
 *   post:
 *     tags:
 *       - Student
 *     summary: Update setting info
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
 *                 example: ch
 *               location:
 *                 type: string
 *                 example: ind
 *               timeZone:
 *                 type: string
 *                 example: mumbai
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

router.post("/setting-info",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    updateSettingValidation,
    asyncHandler(studentController.updateSettingInfo));

/** * @description - This route end point is for get email preference */

/**
 * @swagger
 *
 * /v1/student/email-preference:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get email preference
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

router.get("/email-preference",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.getEmailPreference));

/** * @description - This route end point is for update email preference*/

/**
 * @swagger
 *
 * /v1/student/email-preference:
 *   post:
 *     tags:
 *       - Student
 *     summary: Update email preference
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messagesEnabled:
 *                 type: boolean
 *                 example: false
 *               promotionsEnabled:
 *                 type: boolean
 *                 example: true
 *               lessionAndProgressEnabled:
 *                 type: boolean
 *                 example: false
 *               scheduleUpdateEnabled:
 *                 type: boolean
 *                 example: true
 *               referralEnabled:
 *                 type: boolean
 *                 example: false
 *               accountUpdateEnabled:
 *                 type: boolean
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

router.post("/email-preference",
    userAuthMiddleware,
    checkRole(["student"]),
    injectUserDetails,
    asyncHandler(studentController.updateEmailPreference));

module.exports = router;