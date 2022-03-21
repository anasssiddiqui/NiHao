const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { swaggerOptions } = require("../../utility/config");
// const asyncHandler = require('../../helper/async_handler')

/*** @description GET v1/status   */

router.get("/status", (req, res) => res.send("OK"));

/*** @description Admin route methods   */

const specs = swaggerJsdoc(swaggerOptions);

/*** @description - The route end Point for the api-docs */

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;