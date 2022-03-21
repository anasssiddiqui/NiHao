const adminAuthServices = require("../../../services/adminServices/superAdminServices/adminAuth.services");
const { BadRequest } = require("../../../utility/apiError");
const { SuccessResponse } = require("../../../utility/apiResponse");
const { env } = require("../../../utility/config");
const { getDtoObject } = require("../../../helper/common");

//Controller Functions

/**
 * @description - This controller is used for change password
 */


const logout = async (req, res, next) => {
    await adminAuthServices.logout({ userId: req.decoded._id });
    return new SuccessResponse("Logged out successfully").send(res);
};


/**
 * @description - This controller is used set new password
 */

const changePassword = async (req, res, next) => {
    await adminAuthServices.changePassword({ body: req.body, userId: req.user._id })
    return res.send("Password changed successfully")
};


/**
 * @description - This controller is used set new password
 */

const setNewPassword = async (req, res, next) => {
    const { token } = req.params;
    const { password = "" } = req.body;
    await adminAuthServices.setNewPassword({ password, token })
    return res.send("Password updated successfully")
};

/**
 * @description - This controller is used for Verify otp
 */

const verifyForgotPassword = async (req, res, next) => {
    let { token } = await adminAuthServices.verifyForgotPassword({ body: req.body })
    return new SuccessResponse("Otp verified successfully", { forgetPasswordToken: token }).send(res);
}


/**
 * @description - This controller is used for Login as super admin
 */

const emailLogin = async (req, res, next) => {

    const { user, userToken } = await adminAuthServices.emailLogin(req.body);
    return new SuccessResponse("Logged in Successfully", {
        user,
        token: userToken,
    }).send(res);
};

/**
 * @description - This controller is used for Login as tutor
 */

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    let { otp } = await adminAuthServices.forgotPassword({ email })
    if (env !== "development")
        return new SuccessResponse("Forget password email sent successfully").send(res);
    else
        return new SuccessResponse("Forget password email sent successfully", { otp }).send(res);
};




module.exports = {
    emailLogin,
    forgotPassword,
    verifyForgotPassword,
    setNewPassword,
    changePassword,
    logout
};