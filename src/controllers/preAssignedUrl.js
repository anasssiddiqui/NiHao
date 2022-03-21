const fileService = require("../services/file.service");
const { SuccessResponse } = require("../utility/apiResponse");

/**
 *
  @param {} req
  @param {} res
  @param {} next
 * @returns
 */
const generatePreSignedUrl = async (req, res, next) => {
  try {
    let dto = req.body;
    const {preSignedUrl,fileName} = await fileService.generatePreSignedUrl(dto);
    return new SuccessResponse("Successful", {preSignedUrl, fileName}).send(res);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = {
  generatePreSignedUrl,
};