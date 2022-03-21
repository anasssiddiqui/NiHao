const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Courses:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique mongoid
 *         example: ''
 *       courseId:
 *         type: string
 *         example: ffdsg64534sdg6435
 *       courseName: 
 *         type: string
 *         example: John
 *       whyThisCourse: 
 *         type: string
 *         example: Doe
 *       whatWillYouDo: 
 *         type: string
 *         example: John Doe
 *       experiencelevel:
 *         type: string
 *         example: 1234567890
 *       preRequisites:
 *         type: string
 *         example: 12345678
 *       courseLength: 
 *         type: date
 *       coverImage:
 *         type: string
 *         example: filename
 */

const courseSchema = new Schema(
    {
        courseId: { type: String },
        courseName: { type: String },
        whyThisCourse: { type: String },
        whatWillYouDo: { type: String },
        experiencelevel: { type: String, minlength: 8, maxlength: 12 },
        preRequisites: { type: String, minLength: 6, maxLength: 128 },
        courseLength: { type: Date },
        coverImage: { type: String },
        shortDescription: { type: String }
    },
    {
        timestamps: true,
    }
);


const Courses = mongoose.model("courses", courseSchema);
module.exports = Courses;
