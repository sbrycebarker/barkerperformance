var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var purchaseSchema = new Schema({
  purchase_id: { type: Number },
  purchase_item_ids: { type: Array },
  name: { type: String },
  price: { type: Number },
  buyer: [{ type: Schema.Types.ObjectId , ref: 'user'}],
  transaction_id: { type: Number }
});

module.exports = mongoose.model('purchase', purchaseSchema);
