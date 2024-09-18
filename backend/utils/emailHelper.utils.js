const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Cấu hình transporter với thông tin từ Mailtrap
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER, // Thay bằng thông tin Mailtrap của bạn
    pass: process.env.MAILTRAP_PASS
  }
});

// Hàm gửi email
const sendOtpToEmail = async (userEmail, otp) => {
  const mailOptions = {
    from: '"Your App" <no-reply@yourapp.com>',
    to: userEmail,
    subject: "Login Verification Code",
    text: `Your login OTP is: ${otp}`,
    html: `<p>Your login OTP is: <b>${otp}</b></p>`
  };

  try {
    // console.log("Sending email to:", userEmail);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  sendOtpToEmail
};
