      let nodemailer = require('nodemailer'),
          config = require('../config.js'),
          Feedback = require('./feedbackschema.js'),
          mailinglist = require('./emailschema.js');




// const db = config.mongoose

let transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 587,
secure: false, // true for 465, false for other ports
auth: {
    user: config.nodemailer.user, // generated ethereal user
    pass: config.nodemailer.pass // generated ethereal password
}
});

module.exports = {

  create: (req, res, next) => {

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
          from: '"Barker Performance 👻" <sergiobarkerdev@gmail.com>',
          to: 'sbrycebarker@gmail.com',
          subject: req.body.subject,
          html: outPut
        };

      transporter.sendMail(mailOptions, (error, info) => {

          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);

          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.send('thank you')

      })

      // console.log('feedback', req.body)
      let name = req.body.name
      let email = req.body.email
      let subject = req.body.subject
      let message = req.body.message

      var feedback = new Feedback(req.body)
        feedback.save(function(err, response) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(response);
          }
        })
    },
    read: function(req, res, next) {
      Feedback.find().exec(function(err, response) {
        if(error) {
          console.log(error)
          return res.status(500).json(error)
        } else {
          // console.log("got feedback", response)
          return res.json(response)
        }
    })
    },

    list: function(req, res, next) {
      // let new = {
      //
      // }
      console.log(req.body.email)
      mailinglist.findByIdAndUpdate('5ae77363f36d282906c4621a',
       {$push: {mailing_list: req.body.email}},

        function(error, response) {
        if(error) {
          console.log(error)
          return res.status(500).json(error)
        } else {
          console.log("update", response)
          return res.json(response)
        }
      })
    },

    getlist: (req, res, next) => {
      mailinglist.find().exec(function(err, response) {
        if(error) {
          console.log(error)
          return res.status(500).json(error)
        } else {
          console.log("update", response)
          return res.json(response)
        }
    })
  }
    ,

    list: (req, res) => {
      console.log(req)

      let mailOptions = {
        from: '"Barker Performance 👻" <sergiobarkerdev@gmail.com>',
        to: req.body.email,
        subject: 'Thank You',
        html: `<h1>Thanks for siging up for our 'mailing list'</h1>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
          // console.log('sendMail', transporter)
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.send('thank you')
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });

    },

    listconf: (req, res) => {
      transporter.sendMail(mailOptions, (error, info) => {
          // console.log('sendMail', transporter)
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.send('thank you')
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });

    }


}
