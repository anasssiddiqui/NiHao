const userAuthService = require("../services/userAuth.services");
const { BadRequest } = require("../utility/apiError");
const { SuccessResponse } = require("../utility/apiResponse");
const { env } = require("../utility/config");
const { getDtoObject } = require("../helper/common");

//Controller Functions

/**
 * @description - This controller is used for Social login as tutor
 */


const socialLogin = async (req, res, next) => {
    const { signUpType, socialId } = req.body; 
    const response = await userAuthService.socialLogin({ body: req.body });
    return new SuccessResponse(response.msg, response.findsocialId).send(res);
};

/**
 * @description - This controller is used for Login as tutor
 */

const tutorEmailLogin = async (req, res, next) => {
    const { user, userToken } = await userAuthService.tutorEmailLogin(req.body);
    return new SuccessResponse("Logged in Successfully", {
        user,
        token: userToken,
    }).send(res);
};
/**
 * @description - This controller is used for signup as tutor
 */

const signUpTutor = async (req, res, next) => {
    const { user, token } = await userAuthService.signUpTutor({ body: req.body });
    return new SuccessResponse("signUp successfull", { user, token }).send(res);
};


/**
 * @description - This controller is used for verify forgot password as ambassador
 */

const verifyForgotPasswordOtpAmbassador = async (req, res, next) => {
    let { token } = await userAuthService.verifyForgotPasswordOtpAmbassador({ body: req.body })
    return new SuccessResponse("Otp verified successfully", { forgetPasswordToken: token }).send(res);
}

/**
 * @description - This controller is used for forgot password as ambassador
 */

const forgotPasswordAmbassador = async (req, res, next) => {
    const { email } = req.body;
    let { otp } = await userAuthService.forgotPasswordAmbassador({ email })
    if (env == 'Live') {
        return new SuccessResponse("Forget password email sent successfully").send(res);
    }
    else {
        return new SuccessResponse("Forget password email sent successfully", { otp }).send(res);
    }
};

/**
 * @description - This controller is used for Logout as ambassador
 */

const logoutAmbassador = async (req, res, next) => {
    await userAuthService.logoutAmbassador({ userId: req.decoded._id });
    return new SuccessResponse("Logged out successfully").send(res);
};

/**
 * @description - This controller is used for Login as ambassador
 */

const ambassadorEmailLogin = async (req, res, next) => {
    const { user, userToken } = await userAuthService.ambassadorEmailLogin(req.body);
    return new SuccessResponse("Logged in Successfully", {
        user,
        token: userToken,
    }).send(res);
};

/**
 * @description - This controller is used for signup as ambassador
 */

const signUpAmbassador = async (req, res, next) => {
    const response = await userAuthService.signUpAmbassador({ body: req.body });
    return new SuccessResponse("signUp successfull", response).send(res);
};

/**
 * @description - This controller is used for signup as student
 */

const signUpStudent = async (req, res, next) => {
    if (req.body.socialId) {
        var response = await userAuthService.socialsignUp({ body: req.body });
    }
    else {
        var response = await userAuthService.signUpStudent({ body: req.body });
    }
    return new SuccessResponse("signUp successfull", response).send(res);
    // const { token } = await userAuthService.signUpStudent({ body: req.body });
    // return new SuccessResponse("signUp successfull", { token }).send(res);
};

/**
 * @description - This controller is used for signup as employee
 */

const signUpEmployee = async (req, res, next) => {
    const { token } = await userAuthService.signUpEmployee({ body: req.body });
    return new SuccessResponse("signUp successfull", { token }).send(res);
};

/**
 * @description - This controller is used for signup as individual
 */

const signUpIndividual = async (req, res, next) => {
    const { token } = await userAuthService.signUpIndividual({ body: req.body });
    return new SuccessResponse("signUp successfull", { token }).send(res);
};

/**
 * @description - Login User Through Social
 */

// const socialLogin = async (req, res, next) => {
//     const { token, signUpType, role } = req.body;
//     if (signUpType == "google") {
//         const { user, userToken } = await userAuthService.googleLogin(token);
//         return new SuccessResponse("Login successfull", {
//             token: userToken,
//             user,
//         }).send(res);
//     }

//     if (signUpType === "facebook") {
//         const { user, userToken } = await userAuthService.fbLogin(token);
//         return new SuccessResponse("Login successfull", {
//             token: userToken,
//         }).send(res);
//     }

//     if (signUpType === "apple") {
//         const { user, userToken } = await userAuthService.appleLogin(token);
//         return new SuccessResponse("Login successfull", {
//             token: userToken,
//         }).send(res);
//     }

//     throw new BadRequest("Failure in Login using social Auth");
// };

/**
 * @description - This controller is used for logging in using the email 
 */

const emailLogin = async (req, res, next) => {
    const { user, userToken } = await userAuthService.emailLogin({ body: req.body });
    return new SuccessResponse("Logged in Successfully", {
        user,
        token: userToken,
    }).send(res);
};

/**
 * @description - This controller is used for logging out the user
 */

const logout = async (req, res, next) => {
    await userAuthService.logoutUser({ userId: req.decoded._id, userToken: req.token });
    return new SuccessResponse("Logged out successfully").send(res);

};

/**
 * @description - This controller is used for sending email for forget password
 */

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    let { otp } = await userAuthService.forgotPassword({ email })
    return new SuccessResponse("Forget password email sent successfully").send(res);

};

/**
 * @description - This controller is used for verify forget password otp
 */

const verifyForgotPasswordOtp = async (req, res, next) => {
    let { token } = await userAuthService.verifyForgotPasswordOtp({ body: req.body })
    return new SuccessResponse("Otp verified successfully", { forgetPasswordToken: token }).send(res);
}

/**
 * @description - This controller is used for set new password
 */

const setNewPassword = async (req, res, next) => {
    const { token } = req.params;
    const { password = "" } = req.body;
    await userAuthService.setNewPassword({ password, token })
    return res.send("Password updated successfully")
};


/**
 * @description - This controller is used for change password
 */

const changePassword = async (req, res, next) => {
    await userAuthService.changePassword({ body: req.body, userId: req.user._id })
    return res.send("Password changed successfully")
};


module.exports = {
    signUpStudent,
    signUpEmployee,
    signUpIndividual,
    socialLogin,
    emailLogin,
    logout,
    forgotPassword,
    setNewPassword,
    verifyForgotPasswordOtp,
    changePassword,
    signUpAmbassador,
    ambassadorEmailLogin,
    logoutAmbassador,
    forgotPasswordAmbassador,
    verifyForgotPasswordOtpAmbassador,
    signUpTutor,
    tutorEmailLogin
};