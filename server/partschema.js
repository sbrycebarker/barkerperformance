var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partSchema = new Schema({
  name: { type: String },
  part_id: { type: String },
  price: { type: Number },
  img: { type: String },
  type: { type: String },
  short_description: { type: String },
  details: { type: String },
  new: { type: Boolean, default: false },
  sale: { type: Boolean, default: false }
});

module.exports = mongoose.model('parts', partSchema);
