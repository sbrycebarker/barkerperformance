var parts = require('./partschema.js');

module.exports = {

  read: (req, res, next) => {
    parts.find().exec(function(err, response) {
      if(err) {
        console.log(err)
        return res.status(500).json(err)
      } else {
        // console.log("got parts", response)
        return res.json(response)
      }
  })
  },
  show: (req, res, next) => {
    console.log("getPart", req.params)
    parts.findById(req.params)
    .exec(function(err, response){
      if(err) {
        console.log("error", err);
      } else {
        console.log("response", response);
        res.json(response);
      }
    });
  },

  create: (req, res, next) => {
  var parts = new parts(req.body);
    parts.save(err, response => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(response);
      }
    })
  },

  update: (req, res, next) => {
    parts.findByIdAndUpdate(req.params.id, req.body, (error, response) => {
      if(error) {
        return res.status(500).json(error)
      } else {
        return res.json(response)
      }
    })
  },

  destroy: (req, res, next) => {
    // console.log(req.params.body);
    parts.findByIdAndRemove(req.params.id, (error, response) => {
      // console.log(response);
      if(error) {
        return res.status(500).json(error)
      }else {
        return res.json(response)
      }
    })
  }


}
