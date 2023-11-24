const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Endpoint to handle POST requests for sending emails
app.post('/send-email', async (req, res) => {
  try {
    const { email, name, message } = req.body;

    // Create a Nodemailer transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sumitsinha215@gmail.com', // Replace with your Gmail email
        pass: 'lsnsfnglotlbecon' // Replace with your Gmail password or an app-specific password
      }
    });

    // Define the email options
    const mailOptions = {
      from: email,
      to: "sumitsinha215@gmail.com",
      subject:name,
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
