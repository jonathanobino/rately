var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 
var company = new Schema({
    dateAdded: {type: Date, default: Date.now},
    name: String,
    address: String,
    comments:[{
    	text: String,
    	address: String,
    	rating: Number,
    	project: String
    }]


});
 
module.exports = mongoose.model('Company', company);