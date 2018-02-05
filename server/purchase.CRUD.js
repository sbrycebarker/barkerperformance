var user = require('./purchase.schema.js');

module.exports = {

  read: (req, res, next) => {
    purchase.find().exec(err, response => {
      if(err) {
        console.log(err);
      } else {
        res.json(response);
      }
    });
  },

  create: (req, res, next) => {
  var user = new user(req.body);
    purchase.save(err, response => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(response);
      }
    })
  },

  update: (req, res, next) => {
    purchase.findByIdAndUpdate(req.params.id, req.body, (error, response) => {
      if(error) {
        return res.status(500).json(error)
      } else {
        return res.json(response)
      }
    })
  },

  destroy: (req, res, next) => {
    // console.log(req.params.body);
    purchase.findByIdAndRemove(req.params.id, (error, response) => {
      // console.log(response);
      if(error) {
        return res.status(500).json(error)
      }else {
        return res.json(response)
      }
    })
  }


}
