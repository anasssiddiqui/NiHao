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
 *       subscriptionType:
 *         type: string
 *         example: kids
 *       planName: 
 *         type: string
 *         example: offer
 *       currency: 
 *         type: string
 *         example: dollar
 *       duration: 
 *         type: string
 *         example: month
 *       minutes:
 *         type: string
 *         example: 15
 *       days:
 *         type: string
 *         example: 1
 *       planAmount: 
 *         type: number
 *         example: 500
 *       discountPercentage:
 *         type: number
 *         example: 50
 *       description:
 *         type: string
 *         example: 'description about plan'
 */

const subscriptionSchema = new Schema(
    {
        subscriptionType: { type: String },
        planName: { type: String },
        currency: { type: String },
        duration: {
            month: { type: Number },
            discount: { type: Number }
        },
        minutes: { type: Number },
        days: { type: Number },// days per week
        amount: {
            planAmount: { type: Number },
            afterDiscount: { type: Number }
        },
        description: { type: String }
    },
    {
        timestamps: true,
    }
);


const Subscriptions = mongoose.model("subscriptions", subscriptionSchema);
module.exports = Subscriptions;
