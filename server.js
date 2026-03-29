const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configure this with your real email provider
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 465,
  secure: process.env.MAIL_SECURE ? process.env.MAIL_SECURE === 'true' : true,
  auth: {
    user: process.env.MAIL_USER || 'your-email@gmail.com',
    pass: process.env.MAIL_PASS || 'your-email-password',
  },
});

app.post('/send', async (req, res) => {
  const { name, phone, service, message } = req.body;
  if (!name || !phone || !service || !message) {
    return res.status(400).json({ status: 'error', message: 'All fields are required.' });
  }

  const mailOptions = {
    from: `Rainbow Digital <${process.env.MAIL_USER || 'your-email@gmail.com'}>`,
    to: process.env.TO_EMAIL || 'ranbowdigital42@gmail.com',
    subject: `New message from ${name} via Rainbow Digital site`,
    text: `Name: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Service:</strong> ${service}</p><p><strong>Message:</strong> ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ status: 'success', message: 'Message sent. We will contact you soon.' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send email. Please check server logs.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
