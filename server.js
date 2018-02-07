const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      reload = require('reload'),
      cors = require('cors'),
      massive = require('massive'),
      mongoose = require('mongoose'),
      MongoStore = require('connect-mongo')(session);

      var app = express();

      app.use(bodyParser.json())
      app.use(cors());

      let users = require('./server/usercrud.js');
      let purchase = require('./server/purchasecrud.js');

      mongoose.connect('mongodb://sbrycebarker:serg1234@ds125628.mlab.com:25628/barkerperformance', {
        useMongoClient: true,
      })

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



      app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'pizzaisgood'
      }))

      reload(app);

      app.use(express.static('./public'))
            var port = 8085
        app.listen(port, function() {
          console.log("listining on port " + port)
        })
