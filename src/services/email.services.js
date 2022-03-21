const sendEmail = require("../helper/sendEmail");
const { emailTemplates } = require("../templates/index");
// const { baseUrl, senderEmail } = require('../utility/config')

/**
 * @description -This function sends mail to student on reservation respond
 */

 const requestSubmitMail = async ({email }) => {
    const { html, subject } = emailTemplates.requestSubmitMailMessage({  });
    return sendEmail({ to: email, subject, html });
};

/**
 * @description -This function sends mail to student on reservation respond
 */

 const sendRespondMail = async ({email,body }) => {
    const { html, subject } = emailTemplates.respondMessage({ body });
    return sendEmail({ to: email, subject, html });
};

/**
 * @description -This function sends otp email to the user with the email
 */

const sendOtpEmail = async ({ otp, email }) => {
    const { html, subject } = emailTemplates.otpMessage({ otp });
    return sendEmail({ to: email, subject, html });
};

/**
 * @description -This function used for send verification mail
 */

const sendVerificationEmail = async ({ user }) => {
    const { html, subject } = emailTemplates.verificationMessage({ user });
    return sendEmail({ to: user.email, subject, html });
};

/**
 * @description -This function used for send verification mail to tutor
 */

const sendTutorVerificationEmail = async ({ user }) => {
    const { html, subject } = emailTemplates.tutorVerificationMessage({ user });
    return sendEmail({ to: user.email, subject, html });
};

module.exports = {
    requestSubmitMail,
    sendRespondMail,
    sendTutorVerificationEmail,
    sendOtpEmail,
    sendVerificationEmail
};