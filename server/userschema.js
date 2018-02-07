var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: { type: String },
  name: { type: String },
  user_id: {type: Number},
  location: { type: String },
  order_history: {type: String},
  wishlist: { type: String }
});

module.exports = mongoose.model('users', userSchema);
