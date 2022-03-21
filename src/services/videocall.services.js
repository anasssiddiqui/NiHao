const Users = require("../models/user.model");
const Tutors = require("../models/tutor.model");
const Cources = require("../models/courses.model");
const tutorsAvailability = require("../models/tutorsAvailability.model");
const Subscription = require("../models/subscription.model");
const bookings = require("../models/bookings.model");
const invitations = require("../models/invitations.model");


const { ObjectId } = require("mongoose").Types;
const { BadRequest, Unauthorized, NotFound } = require("../utility/apiError");
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_API_KEY } = require("../utility/config");
const { changeDateFomate, futureTimestamp, sendNotification } = require("../helper/common");
const videoCallFunctions = require("../functions/webfunction/videoCallFunctions");

const { findOne, findById } = require("../models/user.model");
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;



/**
 * @description - This function is used for send video call notification
 */

const disconnectCall = async ({ body }) => {

    const { invitationId, talkTime, videoCallRecording } = body

    const Invitation = await invitations.findOneAndUpdate({ _id: invitationId }, {
        $set: {
            status: 'disconnect',
            callTime: {
                "callTime.talkTime": talkTime,
                "callTime.videoCallRecording": videoCallRecording,
                "callTime.endTime": new Date(),
            }
        }
    })

    // now in invitation sender is recevier || recevier is sender 
    const user = await Users.findOne({ _id: Invitation.senderId }) // find user tokken
    const tutor = await Tutors.findOne({ _id: Invitation.recevierId }) // find tutor tokken
    await sendNotification({
        fcmToken: [user.notificationDetails.token, tutor.notificationDetails.token],
        message: "Call Disconnected",
        body: "Your video call has been disconnected",
        data: {
            notificationType: "call Disconnected",
            clickAction: "home",
            inviationId: Invitation._id.toString(),
        }
    })

    return
};


/**
 * @description - This function is used for send video call notification
 */

const endCall = async ({ body }) => {

    const { invitationId, talkTime, videoCallRecording } = body

    const updateInvitation = await invitations.findOneAndUpdate({ _id: invitationId }, {
        $set: {
            status: 'complete',
            "callTime.talkTime": talkTime,
            "callTime.videoCallRecording": videoCallRecording,
            "callTime.endTime": new Date(),
        }
    })

    await Users.updateOne({ '_id': updateInvitation.senderId }, {
        $inc: {
            "progress.currentDayStreak": talkTime,
            "progress.tutorsMet": 1,
            "progress.totalMinutes": talkTime
        }
    });

    const { setCondition } = await videoCallFunctions.endCallFunction({ id: updateInvitation.recevierId })

    await Tutors.updateOne({ '_id': updateInvitation.recevierId }, {
        $set: set,
        $inc: {
            "history.studentsMet": 1,
            "history.totalMinutes": talkTime,
        }
    });

    return { updateInvitation }
};

/**
 * @description - This function is used for send video call notification
 */

const acceptInvitation = async ({ user, body }) => {

    const { invitationId } = body
    const Invitation = await invitations.findOneAndUpdate({ _id: invitationId }, {
        $set: {
            status: 'ongoing',
            callTime: {
                startTime: new Date()
            }
        }
    })
    // now in invitation sender is recevier || recevier is sender 
    const findrecevier = await Users.findOne({ _id: Invitation.senderId }) // find Recevier tokken

    await sendNotification({
        fcmToken: findrecevier.notificationDetails.token,
        message: "Accept your request for video call",
        body: "Join the call",
        data: {
            notificationType: "joinvideocall",
            receiverId: Invitation.senderId.toString(),
            senderId: Invitation.recevierId.toString(),
            clickAction: "videoCall",
            invitationId: Invitation._id.toString(),
        }
    })

    return
};

/**
 * @description - This function is used for send video call notification
 */

const sendJoinInvitation = async ({ user, body }) => {
    const { senderId, recevierId, courseId } = body

    const findRecevier = await Tutors.findOne({ _id: recevierId }) // find recevier details
    const findSender = await Users.findOne({ _id: senderId }) // find sender details

    const inviationCreate = await invitations.create({
        senderId: senderId,
        recevierId: recevierId,
        status: 'pending',
        courseId: courseId
    })

    await sendNotification({
        fcmToken: findRecevier.notificationDetails.token,
        message: "One Student Sent you request for video call",
        body: "Join the call",
        data: {
            notificationType: "joinvideocall",
            receiverId: recevierId,
            senderId: senderId,
            senderPhone: `${findSender.countryCode}-${findSender.phone}`,
            clickAction: "videoCall",
            invitationId: inviationCreate._id.toString(),
        }
    })

    return
};


/**
 * @description - This function is used for create token
 */

const createToken = async ({ user, body }) => {
    const { senderRole, roomName, senderId } = body;

    var findSender; // sender details
    var identity; // sender email

    if (senderRole == 'student') {
        findSender = await Users.findOne({ _id: senderId })
        identity = findSender.email;
    }
    if (senderRole == 'tutor') {
        findSender = await Tutors.findOne({ _id: senderId })
        identity = findSender.email;
    }



    // Create Video Grant
    const videoGrant = new VideoGrant({
        room: roomName,
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
        ACCOUNT_SID,
        TWILIO_API_KEY,
        AUTH_TOKEN,
        { identity: identity }
    );
    token.addGrant(videoGrant);

    // Serialize the token to a JWT string
    return { token: token.toJwt() }
};




module.exports = {
    disconnectCall,
    endCall,
    acceptInvitation,
    sendJoinInvitation,
    createToken,
};