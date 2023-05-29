import nodemailer from 'nodemailer';

export default async function sendEmail(from, to, subject, html) {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // use SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error(error);
  }
}
