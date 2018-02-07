var users = require('./userschema.js');
// let car = require('./carschema.js');

module.exports = {

      read: function(req, res, next) {
        users.find().exec(function(err, response){
            if(err) {
              // console.log(err)
              // res.status(500).json(err)
            } else {
              console.log(response)
              res.json(response)
            }
          });
    },

      show: function(req, res, next) {
          users.findById(req.params.id).exec(function(err, response){
            if(err) {
              console.log(err)
              res.status(500).json(err)
            }else{
              res.json(response)
            }
          });
    },

      create: function(req, res, next) {
        // var users = new Car(req.body);
        console.log("stuff", req.body)
        var user = req.body[0];
        var finalprice = req.body[3];
        var color = req.body[1]
        var cart = req.body[2];
        var email = req.body[4]
        // console.log("car data", req.body)
        var cart = new Cart({user, color, cart, finalprice, email})
          users.save(function(err, response) {
            if (err) {
              console.log(err)
              res.status(500).json(err);
            } else {
              res.status(200).json(req.body);
            }
          })
    },

      update: function(req, res, next) {
        users.findByIdAndUpdate(req.params.id, req.body, function(error, response) {
          if(error) {
            console.log(error)
            return res.status(500).json(error)
          } else {
            return res.json(response)
          }
        })
    },

      destroy: function(req, res, next) {
        users.findByIdAndRemove(req.params.id, function(error, response){
          if(error) {
            console.log(error)
            return res.status(500).json(error)
          }else {
            return res.json(response)
          }
        })
    }

}
