const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      reload = require('reload'),
      cors = require('cors'),
      nodemailer = require('nodemailer'),
      mongoose = require('mongoose'),
      hbs = require('handlebars'),
      Auth0Strategy = require('passport-auth0'),
      passport = require('passport'),
      config = require('./config.js'),
      // angular = require('angular'),
      { body, validationResult } = require('express-validator'),
      stripe = require('stripe')(config.stripe.sec_key),
      MongoStore = require('connect-mongo');



      mongoose.connect(config.mongoose.mongodb)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));

      var app = express();

      // app.set('view engine', 'hbs');

      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({extended:false}))
      // CORS configuration
      const corsOptions = {
        origin: process.env.NODE_ENV === 'production' ? (process.env.ALLOWED_ORIGIN || 'https://yourdomain.com') : '*',
        credentials: true
      };
      app.use(cors(corsOptions));
      app.use(session({
        saveUninitialized: config.session.saveUninitialized,
        resave: config.session.resave,
        secret: config.secret,
        cookie: config.session.cookie,
        store: MongoStore.create({
          mongoUrl: config.mongoose.mongodb,
          touchAfter: 24 * 3600
        })
      }))

      // Auth0 disabled for demo - using mock authentication
      // app.use(passport.initialize());
      // app.use(passport.session());

      if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        // sess.cookie.secure = true // serve secure cookies
      }
// <<=============================== Setup End ==============================>>

//<<====================================login (DISABLED FOR DEMO)==============================>>
  // Auth0 commented out for portfolio demo - no authentication required

  // passport.use(new Auth0Strategy({
  //   domain:       config.auth0.domain,
  //   clientID:     config.auth0.clientID,
  //   clientSecret: config.auth0.clientSecret,
  //   callbackURL:  '/callback',
  //   },
  //   function(accessToken, refreshToken, extraParams, profile, done) {
  //     return done(null, profile);
  //   }
  // ));

  // app.get('/callback',
  //   passport.authenticate('auth0', { failureRedirect: '/login' }),
  //   function(req, res) {
  //     if (!req.user) {
  //       throw new Error('user null');
  //     }
  //     res.redirect("/");
  //   }
  // );

  // passport.serializeUser(function(userA, done) {
  //   var userB = userA;
  //   done(null, userB);
  // });

  // passport.deserializeUser(function(userB, done) {
  //   var userC = userB;
  //   done(null, userC);
  // });

  // Mock auth endpoints for demo purposes
  app.get('/auth', function(req, res) {
    res.sendFile(__dirname + '/public/html/login.html');
  });

  app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/html/login.html');
  });

  // Return mock user for frontend compatibility
  app.get('/auth/me', function(req, res) {
    res.status(200).send({
      displayName: 'Demo User',
      name: { familyName: 'User', givenName: 'Demo' },
      emails: [{ value: 'demo@barkerperformance.com' }],
      picture: 'https://via.placeholder.com/150/ff2800/ffffff?text=Demo',
      _json: { name: 'Demo User', email: 'demo@barkerperformance.com' }
    });
  })

  app.get('/auth/logout', function(req, res) {
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
      // app.update('/addWishList', users.update);
      // app.post('/postPurchase', purchase.create);
      // app.get('/getPurchase', purchase.read);
      // app.get('/getPurchase/:id', purchase.show);
      // app.put('/updatePurchase/:id', purchase.update);
      // app.delete('/delete/:id', purchase.destroy);
      app.get('/getParts', parts.read);
      app.get('/getPart/:_id', parts.show);

// <<=========================== Nodemailer ======================================>>

      let nodemail = require('./server/nodemailer.js');
      let userlist = require('./server/userschema.js')
      app.post('/feedback', nodemail.create);
      app.get('/getFeedback', nodemail.read);
      // app.post('/feedconf', nodemail.fedconf);
      app.put('/addWishList', async function(req, res, next) {
        try {
          let userid = req.body[0];
          let update = req.body[1];
          console.log("current user", userid)
          console.log("wishlist item", update)
          const response = await userlist.findByIdAndUpdate(userid, {
            $push: update
          }, { new: true });
          console.log("added to wishlist", response)
          return res.json(response)
        } catch (err) {
          console.log("err", err)
          return res.status(500).json(err)
        }
      })
      app.get('/addToList', nodemail.list);
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
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Payment Success</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #1a1a1a; color: white; }
            h1 { color: #4CAF50; }
            a { color: #ff2800; text-decoration: none; font-size: 18px; }
          </style>
        </head>
        <body>
          <h1>Payment Successful!</h1>
          <p>Thank you for your order.</p>
          <a href="#!/products">Continue Shopping</a>
        </body>
        </html>
      `);
    })

    app.get('/paycancel', function(req, res) {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Payment Cancelled</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #1a1a1a; color: white; }
            h1 { color: #ff2800; }
            a { color: #ff2800; text-decoration: none; font-size: 18px; }
          </style>
        </head>
        <body>
          <h1>Payment Cancelled</h1>
          <p>Your order was not completed.</p>
          <a href="#!/products">Return to Shop</a>
        </body>
        </html>
      `);
    })

    // Modern Stripe Checkout Session
    app.post('/create-checkout-session', async function(req, res) {
      try {
        const { items, total } = req.body;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Barker Performance Order',
                description: items && items.length ? items.map(i => i.part?.name).join(', ') : 'Auto Parts'
              },
              unit_amount: Math.round(total * 100)
            },
            quantity: 1
          }],
          mode: 'payment',
          success_url: req.protocol + '://' + req.get('host') + '/paysuccess',
          cancel_url: req.protocol + '://' + req.get('host') + '/paycancel'
        });

        res.json({ url: session.url });
      } catch (error) {
        console.error('Stripe session error:', error);
        res.status(500).json({ error: error.message });
      }
    })

    // Legacy charge endpoint (kept for reference)
    app.post('/charge', async function(req, res) {
      try {
        const { amount, currency, description, source } = req.body;

        const charge = await stripe.charges.create({
          amount: amount,
          currency: currency || 'usd',
          description: description || 'Barker Performance Purchase',
          source: source
        });

        res.status(200).json({
          success: true,
          charge: charge
        });
      } catch (error) {
        console.error('Stripe charge error:', error);
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    })


      // reload(app);

      // Global error handler
      app.use(function(err, req, res, next) {
        console.error('Global error handler:', err.stack);
        res.status(err.status || 500).json({
          error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
          }
        });
      });

app.use(express.static(__dirname + '/public'))

var port = process.env.PORT || 8085
        app.listen(port, function() {
          console.log("listening on port " + port)
        })
