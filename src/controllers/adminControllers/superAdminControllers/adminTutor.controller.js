const tutorServices = require("../../../services/adminServices/superAdminServices/tutor.services");
const { BadRequest } = require("../../../utility/apiError");
const { SuccessResponse } = require("../../../utility/apiResponse");
const { env } = require("../../../utility/config");
const { getDtoObject } = require("../../../helper/common");

//Controller Functions


/**
 * @description - This controller is used for get ambassadorList
 */

const tutorsDetails = async (req, res, next) => {
    const { tutordetails } = await tutorServices.tutorsDetails({ body: req.body });
    return new SuccessResponse("Get tutors details successfully", { tutordetails }).send(res);
};


/**
 * @description - This controller is used for get ambassadorList
 */

const acceptRequest = async (req, res, next) => {
    const ambassadorsList = await tutorServices.acceptRequest({ body: req.body });
    return new SuccessResponse("Accept tutor request successfully").send(res);
};

/**
 * @description - This controller is used for get ambassadorList
 */

const tutorsList = async (req, res, next) => {

    const ambassadorsList = await tutorServices.tutorsList();
    return new SuccessResponse("Get tutors list successfully", ambassadorsList).send(res);

};


const rejectRequest = async (req, res, next) => {
    await tutorServices.rejectRequest({ body: req.body });
    return new SuccessResponse("Reject tutor request successfully").send(res);
};





module.exports = {
    tutorsDetails,
    rejectRequest,
    acceptRequest,
    tutorsList
};