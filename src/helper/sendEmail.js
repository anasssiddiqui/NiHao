const nodemailer = require("nodemailer");
const { senderEmail, senderEmailPassword } = require("../utility/config");

/**
 * @description - This function is used to send the emails
 * @param {string} to - email to which the email is to be sent
 * @param {string} from - email from which the email is to be sent
 * @param {string} subject - subject of the email
 * @param {string} html - html fo the email
 * @returns {promise} -- Returns the promise of send email
 */
const sendEmail = ({ to, from = senderEmail, subject, html }) =>
    new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: senderEmail,
                    pass: senderEmailPassword,
                },
            });

            const mailOptions = {
                from, // sender address
                to, // list of receivers
                subject, // Subject line
                html: html, // html text
            };

            const data = await transporter.sendMail(mailOptions);
            resolve(data);
        } catch (error) {
            logger.error("error", error.message);
            reject(error);
        }
    });

module.exports = sendEmail;