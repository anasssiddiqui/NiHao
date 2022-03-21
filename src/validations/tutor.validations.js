const { ValidationFailure } = require("../utility/apiError");
const {
    check,
    header,
    body,
    query,
    validationResult,
} = require("express-validator");

const callLogsFilterValidations = [
    body("fromDate")
        .exists()
        .withMessage("date :- this field is required."),
    body("toDate")
        .exists()
        .withMessage("date :- this field is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const notificationOnOfValidations = [
    body("status")
        .notEmpty().withMessage("status :- this field cannot be empty.")
        .isIn(['true', 'false',]).withMessage('status must be true | false'),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


const weekCalendorValidations = [
    body("fromDate")
        .exists()
        .withMessage("date :- this field is required."),
    body("toDate")
        .exists()
        .withMessage("date :- this field is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const getReservationsValidations = [
    body("date")
        .exists()
        .withMessage("date :- this field is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const deleteVideosValidations = [
    body("id")
        .exists()
        .withMessage("id :- this field is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const addTeachingVideoValidations = [
    body("teachingVideo")
        .exists()
        .withMessage("teachingVideo :- this field is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


const createAvailabilityValidations = [
    body("date")
        .exists()
        .withMessage("date :- this field is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const reservationRespondValidation = [
    body("studentId")
        .exists()
        .withMessage("studentId :- this field is required."),
    body("reservationId")
        .exists()
        .withMessage("reservationId :- this field is required."),
    body("status")
        .exists()
        .withMessage("status :- this field is required."),

    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


const NotificationsSettingValidations = [
    body("receive24HourAdvanceEmailsEnabled")
        .exists()
        .withMessage("Never Receive 24-Hour in Advance Emails For Lessons :- this filed is required."),
    body("advanceWarningEnabled")
        .exists()
        .withMessage("5-10 minute warning in advance before a lesson :- this filed is required."),
    body("receiveStudentMessageEnabled")
        .exists()
        .withMessage("Receive message notification when student message is in inbox :- this filed is required."),
    body("reservationConfirmedNotification")
        .exists()
        .withMessage("Receive notification when reservation is confirmed :- this filed is required."),

    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


const updateEmailPreferences = [
    body("messagesEnabled")
        .exists()
        .withMessage("Messages :- this filed is required."),
    body("promotionsEnabled")
        .exists()
        .withMessage("Promotions And Tips :- this filed is required."),
    body("lessionAndProgressEnabled")
        .exists()
        .withMessage("Lessons And Progress :- this filed is required."),
    body("scheduleUpdateEnabled")
        .exists()
        .withMessage("Schedule Updates :- this filed is required."),
    body("referralEnabled")
        .exists()
        .withMessage("Referrals :- this filed is required."),
    body("accountUpdateEnabled")
        .exists()
        .withMessage("Account Updates :- this filed is required."),

    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];



const updateSettingsValidations = [
    body("appLanguage")
        .exists()
        .withMessage("Language :- this filed is required."),
    body("location")
        .exists()
        .withMessage("Location :- this filed is required."),
    body("timezone")
        .exists()
        .withMessage("Timezone :- this filed is required."),
    body("desktopNotifications")
        .exists()
        .withMessage("Desktop Notifications :- this filed is required."),
    body("shareMyVideos")
        .exists()
        .withMessage("Dont Prompt Students To Share Videos Of My Tutoring Sessions :- this filed is required."),

    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


// create profile validadtio
const createProfileValidations = [
    body("image")
        .exists()
        .withMessage("image is required."),
    body("firstName")
        .exists()
        .withMessage("First Name is required."),
    body("lastName")
        .exists()
        .withMessage("last Name :- this filed is required."),
    body("dob")
        .exists()
        .withMessage("date of birth:- this filed is required."),
    body("bio", "bio is required.")
        .exists()
        .withMessage("bio is required."),
    body("mobile")
        .exists()
        .withMessage("phone number :-  this field is required."),
    body("languages")
        .exists()
        .withMessage("languages :-  this field is required."),
    body("currentFocus", "current Focus is required.")
        .exists()
        .withMessage("current Focus is required."),
    body("specialitys", "specialitys is required.")
        .exists()
        .withMessage("specialitys is required."),
    body("level")
        .exists()
        .withMessage("choose level :- is required."),
    body("interest")
        .exists()
        .withMessage("interest :- is required."),
    body("comfortLevel")
        .exists()
        .withMessage("Comfort Level :- is required."),
    body("personality")
        .exists()
        .withMessage("personality :- is required."),
    body("resume")
        .exists()
        .withMessage("personality :- is required."),
    body("teachingVideos")
        .exists()
        .withMessage("teachingVideos :- is required."),
    body("goal")
        .exists()
        .withMessage("goal :- is required."),
    body("courses")
        .exists()
        .withMessage("goal :- is required."),
    body("certificate")
        .exists()
        .withMessage("certificate :- is required."),
    body("uploadStatus")
        .exists()
        .withMessage("uploadStatus :- is required."),
    body("certificateType")
        .exists()
        .withMessage("certificateType :- is required."),
    body("country")
        .exists()
        .withMessage("country :- is required."),
    body("state")
        .exists()
        .withMessage("state :- is required."),
    body("address")
        .exists()
        .withMessage("address :- is required."),
    body("state")
        .exists()
        .withMessage("state :- is required."),
    body("currentPreviousProfession")
        .exists()
        .withMessage("current Previous Profession :- is required."),
    body("experience")
        .exists()
        .withMessage("experience :- is required."),
    body("education")
        .exists()
        .withMessage("education :- is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const addInfoValidations = [
    body("goal", "goal is required.")
        .exists()
        .withMessage("goal is required."),
    body("bio", "bio is required.")
        .exists()
        .withMessage("bio is required."),
    body("currentFocus", "current Focus is required.")
        .exists()
        .withMessage("current Focus is required."),
    body("myTutoringStyle", "myTutoringStyle is required.")
        .exists()
        .withMessage("my Tutoring Style :-  this field is required."),
    body("specialitys", "specialitys is required.")
        .exists()
        .withMessage("specialitys is required."),
    body("bestAt")
        .exists()
        .withMessage("I Am Best At Teaching Student Who Are :-  this field is required."),
    body("country")
        .exists()
        .withMessage("country is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const getProfile = [
    header("Authorization")
        .exists()
        .withMessage("Authorization :- this filed is required."),

    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const changePassword = [
    body("password")
        .exists()
        .withMessage("password :- this filed is required."),
    body("oldPassword")
        .exists()
        .withMessage("Current password :- this filed is required."),

    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];

const updateAccountValidations = [
    body("firstName")
        .exists()
        .withMessage("First Name :- this filed is required."),
    body("mobile")
        .exists()
        .withMessage("Mobile :- this filed is required."),

    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
];


module.exports = {
    callLogsFilterValidations,
    notificationOnOfValidations,
    weekCalendorValidations,
    getReservationsValidations,
    deleteVideosValidations,
    addTeachingVideoValidations,
    createAvailabilityValidations,
    reservationRespondValidation,
    NotificationsSettingValidations,
    updateEmailPreferences,
    updateSettingsValidations,
    updateAccountValidations,
    changePassword,
    addInfoValidations,
    getProfile,
    createProfileValidations
};