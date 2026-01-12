var purchase = require('./purchaseschema.js');

module.exports = {

  read: async (req, res, next) => {
    try {
      const response = await purchase.find().exec();
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  show: async (req, res, next) => {
    try {
      const response = await purchase.findById(req.params.id).exec();
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  create: async (req, res, next) => {
    try {
      var newPurchase = new purchase(req.body);
      const response = await newPurchase.save();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const response = await purchase.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const response = await purchase.findByIdAndDelete(req.params.id).exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}
