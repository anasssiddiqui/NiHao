const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../utility/config");
const { Unauthorized } = require("../utility/apiError");
const { decodeToken } = require("../helper/common");

/**
 * @description This is the User Authentication Middleware
 * @param {Request} req - The request object
 * @param {Response} res - The reponse Object
 * @param {import("express").NextFunction} next - The next function used to pass control to next chained middleware
 */

const userAuthMiddleware = async (req, res, next) => {
    try {
        let token = req.header("Authorization").replace("Bearer ", "");
        const decode = decodeToken(token);
        req.token = token;
        req.decoded = decode;
        next();
    } catch (e) {
        logger.error(e);
        return res.status(401).send({
            status: "Unauthorized",
            statusCode: 401,
            message: e.message,
        });
    }
};

module.exports = { userAuthMiddleware };