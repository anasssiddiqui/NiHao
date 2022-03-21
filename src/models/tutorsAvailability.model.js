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
 *       tutorId:
 *         type: string
 *         example: ffdsg64534sdg6435
 *       date: 
 *         type: date
 *         example: John
 *       slots: 
 *         type: string
 *         example: Doe
 */

const tutorsAvailabilitySchema = new Schema(
    {
        tutorId: { type: Schema.Types.ObjectId, ref: "tutors" },
        date: { type: Date },
        slots: [{
            startTime: { type: String },
            endTime: { type: String },
            booked: { type: Boolean, default: false },
        }],
    },
    {
        timestamps: true,
    }
);


const tutorsAvailabilitys = mongoose.model("tutorsAvailabilitys", tutorsAvailabilitySchema);
module.exports = tutorsAvailabilitys;
