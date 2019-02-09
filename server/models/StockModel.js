var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var StockSchema = new Schema({
	'symbol' : String,
	'shares' : Number,
	'price' : Number,
	'cost' : Number,
	'owner' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	}
});

module.exports = mongoose.model('Stock', StockSchema);
