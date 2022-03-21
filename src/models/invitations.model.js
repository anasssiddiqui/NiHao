const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const { jwtSecret, saltRounds } = require("../utility/config");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * components:
 *  schemas:
 *    invitations:
 *     type: object
 *     properties:
 *       senderId:
 *         type: string
 *         example: ''
 *       recevierId:
 *         type: string
 *         example: ''
 *       status:
 *         type: array
 *         example: [{"option":"best"},{"scale":0-6}]
 */


const invitationsSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "users" },
    recevierId: { type: Schema.Types.ObjectId, ref: "tutors" },
    courseId: { type: Schema.Types.ObjectId, ref: "courses" },
    status: { type: String },// pending, rejected , ongoing , complete , disconnect
    isCompleteLesson: { type: String },// complete, inComplete ,
    callTime: {
      startTime: { type: Date },
      endTime: { type: Date },
      talkTime: { type: String },// seconds
      videoCallRecording: { type: String },// video
    }
  },
  {
    timestamps: true,
  }
);


const invitations = mongoose.model("invitations", invitationsSchema);
module.exports = invitations;
