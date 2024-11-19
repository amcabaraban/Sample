const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider. For Gmail, ensure less secure app access is enabled or use OAuth2.
    auth: {
        user: 'a.cabarabanjr@gmail.com', // Replace with your email
        pass: 'qvim cexv mzus zstx'   // Replace with your email password or app-specific password
    }
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { date, companyName, clientName, driverName, plateNumber, product, quantity } = req.body;

    const mailOptions = {
        from: 'a.cabarabanjr@gmail.com', // Sender address
        to: 'a.cabarabanjr@gmail.com', // Recipient address
        subject: `Loading Details from ${companyName}`,
        text: `
        Date: ${date}
        Company Name: ${companyName}
        Client's Name: ${clientName}
        Driver's Name: ${driverName}
        Plate Number: ${plateNumber}
        Product to Load: ${product}
        Quantity to Load: ${quantity}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
