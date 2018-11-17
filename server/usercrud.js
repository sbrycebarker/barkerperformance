var Users = require('./userschema.js');

module.exports = {

      read: function(req, res, next) {
        Users.find().exec(function(err, response){
            if(err) {
              // console.log(err)
              res.status(500).json(err)
            } else {
              res.json(response)
            }
          });
    },

      show: function(req, res, next) {
          Users.findById(req.params.id).exec(function(err, response){
            if(err) {
              res.status(500).json(err)
            }else{
              res.json(response)
            }
          });
    },

      create: function(req, res, next) {
        var newUser = req.body;
        console.log("user", newUser)
        var users = new Users(newUser)
        // console.log("newUser",newUser)
          users.save(function(err, response) {
            if (err) {
              console.log("create err", err)
              res.status(500).json(err);
            } else {
              console.log('response')
              res.status(200).json(response);
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
    addList: function(req, res, next) {

      console.log("current user", req.body.id);

      Users.findByIdAndUpdate(req.body.id, req.body[1], function(error, response) {
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
