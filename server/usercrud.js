var Users = require('./userschema.js');

module.exports = {

      read: function(req, res, next) {
        Users.find().exec(function(err, response){
            if(err) {
              // console.log(err)
              res.status(500).json(err)
            } else {
              // console.log(response)
              res.json(response)
            }
          });
    },

      show: function(req, res, next) {
          Users.findById(req.params.id).exec(function(err, response){
            if(err) {
              // console.log(err)
              res.status(500).json(err)
            }else{
              res.json(response)
            }
          });
    },

      create: function(req, res, next) {
        // var newUser = new Car(req.body);
        // console.log("stuff", req.body[0])
        var newUser = req.body[0];
        // console.log("user", newUser)
        var users = new Users(newUser)
          users.save(function(err, response) {
            if (err) {
              console.log("create", err)
              res.status(500).json(err);
            } else {
              res.status(200).json(req.body);
            }
          })
    },

      update: function(req, res, next) {
        users.findByIdAndUpdate(req.params.id, req.body, function(error, response) {
          if(error) {
            // console.log(error)
            return res.status(500).json(error)
          } else {
            return res.json(response)
          }
        })
    },
    list: function(req, res, next) {
      // let new = {
      //
      // }
      // console.log(req.body.email)
      mailinglist.findByIdAndUpdate(req.body.id,
       {$push: {wishlist: req.body.part}},

        function(error, response) {
        if(error) {
          // console.log(error)
          return res.status(500).json(error)
        } else {
          // console.log("update", response)
          return res.json(response)
        }
      })
    },

      destroy: function(req, res, next) {
        users.findByIdAndRemove(req.params.id, function(error, response){
          if(error) {
            // console.log(error)
            return res.status(500).json(error)
          }else {
            return res.json(response)
          }
        })
    }

}
