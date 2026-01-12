var parts = require('./partschema.js');

module.exports = {

  read: async (req, res, next) => {
    try {
      const response = await parts.find().exec();
      return res.json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  show: async (req, res, next) => {
    try {
      const response = await parts.findById(req.params).exec();
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newPart = new parts(req.body);
      const response = await newPart.save();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const response = await parts.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const response = await parts.findByIdAndDelete(req.params.id).exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}
