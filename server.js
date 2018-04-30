const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      reload = require('reload'),
      cors = require('cors'),
      http = require('http'),
      nodemailer = require('nodemailer'),
      massive = require('massive'),
      mongoose = require('mongoose'),
      hbs = require('handlebars'),
      Auth0Strategy = require('passport-auth0'),
      passport = require('passport'),
      config = require('./config.js'),
      stripe = require('stripe')(config.stripe.pk_test),
      MongoStore = require('connect-mongo')(session);


// <<============================= Setup=====================================>>
      mongoose.connect(config.mongoose.mongodb, {
        useMongoClient: true,
      });

      var app = express();

      // app.set('view engine', 'hbs');

      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({extended:false}))
      app.use(cors());

      app.use(session({
        saveUninitialized: config.session.saveUninitialized,
        resave: config.session.resave,
        secret: config.secret,
        cookie: config.session.cookie
      }))

      app.use(passport.initialize());
      app.use(passport.session());

      if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
      }
// <<=============================== Setup End ==============================>>

//<<====================================login==============================>>
  passport.use(new Auth0Strategy({
    domain:       config.auth0.domain,
    clientID:     config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL:  '/callback'
    },
    function(accessToken, refreshToken, extraParams, profile, done) {

      return done(null, profile);
    }
  ));


  app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/login' }),
    function(req, res) {
      if (!req.user) {
        throw new Error('user null');
      }
      res.redirect("/");
    }
  );

  passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  done(null, userB); //PUTS 'USER' ON THE SESSION
  });

  //USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
  passport.deserializeUser(function(userB, done) {
  var userC = userB;
  //Things you might do here :
  // Query the database with the user id, get other information to put on req.user
  done(null, userC); //PUTS 'USER' ON REQ.USER
  });

  app.get('/auth', passport.authenticate('auth0'));

  app.get('/login',
    passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
    res.redirect("/");
  });

  app.get('/auth/me', function(req, res) {
    if (!req.user) {
       return res.sendStatus(404)
     } else {
       console.log("me", req.user)
       res.status(200).send(req.user);
     }
  })

  app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })


//<<=============================== login Ends ==============================>>
//<<=========================== Data Endpoints ===============================>>

      let users = require('./server/usercrud.js');
      let purchase = require('./server/purchasecrud.js');

      app.post('/postUsers', users.create)
      app.get('/getUsers', users.read);
      app.get('/getUsers/:id', users.show);
      app.put('/updateUsers/:id', users.update);
      app.delete('/deleteUser/:id', users.destroy);
      app.post('/postPurchase', purchase.create);
      app.get('/getPurchase', purchase.read);
      app.get('/getPurchase/:id', purchase.show);
      app.put('/updatePurchase/:id', purchase.update);
      app.delete('/delete/:id', purchase.destroy);

// <<=========================== Email ======================================>>
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: config.nodemailer.user, // generated ethereal user
          pass: config.nodemailer.pass // generated ethereal password
      }
      });

// setup email data with unicode symbols
      app.post('/sendMail', (req, res) => {
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
  });


// <<====================================STRIPE PAYMENT======================>>

    // app.use(stripe({
    //   stripe.customers.create({
    //     email: "sbrycesti@gmail.com"
    //   })
    // }))

    app.get('/paysuccess', function(req, res) {
      res.render('paysuccess', {

      })
    })

    app.post('/charge', function(req, res) {

    })

      // reload(app);

      app.use(express.static('./public'))
            var port = 8085
        app.listen(port, function() {
          console.log("listining on port " + port)
        })
