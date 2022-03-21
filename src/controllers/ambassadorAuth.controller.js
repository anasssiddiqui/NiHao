const ambassadorAuthService = require("../services/ambassadorAuth.services");
const { BadRequest } = require("../utility/apiError");
const { SuccessResponse } = require("../utility/apiResponse");
const { env } = require("../utility/config");
const { getDtoObject } = require("../helper/common");

//Controller Functions


/**
 * @description - This controller is used for socialLogin as ambassador
 */

const socialLogin = async (req, res, next) => {
    const { fcmToken, signUpType, role, socialId } = req.body;
    const response = await ambassadorAuthService.socialLogin({ body: req.body });
    return new SuccessResponse(response.msg,response.findsocialId ).send(res);};


/**
 * @description - This controller is used for set new password as ambassador
 */

const setNewPassword = async (req, res, next) => {
    const { token } = req.params;
    const { password = "" } = req.body;
    await ambassadorAuthService.setNewPassword({ password, token })
    return res.send("Password updated successfully")
};

/**
 * @description - This controller is used for verify forgot password as ambassador
 */

 const verifyForgotPasswordOtpAmbassador = async (req, res, next) => {
    let { token } = await ambassadorAuthService.verifyForgotPasswordOtpAmbassador({ body: req.body })
    return new SuccessResponse("Otp verified successfully", { forgetPasswordToken: token }).send(res);
}

/**
 * @description - This controller is used for forgot password as ambassador
 */

const forgotPasswordAmbassador = async (req, res, next) => {
    const { email } = req.body;
    let { otp } = await ambassadorAuthService.forgotPassword({ email })
        return new SuccessResponse("Forget password email sent successfully").send(res);
   
};

/**
 * @description - This controller is used for Logout as ambassador
 */

const logoutAmbassador = async (req, res, next) => {
    await ambassadorAuthService.logoutAmbassador({ userId: req.decoded._id });
    return new SuccessResponse("Logged out successfully").send(res);
};

/**
 * @description - This controller is used for Login as ambassador
 */

const ambassadorEmailLogin = async (req, res, next) => {
    const { user, userToken } = await ambassadorAuthService.ambassadorEmailLogin(req.body);
    return new SuccessResponse("Logged in Successfully", {
        user,
        token: userToken,
    }).send(res);
};

/**
 * @description - This controller is used for signup as ambassador
 */

const signUpAmbassador = async (req, res, next) => {
    if(req.body.socialId)
    var response = await ambassadorAuthService.socialsignUpAmbassador({ body: req.body });
    else {
    var response = await ambassadorAuthService.signUpAmbassador({ body: req.body });
    }
    return new SuccessResponse("signUp successfull", response).send(res);
};


/**
 * @description - This controller is used for verify forget password otp
 */

const verifyForgotPasswordOtp = async (req, res, next) => {
    let { token } = await ambassadorAuthService.verifyForgotPasswordOtp({ body: req.body })
    return new SuccessResponse("Otp verified successfully", { forgetPasswordToken: token }).send(res);
}

/**
 * @description - This controller is used for change password
 */

const changePassword = async (req, res, next) => {
    await ambassadorAuthService.changePassword({ body: req.body, userId: req.user._id })
    return res.send("Password changed successfully")
};




module.exports = {
    socialLogin,
    setNewPassword,
    verifyForgotPasswordOtp,
    changePassword,
    signUpAmbassador,
    ambassadorEmailLogin,
    logoutAmbassador,
    forgotPasswordAmbassador,
    verifyForgotPasswordOtpAmbassador,
};