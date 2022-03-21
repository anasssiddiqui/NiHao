const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Lessons:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique mongoid
 *         example: ''
 *       courseId:
 *         type: string
 *         example: ffdsg64534sdg6435
 *       title: 
 *         type: string
 *         example: John
 *       description: 
 *         type: string
 *         example: Doe
 *       file: 
 */

const syllabusSchema = new Schema(
    {
        courseId: {type: Schema.Types.ObjectId, ref: "courses" },
        categoryId: {type: Schema.Types.ObjectId, ref: "categorys" },
        title: { type: String },
        description: { type: String },
        file: [{ type: String }],
    },
    {
        timestamps: true,
    }
);


const syllabus = mongoose.model("syllabus", syllabusSchema);
module.exports = syllabus;
