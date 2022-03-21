const Tutor = require("../models/tutor.model");
const Ambassador = require("../models/ambassador.model");
const Courses = require("../models/courses.model");
const tutorsAvailability = require("../models/tutorsAvailability.model");
const bookings = require("../models/bookings.model");
const Users = require("../models/user.model");
const Invitations = require("../models/invitations.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../utility/apiError");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId, jwtForgotPasswordSecret, env } = require("../utility/config");
const client = new OAuth2Client(googleClientId);
const axios = require("axios");
const { humanDate, filterDate } = require("../helper/common");
const tutorFunctions = require("../functions/webfunction/tutorFunctions")
const emailService = require("./email.services");
const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const { find } = require("../models/user.model");

/**
 * @description - This controller is used for on of notification  
 */

const callLogsFilter = async ({ user, body }) => {

    await Invitations.find({
        recevierId: user._id, status: 'complete',
        createdAt: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate)
        },
    })

    return
};

/**
 * @description - This controller is used for on of notification  
 */

const history = async ({ user, body }) => {


    const callLogs = await Invitations.aggregate([{ $match: { recevierId: user._id, status: 'complete' } },
    {
        $lookup: {
            from: "users", localField: "senderId", foreignField: "_id",
            as: "studentDetails",
        },
    },
    { $unwind: '$studentDetails' },
    {
        "$project": {
            "studentDetails._id": 1, "studentDetails.profilePic": 1,
            "studentDetails.firstName": 1,
        }
    }
    ])

    var history = {
        stats: user.history,
        callLogs: callLogs
    }

    console.log(history, ">>>>>>>>>>>>..booking")
    return { history }
};


/**
 * @description - This controller is used for on of notification  
 */

const notificationOnOf = async ({ user, body }) => {

    await Tutor.updateOne({ _id: user._id }, { $set: { notificationEnabled: body.status } })

    return
};

/**
 * @description - This service  is used for get get weekly reservations basis on first and last date of week
 */

const weekCalendor = async ({ user, body }) => {

    var { dateFilter } = await tutorFunctions.weekCalendorFunction({ body })

    const bookingCalendor = await bookings.aggregate([{ $match: dateFilter },
    {
        $lookup: {
            from: "users", localField: "studentId", foreignField: "_id",
            as: "studentDetails",
        },
    },
    { $unwind: '$studentDetails' },
    {
        "$project": {
            "studentDetails._id": 1, "date": 1, "slots": 1, "studentDetails.profilePic": 1,
            "studentDetails.firstName": 1
        }
    }

    ])
    return { bookingCalendor }
};





/**
 * @description - This controller is used for switch tutor to student
 */

const switchRole = async ({ user, body }) => {

    const findUser = await Users.findOne({ email: user.email })
    const updateTutor = await Tutor.updateOne({ _id: user._id }, {
        $set: {
            currentSwitchEnabled: true
        }
    })
    if (!findUser) {
        const saveObject = {
            email: user.email.toLowerCase(),
            password: user.password,
            signUpType: "email",
            role: "student",
            switchRole: {
                isSwitchRole: true,
                currentSwitchEnabled: true,
                previousRole: user.role,
            },
        };

        let updateUser = await new Users(saveObject);
        let token = await updateUser.generateToken();
        await updateUser.save();
        return { updateUser, token };
    }
    return { findUser }
};


/**
 * @description - This controller is used for delete account permanent
 */

const deleteAccount = async ({ user }) => {

    await Tutor.deleteOne({ _id: user._id })

    return

};


/**
 * @description - This controller is used for get course details 
 */

const courceDetails = async ({ body }) => {
    var filter = { _id: ObjectId(body.id) }
    var courseDetails = await Courses.aggregate([
        {
            $match: filter
        },
        {
            $lookup: {
                from: "syllabuses",
                localField: "_id",
                foreignField: "courseId",
                as: "syllabus",
            },
        },

    ])


    courseDetails = courseDetails[0]

    return { courseDetails }
};


/**
 * @description - This controller is used for get  my  selcted courses and all courses
 */

const getCourses = async ({ user, body }) => {
    const myCourses = await Courses.aggregate([
        {
            $match: { _id: { $in: user.courses } }
        },
        {
            $lookup: {
                from: "syllabuses",
                localField: "_id",
                foreignField: "courseId",
                as: "syllabus",
            },
        },
        { $sort: { createdAt: -1 } },
        { $project: { syllabusCount: { $size: "$syllabus" }, name: 1, coverImage: 1, experienceLevel: 1, whyTakeThisCourse: 1, courseFor: 1, shortDescription: 1 } }
    ])

    const allCourses = await Courses.find()

    var courses = {
        myCourses: myCourses,
        allCourses: allCourses
    }


    return { courses }
};


/**
 * @description - This controller is used for get all users listing
 */

const getEveryUser = async ({ user, body }) => {

    const findUser = await Users.find()

    return { findUser }
};


/**
 * @description - This controller is used for find all users who purchase subscription
 */

const getPaidUsers = async ({ user, body }) => {

    const findUser = await Users.find({ haveSubscription: true }, {
    })

    return { findUser }
};


/**
 * @description - This controller is used for find tutor reservation dashboard
 */

const dashboard = async ({ user, body }) => {

    var { dateFormat } = humanDate({})
    var dateFilter = { "date.date": new Date(dateFormat), tutorId: user._id, status: 1 }
    const findReservations = await bookings.aggregate([
        {
            $match: dateFilter
        },
        {
            $lookup: {
                from: "users",
                localField: "studentId",
                foreignField: "_id",
                as: "studentDetails",
            },
        },
        { $unwind: '$studentDetails' },
        {
            "$project": {
                "studentDetails._id": 1,
                "slots": 1,
                "studentDetails.profilePic": 1,
                "studentDetails.firstName": 1
            }
        }

    ])
    return { findReservations }
};


/**
 * @description - This controller is used for find tutor reservation dashboard
 */

const getReservations = async ({ user, body }) => {
    var filter = { tutorId: user._id, "date.date": new Date(body.date) }
    const findReservations = await bookings.aggregate([
        {
            $match: filter
        },
        {
            $lookup: {
                from: "users",
                localField: "studentId",
                foreignField: "_id",
                as: "studentDetails",
            },
        },
        { $unwind: '$studentDetails' },
        {
            "$project": {
                "studentDetails._id": 1,
                "date": 1,
                "slots": 1,
                "studentDetails.profilePic": 1,
                "studentDetails.firstName": 1
            }
        }
    ])

    return { findReservations }
};


/**
 * @description - This controller is used for update reservation
 */

const reservationRespond = async ({ user, body }) => {
    const update = await bookings.updateOne({ _id: body.reservationId }, {
        $set: {
            status: body.status
        }
    })

    const findUser = await Users.findOne({ _id: body.studentId }, {
    })
    emailService.sendRespondMail({ email: findUser.email, body })

    return
};



/**
 * @description - This controller is used for find tutor reservation dashboard
 */

const reservations = async ({ user }) => {
    var filter = { tutorId: user._id, status: 0 }
    const pending = await bookings.aggregate([
        {
            $match: filter
        },
        {
            $lookup: {
                from: "users",
                localField: "studentId",
                foreignField: "_id",
                as: "studentDetails",
            },
        },
        { $unwind: '$studentDetails' },
        {
            "$project": {
                "studentDetails._id": 1,
                "date": 1,
                "slots": 1,
                "studentDetails.profilePic": 1,
                "studentDetails.firstName": 1
            }
        }
    ])

    const { dateFilter } = tutorFunctions.reservationsFunction({ user })

    const bookingCalendor = await bookings.aggregate([
        {
            $match: dateFilter
        },
        {
            $lookup: {
                from: "users",
                localField: "studentId",
                foreignField: "_id",
                as: "studentDetails",
            },
        },
        { $unwind: '$studentDetails' },
        {
            "$project": {
                "studentDetails._id": 1,
                "date": 1,
                "slots": 1,
                "studentDetails.profilePic": 1,
                "studentDetails.firstName": 1
            }
        }

    ])


    var findReservations = {
        pending, bookingCalendor
    }
    return { findReservations }
};


/**
 * @description - This controller is used for  courses listing 
 */

const tutorsAvailableDates = async ({ user }) => {
    const findDates = await tutorsAvailability.find({ tutorId: user._id })

    return findDates
};


/**
* @description - This controller is used for create availabile dates frontend json format added in swagger route also update dates in tutor collection for filter
*/


const createAvailability = async ({ body, user }) => {

    const { date = "" } = body
    var dates = []

    date.forEach(object => {
        object.tutorId = user._id;
        var tempObject = {
            date: object.date
        }
        dates.push(tempObject)
    });

    const updateTutorProfile = await Tutor.updateOne({
        _id: user._id
    }, {
        avalaibleDates: dates
    })

    await tutorsAvailability.deleteMany({ tutorId: user._id })
    const slots = await tutorsAvailability.insertMany(date)

    return { slots }

};

/**
 * @description - This controller is used for get courses listing 
 */

const courceslisting = async () => {
    var projection = { name: 1, coverImage: 1, experienceLevel: 1, whyTakeThisCourse: 1 }
    const findCources = await Courses.find({}, projection)

    return findCources
};


/**
 * @description - This function is used for update notification prefrences
 */

const updateNotificationsSetting = async ({ body, user, file }) => {
    let update = await Tutor.updateOne({ _id: user._id }, {
        $set: {
            notificationSettings: {
                receive24HourAdvanceEmailsEnabled: body.receive24HourAdvanceEmailsEnabled,
                advanceWarningEnabled: body.advanceWarningEnabled,
                receiveStudentMessageEnabled: body.receiveStudentMessageEnabled,
                reservationConfirmedNotification: body.reservationConfirmedNotification,
            },
        }
    });
    return
}

/**
 * @description - This function is used for update tutor email prefrences
 */

const updateEmailPreferences = async ({ body, user, file }) => {
    let update = await Tutor.updateOne({ _id: user._id }, {
        $set: {
            emailPreferences: {
                messagesEnabled: body.messagesEnabled,
                promotionsEnabled: body.promotionsEnabled,
                lessionAndProgressEnabled: body.lessionAndProgressEnabled,
                scheduleUpdateEnabled: body.scheduleUpdateEnabled,
                referralEnabled: body.referralEnabled,
                accountUpdateEnabled: body.accountUpdateEnabled
            },
        }
    });
    return
}

/**
 * @description - This function is used for update tutor settings page
 */

const updateSettings = async ({ body, user, file }) => {

    let update = await Tutor.updateOne({ _id: user._id }, {
        $set: {
            appLanguage: body.appLanguage,
            address: {
                location: body.location,
                timezone: body.timezone
            },
            desktopNotifications: body.desktopNotifications,
            shareMyVideos: body.shareMyVideos
        }
    });
    return
}

/**
 * @description - This function is used for update account details
 */

const updateAccount = async ({ body, user, file }) => {

    let update = await Tutor.updateOne({ _id: user._id }, {
        $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            mobile: body.mobile
        }
    });
    return
}

/**
 * @description - This function is used for change tutor Password
 */

const changePassword = async ({ body, userId }) => {
    const condition = { _id: userId }
    const { password, oldPassword } = body
    let user = await Tutor.findOne(condition)
    if (!user) {
        throw new BadRequest("User not found");
    }
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
        throw new Error("Invalid old password!");
    }
    user.password = password;
    await user.save();
    return
}

/**
 * @description - This function is used for add teaching video
 */

const addTeachingVideo = async ({ body, req, }) => {
    await Tutor.updateOne(
        { _id: req._id },
        {
            $push: {
                "teachingVideos": {
                    file: body.teachingVideo.file,
                    title: body.teachingVideo.title
                }
            }
        }
    )
    return
}

/**
 * @description - This function is used for delete teaching video
 */

const deleteVideos = async ({ body, req }) => {
    const update = await Tutor.update(
        { '_id': ObjectId(req.id) },
        { $pull: { teachingVideos: { _id: ObjectId(body.id) } } },
    );
    return
}

/**
 * @description - This function is used for createProfile details
 */

const createProfile = async ({ body, req, files }) => {

    let condition = { _id: req._id }

    let update = await Tutor.updateOne(condition, {
        $set: {
            profilePic: body.image,
            firstName: body.firstName,
            lastName: body.lastName,
            dob: body.dob,
            mobile: body.mobile,
            level: body.level,
            goal: body.goal,
            bio: body.bio,
            courses: body.courses,
            currentFocus: body.currentFocus,
            specialitys: body.specialitys,
            interest: body.interest,
            comfortLevel: body.comfortLevel,
            resume: body.resume,
            teachingVideos: body.teachingVideos,
            languages: body.languages,
            education: body.education,
            currentPreviousProfession: body.currentPreviousProfession,
            personality: body.personality,
            loginPhase: 2,
            address: {
                country: body.country,
                city: body.city,
                state: body.state,
                address: body.address
            },
            teachingCertificate: {
                certificate: body.certificate,
                uploadStatus: body.teachingVideosuploadStatus,
                certificateType: body.certificateType,
            }
        }
    });
    return
}

/**
 * @description - This function is used for get tutor details
 */

const getProfile = async ({ body, _id }) => {

    let condition = {
        _id: _id
    }

    let findDetails = await Tutor.findOne(condition);

    return findDetails
}

/**
 * @description - This function is used for add tutor aditional information
 */

const addInformation = async ({ body, _id }) => {
    let condition = {
        _id: _id
    }

    let specialitys = [];
    body.specialitys.forEach(element => {
        specialitys.push(element);
    });

    let update = await Tutor.updateOne(condition, {
        $set: {
            goal: body.goal,
            bio: body.bio,
            currentFocus: body.currentFocus,
            myTutoringStyle: body.myTutoringStyle,
            specialitys: specialitys,
            bestAt: body.bestAt,
            address: {
                country: body.country
            }
        }
    });
    return
}




module.exports = {
    callLogsFilter,
    history,
    notificationOnOf,
    weekCalendor,
    switchRole,
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
    courceslisting,
    updateNotificationsSetting,
    updateSettings,
    updateAccount,
    changePassword,
    addTeachingVideo,
    createProfile,
    addInformation,
    getProfile,
    deleteVideos,
    updateEmailPreferences
};