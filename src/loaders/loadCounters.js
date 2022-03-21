// const Counters = require("../models/counter.model");
// const logger = require("../../logger");

// /**
//  * @description - This fuction is used to intialize counters if doesnot exist already
//  * @param {string} type - The type name of the counter
//  * @param {string} seq - The initial Counter of the sequence
//  */

// const initSequenceByName = async (type = "userId", seq = 10000) => {
//     const condition = { _id: type };
//     const exist = await Counters.findOne(condition);
//     if (!exist) {
//         Counters.create({ _id: type, seq: seq });
//     }
// };

// /**
//  * @description  - The function Initialises all the counter if any of the above is not present Inititally
//  * @returns {Promise} - Returns a promise
//  */

// const initilizeCounters = async () => {
//     return Promise.all([
//         initSequenceByName("userId", 10000),
//         initSequenceByName("deviceId", 10000),
//         initSequenceByName("transactionId", 10000),
//         initSequenceByName("bookingId", 10000),
//         initSequenceByName("employeeId", 10000),
//     ])
//         .then((result) => {
//             logger.info("Promise Resolved");
//         })
//         .catch((err) => {
//             logger.error(err);
//         });
// };

// /**
//  * @description - The function returns the next sequence id of counter and saves the incremented Sequence Number
//  * @param {string} name - Name of the sequemce example userId , deviceId , transactionId , bookingId , employeeId
//  * @returns {number} - Returns the Next sequence of the Number
//  */

// const getNextSequence = async (name) => {
//     try {
//         let ret = await Counters.findOneAndUpdate(
//             { _id: name },
//             { $inc: { seq: 1 } },
//             {
//                 new: true,
//                 returnNewDocument: true,
//             }
//         );

//         if (ret && ret.seq) {
//             return ret.seq;
//         }
//         throw new Error("Failed to get next sequence");
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// module.exports = {
//     initilizeCounters,
//     getNextSequence,
// };