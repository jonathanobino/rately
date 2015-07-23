var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 
var review = new Schema({
    text: String,
	address: String,
	rating: Number,
	project: String,
	dateAdded: {type: Date, default: Date.now},
	user: {name:String, id:String}

});
 
module.exports = mongoose.model('Review', review);


