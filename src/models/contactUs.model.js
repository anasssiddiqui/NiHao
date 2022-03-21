const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/**
 * @swagger
 * components:
 *  schemas:
 *    Admins:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique mongoid
 *         example: ''
 *       email:
 *         type: string
 *         example: eaxmple.com
 *       subject: 
 *         type: string
 *         example: John
 *       message: 
 *         type: string
 *         example: John Doe
 * 
 */

const contactUsSchema = new Schema(
  {
    email: { type: String },
    subject: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);




const ContactUs = mongoose.model("Contact_us", contactUsSchema);
module.exports = ContactUs;
