var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partSchema = new Schema({
  name: { type: String },
  part_id: {type: String},
  price: { type: Number },
  img: { type: String },
  type: {type: String},
  details: {type: String}
});

module.exports = mongoose.model('parts', partSchema);
