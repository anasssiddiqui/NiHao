const express = require("express");
const router = express.Router();
const authUserRoutes = require("../v1/authUser.routes")
const ambassadorAuth = require("../v1/ambassadorAuth.routes")
const tutorAuth = require("../v1/tutorAuth.routes")
const studentRoutes = require("../v1/student.routes");
const ambassadorRoutes = require("../v1/ambassador.routes");
const tutorRoutes = require("../v1/tutor.routes");
const commonRoutes = require("../v1/common.routes");

const adminAuth = require("../v1/adminsRoutes/superAdminRoutes/adminAuth.routes")
const adminTutorRoutes = require("../v1/adminsRoutes/superAdminRoutes/tutor.routes")
const adminAmbassadorRoutes = require("../v1/adminsRoutes/superAdminRoutes/ambassador.routes")
const adminCourcesRoutes = require("../v1/adminsRoutes/superAdminRoutes/cources.routes")
const adminSyllabusRoutes = require("../v1/adminsRoutes/superAdminRoutes/syllabus.routes")
const adminSubscriptionRoutes = require("../v1/adminsRoutes/superAdminRoutes/subscription.routes")
const adminCategoryRoutes = require("../v1/adminsRoutes/superAdminRoutes/category.routes");
const adminSurveyRoutes = require("../v1/adminsRoutes/superAdminRoutes/survey.routes")

const videoCall = require("../v1/videoCall.routes")








const routes = [
    {
        method: "use",
        url: "/user",
        handler: authUserRoutes,
    },
    {
        method: "use",
        url: "/student",
        handler: studentRoutes,
    },
    {
        method: "use",
        url: "/ambassador",
        handler: ambassadorRoutes,
    },
    {
        method: "use",
        url: "/ambassador",
        handler: ambassadorAuth,
    },
    {
        method: "use",
        url: "/tutor",
        handler: tutorAuth,
    },
    {
        method: "use",
        url: "/admin",
        handler: adminAuth,
    },
    {
        method: "use",
        url: "/tutor",
        handler: tutorRoutes,
    },
    {
        method: "use",
        url: "/common",
        handler: commonRoutes,
    },
    {
        method: "use",
        url: "/admin/ambassador",
        handler: adminAmbassadorRoutes,
    },
    {
        method: "use",
        url: "/admin/tutor",
        handler: adminTutorRoutes,
    },
    {
        method: "use",
        url: "/admin/courses",
        handler: adminCourcesRoutes,
    },
    {
        method: "use",
        url: "/admin/syllabus",
        handler: adminSyllabusRoutes,
    },
    {
        method: "use",
        url: "/admin/subscription",
        handler: adminSubscriptionRoutes,
    },
    {
        method: "use",
        url: "/admin/category",
        handler: adminCategoryRoutes,
    },
    {
        method: "use",
        url: "/admin/survey",
        handler: adminSurveyRoutes,
    },
    {
        method: "use",
        url: "/videoCall",
        handler: videoCall,
    },

];

router.get("/status", (req, res) => res.send("OK"));

(function () {
    routes.forEach((route) => {
        router[route.method](route.url, route.handler);
    });
})();

module.exports = router;