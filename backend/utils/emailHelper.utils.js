const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Cấu hình transporter với thông tin từ Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER, // Thay bằng thông tin Mailtrap của bạn
    pass: process.env.MAILTRAP_PASS
  }
});

// Hàm gửi email
const sendOtpToEmail = async (userEmail, otp) => {
  const mailOptions = {
    from: `"DoiQuaKun" <${process.env.EMAIL_SENDER}>`,
    to: userEmail,
    subject: process.env.EMAIL_SUBJECT,
    text: `Your login OTP is: ${otp}`,
    html: `<p>Your login OTP is: <b>${otp}</b></p>`
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
