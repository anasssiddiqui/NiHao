const Users = require("../models/user.model");
const Ambassador = require("../models/ambassador.model");
const Tutor = require("../models/tutor.model");
const Admins = require("../models/admins.model");



const { ObjectId } = require("mongoose").Types;

const getUserById = async (decoded) => {
    const user = await Users.findOne(
        { _id: ObjectId(decoded._id) },
        { tokens: 0, password: 0 }
    );
    if (!user) {
        throw new Error("No user found");
    }
    return user;
};

const getAdminById = async (decoded) => {
    const user = await Admins.findOne(
        { _id: ObjectId(decoded._id) },
        { tokens: 0, password: 0 }
    );
    if (!user) {
        throw new Error("No user found");
    }
    return user;
};

const getAmbassadorById = async (decoded) => {
    const user = await Ambassador.findOne(
        { _id: ObjectId(decoded._id) },
        { tokens: 0, password: 0 }
    );
    if (!user) {
        throw new Error("No user found");
    }
    return user;
};

const getTutorById = async (decoded) => {
    const user = await Tutor.findOne(
        { _id: ObjectId(decoded._id) },
        { tokens: 0, }
    );
    if (!user) {
        throw new Error("No user found");
    }
    return user;
};

const injectUserDetails = async (req, res, next) => {
    try {
        let user = await getUserById(req.decoded);
        req.user = user;
        next();
    } catch (e) {
        logger.error(e);
        return res.status(400).send({
            status: "BadRequest",
            statusCode: 400,
            message: e.message,
        });
    }
};

const injectAmbassadorDetails = async (req, res, next) => {
    try {
        let user = await getAmbassadorById(req.decoded);
        req.user = user;
        next();
    } catch (e) {
        logger.error(e);
        return res.status(400).send({
            status: "BadRequest",
            statusCode: 400,
            message: e.message,
        });
    }
};

const injectTutorDetails = async (req, res, next) => {
    try {
        let user = await getTutorById(req.decoded);
        req.user = user;
        next();
    } catch (e) {
        logger.error(e);
        return res.status(400).send({
            status: "BadRequest",
            statusCode: 400,
            message: e.message,
        });
    }
};

const injectAdminDetails = async (req, res, next) => {
    try {
        let user = await getAdminById(req.decoded);
        req.user = user;
        next();
    } catch (e) {
        logger.error(e);
        return res.status(400).send({
            status: "BadRequest",
            statusCode: 400,
            message: e.message,
        });
    }
};

module.exports = {
    injectAdminDetails,
    injectAmbassadorDetails,
    injectUserDetails,
    injectTutorDetails
};