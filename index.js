const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port=process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config()

app.post('/send-email', async (req, res) => {
  try {
    const { email, name, message } = req.body;
console.log('line 15-')
console.log(req.body);
    // Create a Nodemailer transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.TRANSPORTER_USER, // Replace with your Gmail email
        pass: process.env.TRANSPORTER_PASSWORD // Replace with your Gmail password or an app-specific password
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'sumitsinha215@gmail.com',
      to: 'sumitsinha215@gmail.com',
      replyTo: email,
      subject: name,
      text: message,
    };
    

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
