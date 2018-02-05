const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      reload = require('reload'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      MongoStore = require('connect-mongo')(session);

      var app = express();

      app.use(bodyParser.json())
      app.use(cors());

      let user = require('./server/user.CRUD.js');
      let purchase = require('./server/purchase.CRUD.js');

      app.get('/getUser', user.read);
      app.get('/getPurchase', purchase.read);


      mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds119486.mlab.com:19486/barkerperformance', {
        useMongoClient: true,
      })

      reload(app);

      app.use(express.static('./public'))
            var port = 8085
        app.listen(port, function() {
          console.log("listining on port " + port)
        })
