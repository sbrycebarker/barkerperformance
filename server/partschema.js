var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partSchema = new Schema({
  _id: { type: String },
  name: { type: String },
  part_id: {type: Number},
  price: { type: Number },
  img: { type: String }
});

module.exports = mongoose.model('parts', userSchema);
