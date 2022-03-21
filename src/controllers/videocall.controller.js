const videocallService = require("../services/videocall.services");
const { BadRequest } = require("../utility/apiError");
const { SuccessResponse } = require("../utility/apiResponse");

//Controller Functions

/**
 * @description - This controller is used for finish call complete call 
 */

const disconnectCall = async (req, res, next) => {
    await videocallService.disconnectCall({ user: req.user, body: req.body });
    return res.send("call has been disconnected")
};


/**
 * @description - This controller is used for finish call complete call 
 */

const endCall = async (req, res, next) => {
    const { updateInvitation } = await videocallService.endCall({ user: req.user, body: req.body });
    return new SuccessResponse("End call sucessfully", { updateInvitation }).send(res);
};

/**
 * @description - This controller is used for create token ( twilio video call )
 */

const acceptInvitation = async (req, res, next) => {
    await videocallService.acceptInvitation({ user: req.user, body: req.body });
    return res.send("Accept invitation sucessfully")
};

/**
 * @description - This controller is used for create token ( twilio video call)
 */

const sendJoinInvitation = async (req, res, next) => {
    await videocallService.sendJoinInvitation({ user: req.user, body: req.body });
    return res.send("Send video call notification sucessfully")
};


/**
 * @description - This controller is used for create token ( twilio video call)
 */

const createToken = async (req, res, next) => {
    const { token } = await videocallService.createToken({ user: req.user, body: req.body });
    return new SuccessResponse("Create tokken", { token }).send(res);
};




module.exports = {
    disconnectCall,
    endCall,
    acceptInvitation,
    sendJoinInvitation,
    createToken,
};