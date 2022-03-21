/**
 * @description - This function is used to create the sms body
 * @param {string} otp - This is the otp which will be sent in thesms
 * @returns {string} - Returns the sms body
 */

const otpMessage = ({ otp }) => {
  return `
    Your otp is ${otp}
    `;
};

module.exports = {
  otpMessage,
};
