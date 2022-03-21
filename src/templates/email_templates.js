/**
 * @description - This function is used to create the email subject and email html
 * @param {string} user - This is the user which will be sent in the email
 * @returns {Object} - Returns the Object containing the email subject and email html
 */

 const requestSubmitMailMessage = ({ body }) => {
  const subject = "Confirmation email";
  const html = `
  Hi! your request sucessfully submited to admin we update you shortly`
  return { html, subject };
};

/**
 * @description - This function is used to create the email subject and email html
 * @param {string} user - This is the user which will be sent in the email
 * @returns {Object} - Returns the Object containing the email subject and email html
 */

 const respondMessage = ({ body }) => {
  const subject = "Confirmation email";
  const html = `
  Hi! admin ${body.status==1?'accepted':'rejected'} your request`
  return { html, subject };
};


const verificationMessage = ({ user }) => {
  const subject = "Confirmation email";
  const html = `
  Hi! your profile is accepted by the admin
  Your confirmation code is ${user.ambassadorId}
  Please login with your email and password and enjoy our services`


  return { html, subject };
  
};

const tutorVerificationMessage = ({ user }) => {
  const subject = "Confirmation email";
  const html = `
  Hi! your profile is accepted by the Admin
  Your confirmation code is ${user.accountId}
  Please login with your email and password and enjoy our services`
  return { html, subject };
};

/**
 * @description - This function is used to create the email subject and email html
 * @param {string} otp - This is the otp which will be sent in the email
 * @returns {Object} - Returns the Object containing the email subject and email html
 */

const otpMessage = ({ otp }) => {
  const subject = "Otp Email";
  const html = `
Your otp is ${otp}`;

  return { html, subject };
};

/**
 * @description - This function is used to create the email subject and email html
 * @param {string} textPassword - This is the plain text password which will be sent in the email
 * @returns {Object} - Returns the Object containing the email subject and email html
 */

const sendPasswordToEmail = ({ textPassword }) => {
  const subject = "Password";
  const html = `
    Hi 
    Your password is ${textPassword}.
    Please login with your email and password and enjoy our services
    `;

  return { html, subject };
};

/**
 *
 * @param {*} param0
 * @returns
 */
//@TODO - Change the send verification email to only a single by passing type or role in params


const emailVerificationText = ({ link }) => {
  const subject = "Email verification Link"
  const html = `
    Please use the following link within the next 10 minutes to activate your account on YOUR APP: <a href=${link} /> Verify Email </a> 
    or Copy paste the link in the browser if above doesnot work   
    ${link}
    `
  return { subject, html }
}


/**
 *
 * @param {*} param0
 * @returns
 */

const talentVerificationEmail = ({ token }) => {
  const subject = "Otp Email";
  const html = `
<a href="/v1/talent/auth/verify-email/${token}"> Click here to verify email </a>
`;

  return { html, subject };
};

/**
 *
 * @param {*} param0
 * @returns
 */

const influencerVerificationEmail = ({ token }) => {
  const subject = "Otp Email";
  const html = `
<a href="/v1/influencer/auth/verify-email/${token}"> Click here to verify email </a>
`;

  return { html, subject };
};
module.exports = {
  requestSubmitMailMessage,
  respondMessage,
  tutorVerificationMessage,
  otpMessage,
  sendPasswordToEmail,
  emailVerificationText,
  talentVerificationEmail,
  influencerVerificationEmail,
  verificationMessage
};
