var Users = require('./userschema.js');

module.exports = {

  read: async function(req, res, next) {
    try {
      const response = await Users.find().exec();
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  show: async function(req, res, next) {
    try {
      const response = await Users.findById(req.params.id).exec();
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  create: async function(req, res, next) {
    try {
      var newUser = req.body;
      console.log("user", newUser);
      var users = new Users(newUser);
      const response = await users.save();
      console.log('response');
      res.status(200).json(response);
    } catch (err) {
      console.log("create err", err);
      res.status(500).json(err);
    }
  },

  update: async function(req, res, next) {
    try {
      const response = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  addList: async function(req, res, next) {
    try {
      console.log("current user", req.body.id);
      const response = await Users.findByIdAndUpdate(req.body.id, req.body[1], { new: true }).exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  destroy: async function(req, res, next) {
    try {
      const response = await Users.findByIdAndDelete(req.params.id).exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}
