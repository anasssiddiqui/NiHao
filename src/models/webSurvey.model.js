const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const { jwtSecret, saltRounds } = require("../utility/config");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * components:
 *  schemas:
 *    webSurveys:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique mongoid
 *         example: ''
 *       category:
 *         type: string
 *         description: static category name
 *         example: 'price/payment'
 *       options: 
 *         type: array
 *         example: [{"option":"best"},{"scale":0-6}]
 */


const webSurveySchema = new Schema(
  {
    category: { type: String },
    options: [{ option: { type: String }, scale: { type: String } }],
    other: [{ title: { type: String }, description: { type: String } }],
  },
  {
    timestamps: true,
  }
);


const WebSurveys = mongoose.model("webSurveys", webSurveySchema);
module.exports = WebSurveys;
