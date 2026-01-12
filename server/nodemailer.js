let nodemailer = require('nodemailer'),
    config = require('../config.js'),
    Feedback = require('./feedbackschema.js'),
    mailinglist = require('./mailinglist.js');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.nodemailer.user,
        pass: config.nodemailer.pass
    }
});

module.exports = {

  create: async (req, res, next) => {
    try {
      console.log('sent', req.body);
      let outPut = `
        <p>You have new feedback</p>
        <h3>Details</h3>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p> ${req.body.message}</p>
      `;
      let mailOptions = {
        from: '"Barker Performance 👻" <aldentedirectories@gmail.com>',
        to: 'sbrycebarker@gmail.com',
        subject: req.body.subject,
        html: outPut
      };

      // Send email (don't await, fire and forget)
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });

      // Save feedback to database
      var feedback = new Feedback(req.body);
      const response = await feedback.save();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  read: async function(req, res, next) {
    try {
      const response = await Feedback.find().exec();
      return res.json(response);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  getlist: async (req, res, next) => {
    try {
      const response = await mailinglist.find().exec();
      console.log("update", response);
      return res.json(response);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  list: async (req, res) => {
    try {
      console.log(req.body.email);

      const response = await mailinglist.findByIdAndUpdate(
        '5bee3cdae7179a56e2115a00',
        { $push: { mailing_list: req.body.email } },
        { new: true }
      ).exec();

      console.log("update", response);

      // Send confirmation email (fire and forget)
      let mailOptions = {
        from: '"Barker Performance 👻" <aldentedirectories@gmail.com>',
        to: req.body.email,
        subject: 'Thank You',
        html: `<h1>Thanks for signing up for our 'mailing list'</h1>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  listconf: async (req, res) => {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.send('thank you');
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

}
