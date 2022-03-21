const adminAuthServices = require("../../../services/adminServices/superAdminServices/adminAuth.services");
const ambassadorServices = require("../../../services/adminServices/superAdminServices/ambassador.services");

const { BadRequest } = require("../../../utility/apiError");
const { SuccessResponse } = require("../../../utility/apiResponse");
const { env } = require("../../../utility/config");
const { getDtoObject } = require("../../../helper/common");

//Controller Functions


/**
 * @description - This controller is used for get ambassador details
 */ 


 const ambassadorDetails = async (req, res, next) => {
    const {ambassadorDetails} = await ambassadorServices.ambassadorDetails({body:req.body});
    return new SuccessResponse("Get ambassadors details successfully",{ambassadorDetails}).send(res);
};


/**
 * @description - This controller is used for get ambassadorList
 */ 


 const acceptRequest = async (req, res, next) => {
    const ambassadorsList = await ambassadorServices.acceptRequest({body:req.body});
    return new SuccessResponse("Accept ambassador successfully").send(res);
};


/**
 * @description - This controller is used for get ambassadorList
 */ 


const ambassadorsList = async (req, res, next) => {
    const ambassadorsList = await ambassadorServices.ambassadorsList();
    return new SuccessResponse("Get ambassadors list successfully",ambassadorsList).send(res);
};

const rejectRequest = async (req, res, next) => {
     await ambassadorServices.rejectRequest({body:req.body});
    return new SuccessResponse("Reject ambassador successfully").send(res);
};





module.exports = {
    ambassadorDetails,
    rejectRequest,
    acceptRequest,
    ambassadorsList
};