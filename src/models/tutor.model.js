const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const { jwtSecret, saltRounds } = require("../utility/config");
const bcrypt = require("bcryptjs");
const signUpTypes = ["google", "email", "facebook", "apple", "linkedin"];
const role = ['student', 'employee', 'individual', 'tutor']
const userStatus = ['active', 'blocked', 'suspended', 'deleted']
const genderList = ['male', 'female', 'other']
const levelList = ["begineer", "elementry", "conversational", "intermediate", "advanced"]
const personalityList = ["Kind And Patient", "Fun And Gregarious", "Terrrified"]
const operatingSystem = ["ios", "windows"];
const loginType = ["web", "device"]

/**
 * @swagger
 * components:
 *  schemas:
 *    Tutor:
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
 *         example: const role = ['student','employee','individual','tutor']
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
    password: { type: String, minLength: 6, maxLength: 128 },
    profilePic: { type: String },
    resume: { type: String, },
    goal: { type: String },
    bio: { type: String },
    myTutoringStyle: { type: String },
    interest: { type: String, trim: true },
    currentFocus: { type: String },
    bestAt: { type: String },
    corrections: { type: String, trim: true },
    referralCode: { type: String },
    socialId: { type: String, },
    otp: { type: String, minlength: 4, maxlength: 6 },
    forgetPasswordToken: { type: String },
    emailVerificationToken: { type: String },
    stripeCustomerId: { type: String, trim: true },
    tokenValidateKey: { type: String, trim: true },
    token: { type: String },
    fcmToken: { type: String },
    appDeviceId: { type: String },
    goal: { type: String },
    education: { type: String },
    currentPreviousProfession: { type: String },
    appLanguage: { type: String, },
    comfortLevel: { type: String, },
    desktopNotifications: { type: Boolean },
    shareMyVideos: { type: Boolean },
    status: { type: String, enum: userStatus, default: "active" },
    signUpType: { type: String, enum: signUpTypes }, // "google" ,"facebook" "apple" "email" "instagram"
    gender: { type: String, enum: genderList },
    role: { type: String, enum: role }, // student, employee, individual, student
    level: { type: String },
    personality: { type: String, enum: personalityList },
    experience: { type: Date },
    dob: { type: Date },
    otpVerificationTime: { type: Date },
    otpCreatedAt: { type: Date },
    otpExpiryTime: { type: Date },
    isProfileVerified: { type: Number, default: 0 }, // 0 pending // 1 accepted // 2 rejected
    profileVerifiedTime: { type: Date },
    studentId: { type: Number },
    employeeId: { type: Number },
    loginPhase: { type: Number, default: 0 },
    failedLoginAttempts: { type: Number, default: 0 },
    currentSwitchEnabled: { type: Boolean, default: false },
    isOtpVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isAgreeWithTNC: { type: Boolean, default: false },
    courses: [{ type: Schema.Types.ObjectId, ref: "courses" }],
    specialitys: [{ type: String }],
    history: {
      avgRatings: { type: Number, default: 0 },
      studentsMet: { type: Number, default: 0 },
      totalMinutes: { type: Number, default: 0 },
      firstClass: { type: Date, default: null },
      lastClass: { type: Date, default: null },
    },
    notificationDetails: {
      notificationEnabled: { type: Boolean, default: true },
      operatingSystem: { type: String, enum: operatingSystem },// ios // windows
      token: { type: String },
      loginType: { type: String, enum: loginType },// web // device
    },
    ambassdorRef: {
      isAmbassdorRef: { type: Boolean, default: false },
      ambassdorCode: { type: String },
    },
    languages: [{
      language: { type: String },
      level: { type: String },
    }],
    teachingVideos: [{
      file: { type: String },
      title: { type: String },
    }],
    avalaibleDates: [{
      date: { type: Date },
    }],
    address: {
      state: { type: String },
      country: { type: String },
      city: { type: String },
      address: { type: String },
      timezone: { type: String },
      location: { type: String },
    },
    notificationSettings: {
      receive24HourAdvanceEmailsEnabled: { type: Boolean, default: false },
      advanceWarningEnabled: { type: Boolean, default: false },
      receiveStudentMessageEnabled: { type: Boolean, default: false },
      reservationConfirmedNotification: { type: Boolean, default: false },
    },
    emailPreferences: {
      messagesEnabled: { type: Boolean, default: false },
      promotionsEnabled: { type: Boolean, default: false },
      lessionAndProgressEnabled: { type: Boolean, default: false },
      scheduleUpdateEnabled: { type: Boolean, default: false },
      referralEnabled: { type: Boolean, default: false },
      accountUpdateEnabled: { type: Boolean, default: false },
    },
    teachingCertificate: {
      certificate: { type: String },
      uploadStatus: { type: String },
      certificateType: { type: String },
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
  if (user.isModified("password")) {
    user.password = await bcrypt.hashSync(user.password, saltRounds);
  }
  next();
});

const Tutor = mongoose.model("tutors", userSchema);
module.exports = Tutor;
