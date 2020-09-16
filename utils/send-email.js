const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.TICKEET_SMTP_HOST,
    port: process.env.TICKEET_SMTP_PORT,
    auth: {
      user: process.env.TICKEET_SMTP_USER,
      pass: process.env.TICKEET_SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.TICKEET_EMAIL_FROM_NAME} <${process.env.TICKEET_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;
