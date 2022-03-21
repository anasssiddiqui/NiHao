const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const { jwtSecret, saltRounds } = require("../utility/config");
const bcrypt = require("bcryptjs");
const signUpTypes = ["google", "email", "facebook", "apple", "linkedin", "wechat"];
const ambassadorType = ["schoolBroker", "teacherBroker",];
const role = ['student', 'employee', 'individual', 'ambassador']
const userStatus = ['active', 'blocked', 'suspended', 'deleted']
const genderList = ['male', 'female', 'other']
const levelList = ["begineer", "elementry", "conversational", "intermediate", "advanced"]
const confortLevelList = ["confident", "okay", "terrified"]

/**
 * @swagger
 * components:
 *  schemas:
 *    Ambassador:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique mongoid
 *         example: ''
 *       ambassadorId:
 *         type: string
 *         example: ffdsg64534sdg6435
 *       firstName: 
 *         type: string
 *         example: John
 *       lastName: 
 *         type: string
 *         example: Doe
 *       fullName: 
 *         type: string
 *         example: John Doe
 *       mobile:
 *         type: string
 *         example: 1234567890
 *       email:
 *         type: string
 *         example: john@email.com
 *       password:
 *         type: string
 *         example: 12345678
 *       dob: 
 *         type: date
 *       profilePic:
 *         type: string
 *       gender:
 *         type: string
 *         enum: 
 *             - male
 *             - female
 *             - other
 *       role:
 *         type: string
 *         enum:
 *             - student
 *             - employee
 *             - individual
 *             - ambassador
 *       howPromote: 
 *         type: string
 *         example: any string
 *       sharedLinks: 
 *         type: string
 *         example: any string
 *       signUpType:
 *         type: string
 *         enum:
 *             - facebook
 *             - google
 *             - email
 *             - apple
 *             - instagram
 *       socialId:
 *         type: string
 *       appLanguage: 
 *         type: string
 *         enum: 
 *             - danish
 *             - english
 *             - french
 *             - german
 *             - greek
 *             - italian
 *             - mandarin
 *             - portugese
 *             - russian
 *             - swedish
 *             - spanish
 *             - turkish
 *       referralCode: 
 *         type: string
 *         example: any string
 *       otp: 
 *         type: string
 *         example: 9865
 *       isOtpVerified: 
 *         type: boolean
 *         example: false
 *       otpCreatedAt: 
 *         type: date
 *       otpExpiryTime: 
 *         type: date
 *       otpVerificationTime: 
 *         type: date
 *       isEmailVerified: 
 *         type: boolean
 *         example: false
 *       emailVerificationToken: 
 *         type: string
 *         example: nknkhufhggjkhkg
 *       forgetPasswordToken:
 *         type: string
 *         example: nknkhufhggjkhkg
 *       stripeCustomerId:
 *         type: string
 *         example: fhhlflfjqwfhekj
 *       appDeviceId:
 *         type: string
 *         example: deviceId
 *       status:
 *         type: string
 *         enum:
 *             - active
 *             - blocked
 *             - suspended
 *             - deleted
 *       tokenValidateKey:
 *         type: string
 *         example: jldfh
 *       token:
 *         type: string
 *       fcmToken:
 *         type: string
 *         example: jldfh
 *       address:
 *         type: object
 *         properties:
 *           location:
 *             type: string
 *             example: abc djf
 *           country:
 *             type: string
 *             example: inc
 *           timezone:
 *             type: string
 *             example: kolkata
 *       failedLoginAttempts:
 *         type: integer
 *         example: 0
 *       isAgreeWithTNC:
 *         type: boolean
 *         example: true
 *       emailPreferences:
 *         type: object
 *         properties:
 *           messagesEnabled:
 *             type: boolean
 *             example: false
 *           promotionsEnabled:
 *             type: boolean
 *             example: false
 *           lessionAndProgressEnabled:
 *             type: boolean
 *             example: false
 *           scheduleUpdateEnabled:
 *             type: boolean
 *             example: false
 *           referralEnabled:
 *             type: boolean
 *             example: false
 *           accountUpdateEnabled:
 *             type: boolean
 *             example: false
 */

const userSchema = new Schema(
  {
    ambassadorId: { type: String },
    ambassadorType: { type: String },
    firstName: { type: String },
    userName: { type: String },
    passportName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    mobile: { type: String, },
    email: { type: String, lowercase: true, maxlength: 80, minlength: 3, trim: true },
    profilePic: { type: String },
    password: { type: String, minLength: 6, maxLength: 128 },
    dob: { type: Date },
    gender: { type: String, enum: genderList },
    image: { type: String },
    role: { type: String, enum: role }, // student,employee,individual
    howPromote: { type: String },
    sharedLinks: { type: String },
    appLanguage: { type: String, },
    language: { type: String, },
    referralCode: { type: String },
    signUpType: { type: String, enum: signUpTypes }, // "google" ,"facebook" "apple" "email" "instagram"
    socialId: { type: String, },
    otp: { type: String, minlength: 4, maxlength: 6 },
    isOtpVerified: { type: Boolean, default: false },
    forgetPasswordToken: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    stripeCustomerId: { type: String, trim: true },
    // This status is user status like active, blocked , suspend etc
    status: { type: String, enum: userStatus, default: "active" },
    // tokenValidateKey will be used when the token needs to be invalidated in case the user token is compromised
    tokenValidateKey: { type: String, trim: true },
    token: { type: String },
    fcmToken: { type: String },
    appDeviceId: { type: String },
    otpCreatedAt: { type: Date },
    otpExpiryTime: { type: Date },
    otpVerificationTime: { type: Date },
    failedLoginAttempts: { type: Number, default: 0 },
    isAgreeWithTNC: { type: Boolean, default: false },
    loginPhase: { type: Number },
    isProfileVerified: { type: Number, default: 0 }, // 0 pending // 1 accepted // 2 rejected
    profileVerifiedTime: { type: Date },
    otpVerificationTime: { type: Date },
    address: {
      city: { type: String },
      location: { type: String },
      country: { type: String },
      timezone: { type: String },
    },
    emailPreferences: {
      messagesEnabled: { type: Boolean, default: false },
      promotionsEnabled: { type: Boolean, default: false },
      lessionAndProgressEnabled: { type: Boolean, default: false },
      scheduleUpdateEnabled: { type: Boolean, default: false },
      referralEnabled: { type: Boolean, default: false },
      accountUpdateEnabled: { type: Boolean, default: false },
    },
    bankDetails: {
      bankAccountNo: { type: String },
      bankName: { type: String },// ios // android // windows
      swiftCode: { type: String },
      bankCountry: { type: String, },// web // device
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async function () {

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

userSchema.methods.matchPassword = async function (password = "") {
  let user = this;
  return bcrypt.compareSync(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hashSync(user.password, saltRounds);
  }
  next();
});

const Ambassador = mongoose.model("ambassador", userSchema);
module.exports = Ambassador;
