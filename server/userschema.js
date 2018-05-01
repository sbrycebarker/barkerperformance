var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: { type: String },
  name: { type: String },
  user_id: {type: String},
  admin: { type: Boolean },
  location: { type: String },
  order_history: {type: String},
  wishlist: { type: String },
  mailing_list: { type: String }
});

module.exports = mongoose.model('breaks', userSchema);
