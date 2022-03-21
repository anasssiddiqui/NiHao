function checkRole(roles) {
    return function (req, res, next) {
        if (!roles.includes(req.decoded.role))
            return res.status(401).send({ message: "Unauthorized" });
        else next();
    };
}

function requireRole(req, res, next) {
    if (!req.decoded.role)
        return res.status(401).send({ message: "Unauthorized" });
    else next();
}

module.exports = { checkRole, requireRole };