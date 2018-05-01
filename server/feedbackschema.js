var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
  name: {type: String},
  email: {type: String},
  subject: {type: String},
  message: {type: String}
})

module.exports = mongoose.model('Feedback', feedbackSchema);
