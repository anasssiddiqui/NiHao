const tutorAuthService = require("../services/tutorAuth.services");
const { BadRequest } = require("../utility/apiError");
const { SuccessResponse } = require("../utility/apiResponse");
const { env } = require("../utility/config");
const { getDtoObject } = require("../helper/common");

//Controller Functions


/**
 * @description - This controller is used for set new password
 */

const setNewPassword = async (req, res, next) => {
    const { token } = req.params;
    const { password = "" } = req.body;
    await tutorAuthService.setNewPassword({ password, token })
    return res.send("Password updated successfully")
};

/**
 * @description - This controller is used for verify forgot password as tutor
 */

const verifyForgotPassword = async (req, res, next) => {
    let { token } = await tutorAuthService.verifyForgotPasswordOtp({ body: req.body })
    return new SuccessResponse("Otp verified successfully", { forgetPasswordToken: token }).send(res);
}

/**
 * @description - This controller is used for verify forgot password as ambassador
 */

const tutorforgotPassword = async (req, res, next) => {
    const { email } = req.body;
    let { otp } = await tutorAuthService.tutorForgotPassword({ email })
    return new SuccessResponse("Forget password email sent successfully").send(res);

};


/**
 * @description - This controller is used for Login as tutor
 */

const tutorEmailLogin = async (req, res, next) => {
    const { user, userToken } = await tutorAuthService.tutorEmailLogin(req.body);
    return new SuccessResponse("Logged in Successfully", {
        user,
        token: userToken,
    }).send(res);
};


/**
 * @description - This controller is used for social signup as tutor
 */

const signUpTutor = async (req, res, next) => {
    if (req.body.socialId) {
        var response = await tutorAuthService.socialsignUpTutor({ body: req.body });
    }
    else {
        var response = await tutorAuthService.signUpTutor({ body: req.body });
    }
    return new SuccessResponse("signUp successfull", response).send(res);
};


/**
 * @description - This controller is used for Social login as tutor
 */


const socialLogin = async (req, res, next) => {
    const { fcmToken, signUpType, role, socialId } = req.body;
    const response = await tutorAuthService.socialLogin({ body: req.body });
    return new SuccessResponse(response.msg, response.findsocialId).send(res);
};

/**
 * @description - This controller is used for verify forget password otp
 */

const verifyForgotPasswordOtp = async (req, res, next) => {
    let { token } = await tutorAuthService.verifyForgotPasswordOtp({ body: req.body })
    return new SuccessResponse("Otp verified successfully", { forgetPasswordToken: token }).send(res);
}




/**
 * @description - This controller is used for change password
 */

const changePassword = async (req, res, next) => {
    await tutorAuthService.changePassword({ body: req.body, userId: req.user._id })
    return res.send("Password changed successfully")
};




module.exports = {
    verifyForgotPassword,
    signUpTutor,
    socialLogin,
    tutorforgotPassword,
    setNewPassword,
    verifyForgotPasswordOtp,
    changePassword,
    tutorEmailLogin
};