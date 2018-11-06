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
      // angular = require('angular'),
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
    callbackURL:  '/callback',
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      // console.log(profile)
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
  // console.log('serializing', userA);
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
       return res.send(null)
     } else {
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
      let parts = require('./server/partcrud.js')

      app.get('/getUsers', users.read);
      app.get('/getUsers/:id', users.show);
      app.put('/updateUsers/:id', users.update);
      app.delete('/deleteUser/:id', users.destroy);
      app.post('/addUser', users.create);
      // app.post('/postPurchase', purchase.create);
      // app.get('/getPurchase', purchase.read);
      // app.get('/getPurchase/:id', purchase.show);
      // app.put('/updatePurchase/:id', purchase.update);
      // app.delete('/delete/:id', purchase.destroy);
      app.get('/getParts', parts.read);
      app.get('/getPart/:_id', parts.show);

// <<=========================== Nodemailer ======================================>>

      let nodemail = require('./server/nodemailer.js');

      app.post('/feedback', nodemail.create);
      app.get('/getFeedback', nodemail.read);
      // app.post('/feedconf', nodemail.fedconf);
      app.put('/addToList', nodemail.list);
      app.get('/addToList', nodemail.getlist);
      // app.post('/listconf', nodemail.listconf);


// <<====================================STRIPE PAYMENT======================>>
    //
    // app.use(stripe({
    //   stripe.customers.create({
    //     email: "sbrycesti@gmail.com"
    //   })
    // }))

    app.get('/paysuccess', function(req, res) {
      res.render('paysuccess', {
        // `<h1>THANK YOU</h1>`
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
