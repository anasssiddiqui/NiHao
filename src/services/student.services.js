const Users = require("../models/user.model");
const Tutors = require("../models/tutor.model");
const Cources = require("../models/courses.model");
const tutorsAvailability = require("../models/tutorsAvailability.model");
const Subscription = require("../models/subscription.model");
const bookings = require("../models/bookings.model");
const invitations = require("../models/invitations.model");
const Ratings = require("../models/ratings.model");

const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../utility/apiError");
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_API_KEY } = require("../utility/config");
const { changeDateFomate, futureTimestamp, sendNotification } = require("../helper/common");
const { findOne, findById } = require("../models/user.model");
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;


/**
 * @description - This function is used for call recording delete
 */

const removeVideo = async ({ body }) => {
    const { id, review } = body
    await invitations.updateOne({ _id: id }, {
        "callTime.videoCallRecording": ''
    })
    return
};


/**
 * @description - This controller is used for on of notification  
 */

const progressReport = async ({ user, body }) => {

    const callLogs = await invitations.aggregate([{ $match: { recevierId: user._id, status: 'complete' } },
    {
        $lookup: {
            from: "tutors", localField: "recevierId", foreignField: "_id",
            as: "tutorDetails",
        },
    },
    { $unwind: '$tutorDetails' },
    {
        "$project": {
            "tutorDetails._id": 1, "tutorDetails.profilePic": 1,
            "tutorDetails.firstName": 1, "callTime": 1, "courseId": 1
        }
    }
    ])

    var progress = {
        stats: user.progress,
        callLogs: callLogs
    }

    return { progress }
};



/**
 * @description - This function is used for get bookings basic of dates
 */

const sumbitReviews = async ({ body }) => {
    const { id, review } = body
    await Ratings.updateOne({ _id: id }, {
        review: review
    })
    return
};


/**
 * @description - This function is used for get bookings basic of dates
 */

const giveRatings = async ({ user, body }) => {

    const { recevierId, ratings, comments, invitationId } = body

    const giveRatings = await Ratings.create({
        studentId: user._id,
        tutorId: recevierId,
        ratings: ratings,
        comments: comments,
        invitationId: invitationId,
        roles: { // student , tutor
            sender: 'student',
            recevier: 'tutor'
        },
    })

    const findAvg = await Ratings.aggregate([
        { $match: { tutorId: ObjectId(recevierId), "roles.recevier": 'tutor' } },
        { $group: { _id: null, avg: { $avg: "$ratings" } } }, {
            $project: {
                avg: 1
            }
        }
    ])

    const update = await Tutors.updateOne({ _id: recevierId }, {
        $set: {
            "history.avgRatings": findAvg[0].avg
        }
    })

    return { giveRatings }
};


/**
 * @description - This function is used for get bookings basic of dates
 */

const todayLessonStatus = async ({ body }) => {
    const { invitationId, isCompleteLesson } = body
    await invitations.updateOne({ _id: invitationId }, {
        isCompleteLesson: isCompleteLesson
    })
    return
};



/**
 * @description - This function is used for get bookings basic of dates
 */

const hideTutorsListing = async ({ user }) => {
    const findTutors = await Tutors.aggregate([
        {
            $match: { _id: { $in: user.hideTutors } }
        },
        {
            $project: { firstName: 1, lastName: 1, profilePic: 1 }
        }
    ])
    return { findTutors }
};


/**
 * @description - This function is used for cancel class
 */

const switchRole = async ({ user, body }) => {

    const updateUser = await Users.findOneAndUpdate(
        { _id: user._id },
        {
            currentSwitchEnabled: false,
        }
    )
    if (updateUser.switchRole.isSwitchRole == false) throw new BadRequest("User can't able to switch roles");

    const details = await Tutors.findOneAndUpdate({ email: user.email }, { $set: { currentSwitchEnabled: false } })
    return { details }
}


/**
 * @description - This function is used for get all courses
 */

const ourCourses = async ({ user, body }) => {


    const findCourse = await Cources.find()

    return { findCourse }
}


/**
 * @description - This function is used for cancel class
 */

const cancelClass = async ({ user, body }) => {


    await bookings.updateOne(
        { _id: body.id },
        {
            status: 4,
            cancelComment: body.cancelComment
        }
    )

    return
}


/**
 * @description - This function is used for get bookings basic of dates
 */

const getCalendorBookings = async ({ user, body }) => {
    var filter = { studentId: user._id, "date.date": new Date(body.date) }
    const findReservations = await bookings.aggregate([
        {
            $match: filter
        },
        {
            $lookup: {
                from: "tutors",
                localField: "tutorId",
                foreignField: "_id",
                as: "tutorDetails",
            },
        },
        { $unwind: '$tutorDetails' },
        {
            "$project": {
                "tutorDetails._id": 1,
                "date": 1,
                "slots": 1,
                "tutorDetails.profilePic": 1,
                "tutorDetails.firstName": 1
            }
        }
    ])

    return { findReservations }
};


/**
 * @description - This function is used for purchase subscription
 */

const reserveBooking = async ({ user, body }) => {

    var timestamp = Math.round(new Date(body.date).getTime() / 1000)

    const booking = await bookings.create(
        {
            tutorId: body.tutorId,
            studentId: user._id,
            date: {
                date: body.date,
                timestamp: timestamp,
                availabilityId: body.availabilityId,
            },
            slots: {
                timeFrom: body.timeFrom,
                timeTo: body.timeTo,
                slotId: body.slotId
            },
            status: 0
        }
    )

    if (booking) {
        const update = await tutorsAvailability.findOneAndUpdate(
            {
                _id: body.availabilityId,
                "slots._id": body.slotId
            },
            {
                $set: { "slots.$.booked": true }
            }
        );

    }
    return
}


/**
 * @description - This function is used for purchase subscription
 */

const purchaseSubscription = async ({ user, body }) => {

    var { expiryDate } = futureTimestamp({ duration: body.duration })

    await Users.updateOne(
        { _id: user._id },
        {
            haveSubscription: true,
            subscriptionPlan: {
                planName: body.planName,
                currency: body.currency,
                duration: body.duration,
                minutes: body.minutes,
                days: body.days,
                amount: body.amount,
                purchaseDate: + new Date(),
                expiryDate: expiryDate
            }
        }
    )
    return
}

/**
 * @description - This function is used for get teacher slots
 */

const getSubscriptionPlan = async ({ body }) => {
    condition = { subscriptionType: "students" }, projection = {};

    if (body.minutes !== "" && body.days == "" && body.month == "") {
        var appendCondition = {
            minutes: body.minutes
        }
        var appendProjection = { days: 1, _id: 0 }
        condition = Object.assign(condition, appendCondition);
        projection = Object.assign(projection, appendProjection);

    }
    if (body.minutes !== "" && body.days !== "" && body.month == "") {
        var appendCondition = {
            minutes: body.minutes,
            days: body.days
        }
        var appendProjection = { duration: 1, _id: 0 }
        condition = Object.assign(condition, appendCondition);
        projection = Object.assign(projection, appendProjection);

    }
    if (body.minutes !== "" && body.days !== "" && body.month !== "") {
        var appendCondition = {
            minutes: body.minutes,
            days: body.days,
            "duration.month": body.month
        }
        var appendProjection = { days: 1, duration: 1, amount: 1 }

        condition = Object.assign(condition, appendCondition);
        projection = Object.assign(projection, appendProjection);
        const plans = await Subscription.findOne(condition, projection)
        return { plans }

    }

    const plans = await Subscription.find(condition, projection)
    return { plans }
}


/**
 * @description - This function is used for get teacher slots
 */

const getSlots = async ({ user, body }) => {
    const slots = await tutorsAvailability.find({ tutorId: body.tutorId, date: body.date },)
    return { slots }
}


/**
 * @description - This function is used for cources search Tutors
 */

const searchTutor = async ({ user, body }) => {

    var condition = {}

    if (body.level !== '') {
        const level = { level: { $in: body.level } };
        condition = Object.assign(condition, level);
    }
    if (body.courseId !== '') {
        let objectIdArray = body.courseId.map(s => ObjectId(s));
        var courses = { courses: { $in: objectIdArray } }
        condition = Object.assign(condition, courses);
    }
    if (body.languages !== '') {
        const languages = { languages: { $elemMatch: { language: { $in: body.languages } } } };
        condition = Object.assign(condition, languages);
    }
    if (body.personality !== '') {
        var personality = { personality: { $in: body.personality } }
        condition = Object.assign(condition, personality);
    }
    if (body.date !== '') {
        const date = { avalaibleDates: { $elemMatch: { date: new Date(body.date) } } }
        condition = Object.assign(condition, date);
    }

    var tutorDetails = await Tutors.aggregate([{ $match: condition },
    { $project: { isLiked: { $in: ['$_id', user.likedTutors] }, address: 1, firstName: 1, languages: 1, teachingCertificate: 1, bio: 1 } }
    ])

    return { tutorDetails }

}


/**
 * @description - This function is used for cources listing
 */

const filterCourcesListing = async ({ user, }) => {
    const findCources = await Cources.find(
        {}, projection = { name: 1 }
    )
    return { findCources }
}


/**
 * @description - This function is used for unfollow tutor 
 */

const favTutorsList = async ({ user, }) => {
    const findTutors = await Tutors.find(
        { _id: user.likedTutors }, projection = { address: 1, firstName: 1, languages: 1, teachingCertificate: 1, bio: 1 }
    )
    return { findTutors }
}


/**
 * @description - This function is used for unfollow tutor 
 */

const unfollowTutor = async ({ user, body }) => {
    await Users.updateOne(
        { _id: user._id },
        { $pull: { followTutors: body.id } }
    )
    return
}


/**
 * @description - This function is used for follow tutor 
 */

const followTutor = async ({ user, body }) => {
    await Users.updateOne(
        { _id: user._id },
        { $push: { followTutors: body.id } }
    )
    return
}

/**
 * @description - This function is used for remove hide tutor id  
 */

const unhideTutor = async ({ user, body }) => {

    await Users.updateOne(
        { _id: user._id },
        { $pull: { hideTutors: body.id } }
    )

    return

}

/**
 * @description - This function is used for add hide tutor id  
 */

const hideTutor = async ({ user, body }) => {

    await Users.updateOne(
        { _id: user._id },
        { $push: { hideTutors: body.id } }
    )

    return

}

/**
 * @description - This function is used for add notify online notification  alerts 
 */

const notifyTeacherOnline = async ({ user, body }) => {

    await Users.updateOne(
        { _id: user._id },
        { $push: { notifyOnlineTeacher: body.id } }
    )
    return

}

/**
 * @description - This function is used for remove notification  alerts 
 */

const removeNotify = async ({ user, body }) => {

    await Users.updateOne(
        { _id: user._id },
        { $pull: { notifyOnlineTeacher: body.id } }
    )
    return

}

/**
 * @description - This function is used for get tutor details
 */

const tutorDetails = async ({ user, body }) => {
    const tutorDetails = await Tutors.aggregate([{
        $match: { _id: ObjectId(body.id) }
    },
    { $project: { isLiked: { $in: ['$_id', user.likedTutors] }, address: 1, firstName: 1, languages: 1, teachingCertificate: 1, bio: 1, teachingVideos: 1, specialitys: 1, experience: 1, profilePic: 1, currentPreviousProfession: 1, education: 1 } }
    ])

    var ratings = await Ratings.aggregate([{ $match: { tutorId: ObjectId(body.id), "roles.recevier": 'tutor' } },
    {
        $lookup: {
            from: "users", localField: "studentId", foreignField: "_id",
            as: "usersDetails",
        },
    },

    { $unwind: '$usersDetails' },
    {
        "$project": {
            "usersDetails._id": 1, "usersDetails.profilePic": 1, "createdAt": 1,
            "usersDetails.firstName": 1, "review": 1, "ratings": 1, "usersDetails.address": 1
        }
    }
    ])

    var details = tutorDetails[0]

    return { details, ratings }
};

/**
 * @description - This function is used for like dislike tutor
 */

const likeDislikeTutor = async ({ user, body }) => {
    const findId = await Users.find({ likedTutors: { $in: body.tutorId } }, { _id: user._id })
    if (findId != '') {
        await Users.updateOne(
            { _id: user._id },
            { $pull: { likedTutors: body.tutorId } }
        )
        var message = "Dislike tutor sucessfully"
        return message
    } else {
        await Users.updateOne(
            { _id: user._id },
            { $push: { likedTutors: body.tutorId } }
        )

        var message = "like tutor sucessfully"
        return message
    }

}

/**
 * @description - This function is used for get tutors fileds
 */

const getTutorsList = async ({ user, body }) => {


    const findTutors = await Tutors.aggregate([
        {
            $lookup: {
                from: "bookings",
                let: { tutorId: "$_id" },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ["$studentId", user._id] }, { $eq: ["$tutorId", "$$tutorId"] }] } } },
                    { $project: { _id: 1, date: 1, studentId: 1, tutorId: 1 } }
                ],
                as: "scheduled"
            }
        },
        {
            $project: {
                isLiked: { $in: ['$_id', user.likedTutors] }, address: 1, firstName: 1, languages: 1, teachingCertificate: 1, bio: 1, scheduled: 1,
            }
        },
        { $sort: { createdAt: -1 } },
    ])

    return { findTutors }
};

/**
 * @description - This function is used for add fieleds
 */

const addAccountFields = (user, body) => {
    let detailFields = ["firstName", "lastName", "email", "mobile"];
    detailFields.map((key) => {
        if (body[key]) {
            user[key] = body[key];
        }
    });
    return user;
};

/**
 * @description - This function is used for add field
 */

const addProfileFields = (user, body) => {
    let detailFields = ["gender", "dob", "level", "goal", "bio", "corrections", "currentFocus", "comfortLevel", "interest", "country", "profilePic"];
    detailFields.map((key) => {
        if (body[key]) {
            (key == "country") ? user.address[key] = body[key] : (key == "dob") ? user[key] = changeDateFomate(body[key]) : user[key] = body[key];
        }
    });

    return user;
};

/**
 * @description - This function is used for add locations field
 */

const addSettingFields = (user, body) => {
    let detailFields = ["appLanguage", "timeZone", "location"];
    detailFields.map((key) => {
        if (body[key]) {
            (key == "appLanguage") ? user[key] = body[key] : user.address[key] = body[key]
        }
    });
    return user;
};

/**
 * @description - This function is used for add email preferences of users
 */

const addEmailFields = (user, body) => {
    let detailFields = ["messagesEnabled", "promotionsEnabled", "lessionAndProgressEnabled", "scheduleUpdateEnabled", "referralEnabled", "accountUpdateEnabled"];
    detailFields.map((key) => {
        if (body[key]) {
            user.emailPreferences[key] = body[key]
        }
    });
    return user;
};

/**
 * @description - This fucntion is used to get account info
 */

const getAccountInfo = async ({ userId }) => {
    const condition = { _id: userId };
    const projection = { firstName: 1, lastName: 1, fullName: 1, profilePic: 1, email: 1, mobile: 1, accountId: 1, isEmailVerified: 1 }
    const user = await Users.findOne(condition, projection)
    return { user }
};


/**
 * @description - This fucntion is used to update account info
 */

const updateAccountInfo = async ({ userId, body }) => {
    const condition = { _id: userId };
    let user = await Users.findOne(condition)
    user = addAccountFields(user, body)
    await user.save()
    return
};

/**
 * @description - This fucntion is used to get profile info
 */
const getProfileInfo = async ({ userId }) => {
    const condition = { _id: userId };
    const projection = { fullName: 1, accountId: 1, profilePic: 1, address: 1, gender: 1, dob: 1, level: 1, corrections: 1, goal: 1, currentFocus: 1, bio: 1, comfortLevel: 1, interests: 1 }
    const user = await Users.findOne(condition, projection)
    return { user }
};

/**
 * @description - This fucntion is used to update profile info
 */

const updateProfileInfo = async ({ userId, body }) => {
    const condition = { _id: userId };
    let user = await Users.findOne(condition)
    user = addProfileFields(user, body)
    await user.save()
    return
};

/**
 * @description - This fucntion is used to get setting info
 */
const getSettingInfo = async ({ userId }) => {
    const condition = { _id: userId };
    const projection = { fullName: 1, accountId: 1, profilePic: 1, appLanguage: 1, address: 1 }
    const user = await Users.findOne(condition, projection)
    return { user }
};

/**
 * @description - This fucntion is used to update setting info
 */

const updateSettingInfo = async ({ userId, body }) => {
    const condition = { _id: userId };
    let user = await Users.findOne(condition)
    user = addSettingFields(user, body)
    await user.save()
    return
};

/**
 * @description - This fucntion is used to get email preference
 */
const getEmailPreference = async ({ userId }) => {
    const condition = { _id: userId };
    const projection = { fullName: 1, accountId: 1, profilePic: 1, emailPreferences: 1 }
    const user = await Users.findOne(condition, projection)
    return { user }
};

/**
 * @description - This function is used to update email preference
 */

const updateEmailPreference = async ({ userId, body }) => {
    const condition = { _id: userId };
    let user = await Users.findOne(condition)
    user = addEmailFields(user, body)
    await user.save()
    return
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