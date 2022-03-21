const Tutors = require("../../models/tutor.model");


/**
 * @description - This function is used to set update condition 
 * @param {string} id  - tutor  id
 * @returns {object} setCondition  - return set update condition
 */

const endCallFunction = async ({ id }) => {
    var setCondition
    const findTutor = await Tutors.findOne({ _id: id })

    if (findTutor.history.firstClass == null) {
        setCondition = {
            "history.firstClass": new Date(),
            "history.lastClass": new Date()
        }

    } else {
        setCondition = {
            "history.lastClass": new Date()
        }
    }

    return { setCondition }
}


module.exports = {
    endCallFunction,
}