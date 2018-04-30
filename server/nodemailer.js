nodemailer = require('nodemailer'),

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
  list: (req, res) => {
    console.log('sent', req.body);
    const outPut = `
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
      from: '"Barker Performance 👻" <sergiobarkerdev@gmail.com>', // sender address
      to: 'sbrycebarker@gmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: 'Hello world?', // plain text body
      html: outPut // html body
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
}
}


}
