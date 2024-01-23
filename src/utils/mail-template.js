const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SYSTEM_EMAIL,
    pass: process.env.GOOGLE_SMTP_API_KEY,
  },
});

// Email content

const sendForgotPasswordMail = async (
  toSendUserEmail,
  newGeneratedPassword
) => {
  const mailOptions = {
    from: process.env.SYSTEM_EMAIL,
    to: toSendUserEmail,
    subject: "New Temporary Password has been created for you",
    html: `Hello, </br> </br> We have generated a new password for you Password: ${newGeneratedPassword} </br> </br> Regards,</br>  Notes Marketplace`,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
  return info;
};

module.exports = { sendForgotPasswordMail };
