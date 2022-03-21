const tutorService = require("../services/tutor.services");
const { BadRequest } = require("../utility/apiError");
const { SuccessResponse } = require("../utility/apiResponse");

//Controller Functions

/**
 * @description - This controller is used for get history details
 */

const callLogsFilter = async (req, res, next) => {
    const { history } = await tutorService.callLogsFilter({ user: req.user, body: req.body })
    return new SuccessResponse("Get history details sucessfully", { history }).send(res);
};

/**
 * @description - This controller is used for get history details
 */

const history = async (req, res, next) => {
    const { history } = await tutorService.history({ user: req.user, body: req.body })
    return new SuccessResponse("Get history details sucessfully", { history }).send(res);
};


/**
 * @description - This controller is used for tutor account
 */

const notificationOnOf = async (req, res, next) => {
    await tutorService.notificationOnOf({ user: req.user, body: req.body })
    return res.send("change notification status successfully")
};

/**
 * @description - This controller is used for tutor account
 */

const weekCalendor = async (req, res, next) => {
    const { bookingCalendor } = await tutorService.weekCalendor({ user: req.user, body: req.body })
    return new SuccessResponse("Get weekly reservations sucessfully", { bookingCalendor }).send(res);
};


/**
 * @description - This controller is used for tutor account
 */

const switchRole = async (req, res, next) => {
    const userDetails = await tutorService.switchRole({ user: req.user })
    return new SuccessResponse("Switch account sucessfully", { userDetails }).send(res);
};


/**
 * @description - This controller is used for tutor account
 */

const deleteAccount = async (req, res, next) => {
    await tutorService.deleteAccount({ user: req.user })
    return res.send("Delete account successfully")
};

/**
 * @description - This controller is used for get every users
 */

const courceDetails = async (req, res, next) => {
    const { courseDetails } = await tutorService.courceDetails({ user: req.user, body: req.body })
    return new SuccessResponse("Get cources sucessfully", { courseDetails }).send(res);
};

/**
 * @description - This controller is used for get every users
 */

const getCourses = async (req, res, next) => {
    const { courses } = await tutorService.getCourses({ user: req.user, body: req.body })
    return new SuccessResponse("Get cources sucessfully", { courses }).send(res);
};

/**
 * @description - This controller is used for get every users
 */

const getEveryUser = async (req, res, next) => {
    const { findUser } = await tutorService.getEveryUser({ user: req.user, body: req.body })
    return new SuccessResponse("Get users sucessfully", { findUser }).send(res);
};


/**
 * @description - This controller is used for get paid users 
 */

const getPaidUsers = async (req, res, next) => {
    const { findUser } = await tutorService.getPaidUsers({ user: req.user, body: req.body })
    return new SuccessResponse("Get users sucessfully", { findUser }).send(res);
};

/**
 * @description - This controller is used for accept reject reservation request
 */

const dashboard = async (req, res, next) => {
    const { findReservations } = await tutorService.dashboard({ user: req.user, body: req.body })
    return new SuccessResponse("Get reservations sucessfully", { findReservations }).send(res);
};

/**
 * @description - This controller is used for accept reject reservation request
 */

const getReservations = async (req, res, next) => {
    const { findReservations } = await tutorService.getReservations({ user: req.user, body: req.body })
    return new SuccessResponse("Get reservations sucessfully", { findReservations }).send(res);
};


/**
 * @description - This controller is used for accept reject reservation request
 */

const reservationRespond = async (req, res, next) => {
    await tutorService.reservationRespond({ user: req.user, body: req.body })
    return res.send(`${req.body.status == 1 ? `Accept` : 'Reject'} reservation successfully`)
};


/**
 * @description - This controller is used for get reservation listing
 */

const reservations = async (req, res, next) => {
    const { findReservations } = await tutorService.reservations({ user: req.user })
    return new SuccessResponse("Get dates listing sucessfully", { findReservations }).send(res);
};


/**
 * @description - This controller is used for Create courses listing
 */

const tutorsAvailableDates = async (req, res, next) => {
    const findDates = await tutorService.tutorsAvailableDates({ user: req.user })
    return new SuccessResponse("Get dates listing sucessfully", findDates).send(res);
};

/**
 * @description - This controller is used for Create and update tutors avalability dates
 */

const createAvailability = async (req, res, next) => {
    const { slots } = await tutorService.createAvailability({ body: req.body, user: req.user })
    return new SuccessResponse("update avalability sucessfully", { slots }).send(res);
};

/**
 * @description - This controller is used for Get cources listing
 */

const courcesListing = async (req, res, next) => {
    var findCources = await tutorService.courceslisting({ courseFor: "other" })
    return new SuccessResponse("Get cources listing sucessfully", findCources).send(res);
};

/**
 * @description - This controller is used for Update Notification Settings
 */

const updateNotificationsSetting = async (req, res, next) => {
    await tutorService.updateNotificationsSetting({ body: req.body, user: req.user })
    return res.send("Update notifications successfully")
};


/**
 * @description - This controller is used for Update account details 
 */

const updateEmailPreferences = async (req, res, next) => {
    await tutorService.updateEmailPreferences({ body: req.body, user: req.user })
    return res.send("Update settings successfully")
};


/**
 * @description - This controller is used for Update account details 
 */

const updateSettings = async (req, res, next) => {
    await tutorService.updateSettings({ body: req.body, user: req.user })
    return res.send("Update settings successfully")
};


/**
 * @description - This controller is used for Update account details 
 */

const updateAccount = async (req, res, next) => {
    await tutorService.updateAccount({ body: req.body, user: req.user })
    return res.send("Update account successfully")
};

/**
 * @description - This controller is used for change password
 */

const changePassword = async (req, res, next) => {
    await tutorService.changePassword({ body: req.body, userId: req.user._id })
    return res.send("Password changed successfully")
};

/**
 * @description - This controller is used for add new teaching video
 */

const addTeachingVideo = async (req, res, next) => {
    const response = await tutorService.addTeachingVideo({ body: req.body, req: req.user });
    return res.send("Saved video sucessfully")
};

/**
 * @description - This controller is used for delete teacher teaching videos
 */

const deleteVideos = async (req, res, next) => {
    const response = await tutorService.deleteVideos({ body: req.body, req: req.user });
    return res.send("Saved details sucessfully")
};


/**
 * @description - This controller is used for add tutor aditional information
 */

const addInformation = async (req, res, next) => {
    const response = await tutorService.addInformation({ body: req.body, _id: req.decoded._id })
    return res.send("Saved details sucessfully")
};

/**
 * @description - This controller is used for create profile details
 */

const createProfile = async (req, res, next) => {
    const response = await tutorService.createProfile({ body: req.body, req: req.user, });
    return res.send("Saved details sucessfully")
};


/**
 * @description - This controller is used for get tutor all details
 */

const getProfile = async (req, res) => {
    const response = await tutorService.getProfile({ _id: req.decoded._id })
    return new SuccessResponse("Get tutor details successfully", response).send(res);
};

const getTeachingVideos = async (req, res) => {
    // const response = await tutorService.getTeachingVideos({_id:req.decoded._id })
    return new SuccessResponse("Get tutor videos list successfully", req.user.teachingVideos).send(res);
};



module.exports = {
    callLogsFilter,
    history,
    notificationOnOf,
    weekCalendor,
    switchRole,//
    deleteAccount,
    courceDetails,
    getCourses,
    getEveryUser,
    getPaidUsers,
    dashboard,
    getReservations,
    reservationRespond,
    reservations,
    tutorsAvailableDates,
    createAvailability,
    courcesListing,
    updateNotificationsSetting,
    updateEmailPreferences,
    updateSettings,
    updateAccount,
    changePassword,
    addTeachingVideo,
    getTeachingVideos,
    addInformation,
    getProfile,
    createProfile,
    deleteVideos
};