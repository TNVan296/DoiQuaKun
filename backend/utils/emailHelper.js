const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  '135948003217-m9v6h8sasc1osf4qqg110vu5le73nosj.apps.googleusercontent.com', // Client ID
  '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', // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: 'REFRESH_TOKEN', // Refresh Token bạn nhận được từ OAuth2 Playground
});

async function sendEmail(email, otp) {
  try {
    const accessToken = await oauth2Client.getAccessToken(); // Lấy Access Token

    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'thuongnva2923@gmail.com', // Email của bạn
        clientId: '135948003217-m9v6h8sasc1osf4qqg110vu5le73nosj.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04rVVZgCFpzWPCgYIARAAGAQSNwF-L9IryxFlHrSxAV2YUYE6BnG1gZTH_SSy02gKm4VWQJ6J8cAVUAiS4JiGkIbXEKf4K0HjC_w',
        accessToken: accessToken.token,
      },
    });

    // Cấu hình nội dung email
  const mailOptions = {
    from: 'thuongnva2923@gmail.com',
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`,
  };

    // Gửi email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendEmail,
};
