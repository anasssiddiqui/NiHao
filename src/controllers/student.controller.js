const studentService = require("../services/student.services");
const { BadRequest } = require("../utility/apiError");
const { SuccessResponse } = require("../utility/apiResponse");

//Controller Functions

/**
 * @description - This controller is used for get hide tutors listing
 */

const removeVideo = async (req, res, next) => {
   await studentService.removeVideo({ user: req.user, body: req.body });
   return res.send("remove video sucessfully")
};

/**
 * @description - This controller is used for get hide tutors listing
 */

const progressReport = async (req, res, next) => {
   const { progress } = await studentService.progressReport({ user: req.user, body: req.body });
   return new SuccessResponse("sumbit reviews sucessfully", { progress }).send(res);

};

/**
 * @description - This controller is used for get hide tutors listing
 */

const sumbitReviews = async (req, res, next) => {
   await studentService.sumbitReviews({ user: req.user, body: req.body });
   return res.send("sumbit reviews sucessfully")
};



/**
 * @description - This controller is used for give ratings to tutor
 */

const giveRatings = async (req, res, next) => {
   const { giveRatings } = await studentService.giveRatings({ user: req.user, body: req.body });
   return new SuccessResponse("submit ratings sucessfully", { giveRatings }).send(res);
};

/**
 * @description - This controller is used for get hide tutors listing
 */

const todayLessonStatus = async (req, res, next) => {
   await studentService.todayLessonStatus({ user: req.user, body: req.body });
   return res.send("update status sucessfully")
};

/**
 * @description - This controller is used for get hide tutors listing
 */

const hideTutorsListing = async (req, res, next) => {
   const { findTutors } = await studentService.hideTutorsListing({ user: req.user, body: req.body });
   return new SuccessResponse("Fetch listing sucessfully", { findTutors }).send(res);
};

/**
 * @description - This controller is used for add lesson prefrences
 */

const switchRole = async (req, res, next) => {
   const { details } = await studentService.switchRole({ user: req.user, body: req.body });
   return new SuccessResponse("switch role sucessfully", { details }).send(res);
};


/**
 * @description - This controller is used for add lesson prefrences
 */

const ourCourses = async (req, res, next) => {
   const { findCourse } = await studentService.ourCourses({ user: req.user, body: req.body });
   return new SuccessResponse("Get courses listing sucessfully", { findCourse }).send(res);
};

/**
 * @description - This controller is used for add lesson prefrences
 */

const cancelClass = async (req, res, next) => {
   await studentService.cancelClass({ user: req.user, body: req.body });
   return res.send("Cancel class sucessfully")
};


/**
 * @description - This controller is used for add lesson prefrences
 */

const getCalendorBookings = async (req, res, next) => {
   const { findReservations } = await studentService.getCalendorBookings({ user: req.user, body: req.body });
   return new SuccessResponse("Get data sucessfully", { findReservations }).send(res);
};


/**
 * @description - This controller is used for add lesson prefrences
 */

const lessonPrefrences = async (req, res, next) => {
   await studentService.lessonPrefrences({ user: req.user, body: req.body });
   return res.send("Add lesson prefrencess successfully")
};


/**
 * @description - This controller is used for reserve booking
 */

const reserveBooking = async (req, res, next) => {
   await studentService.reserveBooking({ user: req.user, body: req.body });
   return res.send("Reserve booking successfully")
};

/**
 * @description - This controller is used for purchase subscription
 */

const purchaseSubscription = async (req, res, next) => {
   await studentService.purchaseSubscription({ user: req.user, body: req.body });
   return res.send("Purchase subscription successfully")
};

/**
 * @description - This controller is used for search tutor
 */

const getSubscriptionPlan = async (req, res, next) => {
   const { plans } = await studentService.getSubscriptionPlan({ body: req.body });
   return new SuccessResponse("Get data sucessfully", { plans }).send(res);
};


/**
 * @description - This controller is used for search tutor
 */

const getSlots = async (req, res, next) => {
   const { slots } = await studentService.getSlots({ user: req.user, body: req.body });
   return new SuccessResponse("Get slots listing sucessfully", { slots }).send(res);
};


/**
 * @description - This controller is used for search tutor
 */

const searchTutor = async (req, res, next) => {
   const { tutorDetails } = await studentService.searchTutor({ user: req.user, body: req.body });
   return new SuccessResponse("Get Tutors listing sucessfully", { tutorDetails }).send(res);
};


/**
 * @description - This controller is used for get cources name listing
 */

const filterCourcesListing = async (req, res, next) => {
   const { findCources } = await studentService.filterCourcesListing({ user: req.user });
   return new SuccessResponse("Get Cources name listing sucessfully", { findCources }).send(res);
};


/**
 * @description - This controller is used for favTutorsList tutor profile
 */

const favTutorsList = async (req, res, next) => {
   const { findTutors } = await studentService.favTutorsList({ user: req.user });
   return new SuccessResponse("Get favourite tutors listing sucessfully", { findTutors }).send(res);
};

/**
 * @description - This controller is used for unfollow tutor profile
 */

const unfollowTutor = async (req, res, next) => {
   await studentService.unfollowTutor({ user: req.user, body: req.body });
   return new SuccessResponse("Unfollow tutor sucessfully",).send(res);
};


/**
 * @description - This controller is used for followTutor tutor profile
 */

const followTutor = async (req, res, next) => {
   await studentService.followTutor({ user: req.user, body: req.body });
   return new SuccessResponse("Follow tutor sucessfully",).send(res);
};


/**
 * @description - This controller is used for hide tutor profile
 */

const unhideTutor = async (req, res, next) => {
   await studentService.unhideTutor({ user: req.user, body: req.body });
   return new SuccessResponse("Unhide tutor sucessfully",).send(res);
};

/**
 * @description - This controller is used for hide tutor profile
 */

const hideTutor = async (req, res, next) => {
   await studentService.hideTutor({ user: req.user, body: req.body });
   return new SuccessResponse("Hide tutor sucessfully",).send(res);
};

/**
 * @description - This controller is used for tutor details
 */

const removeNotify = async (req, res, next) => {
   await studentService.removeNotify({ user: req.user, body: req.body });
   return new SuccessResponse("Add new notify sucessfully",).send(res);
};

/**
 * @description - This controller is used for tutor details
 */

const notifyTeacherOnline = async (req, res, next) => {
   await studentService.notifyTeacherOnline({ user: req.user, body: req.body });
   return new SuccessResponse("Add new notify sucessfully",).send(res);
};

/**
 * @description - This controller is used for tutor details
 */

const tutorDetails = async (req, res, next) => {
   const { details,ratings } = await studentService.tutorDetails({ user: req.user, body: req.body });
   return new SuccessResponse("get tutor details sucessfully", { details,ratings }).send(res);
};


/**
 * @description - This controller is used for like dislike tutor
 */

const likeDislikeTutor = async (req, res, next) => {
   const message = await studentService.likeDislikeTutor({ user: req.user, body: req.body });
   return new SuccessResponse(message,).send(res);
};

/**
 * @description - This controller is used for get tutors list
 */

const getTutorsList = async (req, res, next) => {
   let { findTutors } = await studentService.getTutorsList({ user: req.user });
   return new SuccessResponse("Account info retrieved successfully", { findTutors }).send(res);
};


/**
 * @description - This controller is used for get student informations
 */

const getAccountInfo = async (req, res, next) => {
   let { user } = await studentService.getAccountInfo({ userId: req.user._id });
   return new SuccessResponse("Account info retrieved successfully", { user }).send(res);
};

/**
 * @description - This controller is used for update accountInfo
 */

const updateAccountInfo = async (req, res, next) => {
   await studentService.updateAccountInfo({ userId: req.user._id, body: req.body });
   return new SuccessResponse("Account info updated successfully").send(res);
};

/**
 * @description - This controller is used for get profileInfo
 */

const getProfileInfo = async (req, res, next) => {
   let { user } = await studentService.getProfileInfo({ userId: req.user._id });
   return new SuccessResponse("Profile info retrieved successfully", { user }).send(res);

};

/**
 * @description - This controller is used for update profile info
 */

const updateProfileInfo = async (req, res, next) => {
   await studentService.updateProfileInfo({ userId: req.user._id, body: req.body });
   return new SuccessResponse("Profile info updated successfully").send(res);
};

/**
 * @description - This controller is used for get setting Info
 */

const getSettingInfo = async (req, res, next) => {
   let { user } = await studentService.getSettingInfo({ userId: req.user._id });
   return new SuccessResponse("Setting info retrieved successfully", { user }).send(res);
};

/**
 * @description - This controller is used for update setting info
 */

const updateSettingInfo = async (req, res, next) => {
   await studentService.updateSettingInfo({ userId: req.user._id, body: req.body });
   return new SuccessResponse("Setting info updated successfully").send(res);
};

/**
 * @description - This controller is used for get email preference
 */

const getEmailPreference = async (req, res, next) => {
   let { user } = await studentService.getEmailPreference({ userId: req.user._id });
   return new SuccessResponse("Email preference retrieved successfully", { user }).send(res);
};

/**
 * @description - This controller is used for update email preference.
 */

const updateEmailPreference = async (req, res, next) => {
   await studentService.updateEmailPreference({ userId: req.user._id, body: req.body });
   return new SuccessResponse("Email preference updated successfully").send(res);
};


module.exports = {
   removeVideo,
   progressReport,
   sumbitReviews,
   giveRatings,
   todayLessonStatus,
   hideTutorsListing,
   switchRole,
   ourCourses,
   cancelClass,
   getCalendorBookings,
   lessonPrefrences,
   reserveBooking,
   purchaseSubscription,
   getSubscriptionPlan,
   getSlots,
   searchTutor,
   filterCourcesListing,
   favTutorsList,
   unfollowTutor,
   followTutor,
   removeNotify,
   unhideTutor,
   hideTutor,
   notifyTeacherOnline,
   tutorDetails,
   likeDislikeTutor,
   getTutorsList,
   getAccountInfo,
   updateAccountInfo,
   getProfileInfo,
   updateProfileInfo,
   getSettingInfo,
   updateSettingInfo,
   getEmailPreference,
   updateEmailPreference
};