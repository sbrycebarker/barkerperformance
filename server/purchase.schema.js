var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var purchaseSchema = new Schema({
  name: { type: String },
  product_id: {type: Number},
  price: {type: number},
  buyer: [{type: Schema.Types.user_id, ref: 'user'}]
});

module.exports = mongoose.model('purchase', purchaseSchema);
