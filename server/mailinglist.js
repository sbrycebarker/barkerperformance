var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var emailSchema = new Schema({
  mailing_list: { type: String }
});

module.exports = mongoose.model('mailinglists', emailSchema);
