const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PWD
  },
});

app.post("/api/mail", (req, res, next) => {
  let mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.html
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({
        message: "Failed to send email",
        content: err,
      });
    } else {
      res.status(201).json({
        message: "Email sent",
        content: info.response,
      });
    }
  });
});

module.exports = app;
