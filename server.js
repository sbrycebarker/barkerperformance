const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      reload = require('reload'),
      cors = require('cors'),
      massive = require('massive'),
      mongoose = require('mongoose'),
      Auth0Strategy = require('passport-auth0'),
      passport = require('passport'),
      stripe = require('stripe')('sk_test_...'),
      config = require('./config.js');
      MongoStore = require('connect-mongo')(session);

      var app = express();

      app.use(bodyParser.json())
      app.use(cors());
      mongoose.connect('mongodb://sbrycebarker:serg1234@ds125628.mlab.com:25628/barkerperformance', {
        useMongoClient: true,
      })

      // app.use(stripe({
      //   stripe.customers.create({
      //     email:
      //   })
      // }))

      app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.secret,
        cookie: { path: '/',
                  httpOnly: true,
                  secure: false,
                  maxAge: null
                }
      }))

      if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
      }

//<<====================================login==============================>>

      passport.use(new Auth0Strategy({
       domain:       config.auth0.domain,
       clientID:     config.auth0.clientID,
       clientSecret: config.auth0.clientSecret,
       callbackURL:  '/callback'
      },
      function(accessToken, refreshToken, extraParams, profile, done) {
        db.getUserByAuthId([profile.id]).then(function(user) {
          // console.log('gettinguser', profile)
          if (!user[0]) {
             //if there isn't one, we'll create one!
            // console.log("creating user", profile)
            db.createUserByAuth([profile.displayName, profile.id]).then(function(user2) {
              // console.log('USER CREATED', user2);
              return done(null, profile);
            })
          } else {
            // console.log("found User", profile)
            // user = user[0]
            return done(null , user);
          }
        })
      }
      ));

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

    app.get('/callback',
      passport.authenticate('auth0', { failureRedirect: '/login' }),
      function(req, res) {
        if (!req.user) {
          throw new Error('user null');
        }
        res.redirect("/");
      }
    );
    app.get('/login',
      passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
      res.redirect("/");
    });

    app.get('/auth/me', function(req, res) {
      if (!req.user) return res.sendStatus(404);
      console.log("me", req.user)
      res.status(200).send(req.user);
    })

    app.get('/auth/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    })
//<<====================================login==============================>>

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

      reload(app);

      app.use(express.static('./public'))
            var port = 8085
        app.listen(port, function() {
          console.log("listining on port " + port)
        })
