const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const { jwtSecret, saltRounds } = require("../utility/config");
const bcrypt = require("bcryptjs");
const signUpTypes = ["google", "email", "facebook", "apple", "linkedin"];
const role = ['student', 'employee', 'individual'];
const userStatus = ['active', 'blocked', 'suspended', 'deleted'];
const operatingSystem = ['ios', 'windows', 'android'];
const loginType = ['web', 'device'];
const genderList = ['male', 'female', 'other'];
const languageList = ['danish', 'english', 'french', 'german', 'greek', 'italian', 'mandarin', 'portugese', 'russian', 'swedish', 'spanish', 'turkish'];
const levelList = ["begineer", "elementry", "conversational", "intermediate", "advanced"];
const confortLevelList = ["confident", "okay", "terrified"]

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique mongoid
 *         example: ''
 *       accountId:
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
 *         example: filename
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
 *             - tutor
 *       level: 
 *         type: string
 *         enum:
 *             - begineer
 *             - elementry
 *             - conversational
 *             - intermediate
 *             - advanced
 *       goal: 
 *         type: string
 *         example: any string
 *       bio: 
 *         type: string
 *         example: any string
 *       interest:
 *         type: array
 *         items:
 *           type: string
 *           example: interest name
 *       signUpType:
 *         type: string
 *         enum:
 *             - facebook
 *             - google
 *             - email
 *             - apple
 *             - instagram
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
 *       comfortLevel: 
 *         type: string
 *         enum: 
 *             - confident
 *             - okay
 *             - terrified
 *       currentFocus: 
 *         type: string
 *         example: any string
 *       corrections: 
 *         type: string
 *         example: any string
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
 *         example: 15151515151
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
    accountId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    mobile: { type: String, minlength: 8, maxlength: 12 },
    email: { type: String, lowercase: true, maxlength: 80, minlength: 3, trim: true },
    studentId: { type: Number },
    employeeId: { type: Number },
    password: { type: String, minLength: 6, maxLength: 128 },
    dob: { type: Date },
    gender: { type: String, enum: genderList },
    profilePic: { type: String },
    role: { type: String, enum: role }, // student,employee,individual,student
    level: { type: String, enum: levelList },
    goal: { type: String },
    bio: { type: String },
    interest: { type: String, trim: true },
    appLanguage: { type: String },
    comfortLevel: { type: String },
    currentFocus: { type: String, trim: true },
    corrections: { type: String, trim: true },
    referralCode: { type: String },
    signUpType: { type: String, enum: signUpTypes }, // "google" ,"facebook" "apple" "email" "instagram"
    otp: { type: String, minlength: 4, maxlength: 6 },
    isOtpVerified: { type: Boolean, default: false },
    otpCreatedAt: { type: Date },
    otpExpiryTime: { type: Date },
    otpVerificationTime: { type: Date },
    forgetPasswordToken: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    stripeCustomerId: { type: String, trim: true },
    // This status is user status like active, blocked , suspend etc
    status: { type: String, enum: userStatus, default: "active" },
    // tokenValidateKey will be used when the token needs to be invalidated in case the user token is compromised
    tokenValidateKey: { type: String, trim: true },
    socialId: { type: String },
    token: { type: String },
    appDeviceId: { type: String },
    likedTutors: [{ type: Schema.Types.ObjectId, ref: "tutors" }],
    notifyOnlineTeacher: [{ type: Schema.Types.ObjectId, ref: "tutors" }],
    followTutors: [{ type: Schema.Types.ObjectId, ref: "tutors" }],
    hideTutors: [{ type: Schema.Types.ObjectId, ref: "tutors" }],
    failedLoginAttempts: { type: Number, default: 0 },
    isAgreeWithTNC: { type: Boolean, default: false },
    haveSubscription: { type: Boolean, default: false },
    progress: {
      currentDayStreak: { type: Number, default: 0 },
      tutorsMet: { type: Number, default: 0 }, // ios // android // windows
      totalMinutes: { type: Number, default: 0 },
    },
    notificationDetails: {
      notificationEnabled: { type: Boolean, default: true },
      operatingSystem: { type: String, enum: operatingSystem },// ios // android // windows
      token: { type: String },
      loginType: { type: String, enum: loginType },// web // device
    },
    switchRole: {
      isSwitchRole: { type: Boolean, default: false },
      currentSwitchEnabled: { type: Boolean, default: false },
      previousRole: { type: String },
    },
    ambassdorRef: {
      isAmbassdorRef: { type: Boolean, default: false },
      ambassdorCode: { type: String },
    },
    address: {
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
    subscriptionPlan: {
      planName: { type: String },
      currency: { type: String },
      duration: { type: Number },
      minutes: { type: Number },
      days: { type: Number },// per week
      purchaseDate: { type: Number },
      expiryDate: { type: Number },
    }
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
  if (user.isModified("password") && user.switchRole.isSwitchRole == false) {
    user.password = await bcrypt.hashSync(user.password, saltRounds);
  }
  next();
});

const Users = mongoose.model("users", userSchema);
module.exports = Users;
