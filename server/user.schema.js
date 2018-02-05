var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String },
  user_id: {type: Number},
  location: { type: String },
  order_history: {type: Object}
});

module.exports = mongoose.model('user', userSchema);
