var user = require('./user.schema.js');

module.exports = {

  read: (req, res, next) => {
    user.find().exec(err, response => {
      if(err) {
        console.log(err);
      } else {
        res.json(response);
      }
    });
  },

  create: (req, res, next) => {
  var user = new user(req.body);
    user.save(err, response => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(response);
      }
    })
  },

  update: (req, res, next) => {
    user.findByIdAndUpdate(req.params.id, req.body, (error, response) => {
      if(error) {
        return res.status(500).json(error)
      } else {
        return res.json(response)
      }
    })
  },

  destroy: (req, res, next) => {
    // console.log(req.params.body);
    user.findByIdAndRemove(req.params.id, (error, response) => {
      // console.log(response);
      if(error) {
        return res.status(500).json(error)
      }else {
        return res.json(response)
      }
    })
  }


}
