const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const { jwtSecret, saltRounds } = require("../utility/config");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * components:
 *  ratings:
 *    invitations:
 *     type: object
 *     properties:
 *       studentId:
 *         type: string
 *         example: '621cb9064668bf8402b7aae4'
 *       tutorId:
 *         type: string
 *         example: '621cbf8ac6c8a72c40c6d775'
 *       review:
 *         type: array
 *         example: 'nice one'
 *       ratings:
 *         type: array
 *         example: '5'
 *       comments:
 *         type: array
 *         example: [best,good]
 */


const ratingsSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "users" },
    tutorId: { type: Schema.Types.ObjectId, ref: "tutors" },
    invitationId: { type: Schema.Types.ObjectId, ref: "invitations" },
    roles: { // student , tutor
      sender: { type: String },
      recevier: { type: String }
    },
    review: { type: String, default: null },
    ratings: { type: Number },// upto 5
    comments: [{ type: String }],
  },
  {
    timestamps: true,
  }
);


const ratings = mongoose.model("ratings", ratingsSchema);
module.exports = ratings;
