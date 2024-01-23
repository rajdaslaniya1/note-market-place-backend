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
    html: `<p>Hello,</p> 
    </br> </br>
    <p>We have generated a new password for you Password: ${newGeneratedPassword} </p>
    </br> </br> 
    <p>Regards,</p>
    </br>  
    <p>Notes Marketplace</p>`,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
  return info;
};

const sendVerificationMail = async (toSendUserEmail, name) => {
  const mailOptions = {
    from: process.env.SYSTEM_EMAIL,
    to: toSendUserEmail,
    subject: "Note Marketplace - Email Verification",
    html: `<p>Hello ${name},</p> 
    </br> </br>
    <p>Thank you for signing up with us. Please click on below link to verify your email address and to 
    do login.</p>
    <a target="_blank" href="www.youtube.com">Click here to verify email</a>
    </br> </br> 
    <p>Regards,</p>
    </br>  
    <p>Notes Marketplace</p>`,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
  return info;
};

module.exports = { sendForgotPasswordMail, sendVerificationMail };
