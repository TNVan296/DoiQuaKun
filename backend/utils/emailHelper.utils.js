const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Hàm gửi email
const sendOtpToEmail = async (userEmail, otp) => {
  // Cấu hình transporter với thông tin từ Mailtrap
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `"DoiQuaKun" <${process.env.MAIL_USER}>`,
    to: userEmail,
    subject: process.env.EMAIL_SUBJECT,
    text: `Mã OTP mới của bạn là: ${otp}`,
    html: `<p>Mã OTP mới của bạn là: <b>${otp}</b></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  sendOtpToEmail
};
