const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const { jwtSecret, saltRounds } = require("../utility/config");
const bcrypt = require("bcryptjs");

const role = ['superAdmin', 'subAdmin']
/**
 * @swagger
 * components:
 *  schemas:
 *    Admins:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique mongoid
 *         example: ''
 *       email:
 *         type: string
 *         example: ffdsg64534sdg6435
 *       password: 
 *         type: string
 *         example: John
 *       image: 
 *         type: string
 *         example: John Doe
 *       modulePermisssions: 
 *         type: string
 *         example: Doe
 *       otp:
 *         type:string
 * 
 */

const adminSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: role },
    modulePermisssions: { type: String },
    otp: { type: String, minlength: 4, maxlength: 6 },
    isOtpVerified: { type: Boolean, default: false },
    otpCreatedAt: { type: Date },
    otpExpiryTime: { type: Date },
    ratingsSurvey: {
      oneStar: { params: [{ type: String }], activationEnable: { type: Boolean, default: true }, enable: { type: Boolean, default: true } },
      twoStars: { params: [{ type: String }], activationEnable: { type: Boolean, default: true }, enable: { type: Boolean, default: true } },
      threeStars: { params: [{ type: String }], activationEnable: { type: Boolean, default: true }, enable: { type: Boolean, default: true } },
      fourStars: { params: [{ type: String }], activationEnable: { type: Boolean, default: true }, enable: { type: Boolean, default: true } },
      fiveStars: { params: [{ type: String }], activationEnable: { type: Boolean, default: true }, enable: { type: Boolean, default: true } }
    },
    otpVerificationTime: { type: Date },
    forgetPasswordToken: { type: String },
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.generateToken = async function () {
  let user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      role: user.role,
    },
    jwtSecret
  );
  user.token = token
  await user.save();
  return token;
};

adminSchema.methods.matchPassword = async function (password = "") {
  let user = this;
  return bcrypt.compareSync(password, user.password);
};

adminSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hashSync(user.password, saltRounds);
  }
  next();
});

const Admins = mongoose.model("admins", adminSchema);
module.exports = Admins;
