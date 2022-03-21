const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Bookings:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique mongoid
 *         example: ''
 *       tutorId:
 *         type: string
 *         example: ffdsg64534sdg6435
 *       studentId:
 *         type: string
 *         example: ffdsg64534sdg6435
 *       date: 
 *         type: date
 *         example: John
 *       timeFrom: 
 *         type: string
 *         example: Doe
 *       timeTo: 
 *         type: string
 *         example: Doe
 *       status: 
 *         type: string
 *         example: 0
 */

const bookingSchema = new Schema(
    {
        tutorId: { type: Schema.Types.ObjectId, ref: "tutors" },
        studentId: { type: Schema.Types.ObjectId, ref: "users" },
        date: {
            date: { type: Date },
            timestamp: { type: Number },
            availabilityId: { type: Schema.Types.ObjectId, ref: "tutorsAvailabilitys" },
        },
        slots: {
            slotId: { type: Schema.Types.ObjectId, ref: "tutorsAvailabilitys.slots" },
            timeFrom: { type: String },
            timeTo: { type: String }
        },
        cancelComment: { type: String },
        status: { type: Number } //0=> pending, 1=> accept by tutor ,2=> rejected by tutor,3 => cancel by student
    },
    {
        timestamps: true,
    }
);


const bookings = mongoose.model("bookings", bookingSchema);
module.exports = bookings;
