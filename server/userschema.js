var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: Object },
  user_id: {type: String},
  admin: { type: Boolean },
  emails: { type: Array },
  nickname: { type: String},
  picture: { type: String},
  order_history: {type: String},
  wishlist: { type: String },
  mailing_list: { type: String }
});

module.exports = mongoose.model('users', userSchema);
