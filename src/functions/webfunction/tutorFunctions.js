/**
 * @description - This function is used to find first and last date of current week 
 * @param {string} body  - fromDate toDate is empty or not if empty find current date 
 * @returns {date} dateFilter - return condition with firstDay lastDay
 */

const weekCalendorFunction = ({ body }) => {
    if (body.fromDate !== "" && body.toDate !== "") {
        var firstDay = body.fromDate
        var lastDay = body.toDate
    } else {
        var curr = new Date;
        var first = curr.getDate() - curr.getDay();
        var last = first + 6;

        var firstDay = new Date(curr.setDate(first)).toUTCString();
        var lastDay = new Date(curr.setDate(last)).toUTCString()
    }
    var dateFilter = {
        "date.date": {
            $gte: new Date(firstDay),
            $lt: new Date(lastDay)
        }, tutorId: user._id
    }
    return { dateFilter }
}

/**
 * @description - This function is used to find first and last date of current week 
 * @param {string} body  - user contains tutor id
 * @returns {string} dateFilter - return the fist and last date of current week in general format
 */

const reservationsFunction = ({ user }) => {
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();

    var dateFilter = {
        "date.date": {
            $gte: new Date(firstday),
            $lt: new Date(lastday)
        }, tutorId: user._id
    }
    return { dateFilter }
}

module.exports = {
    weekCalendorFunction,
    reservationsFunction
}