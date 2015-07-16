var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 
var review = new Schema({
    dateAdded: {type: Date, default: Date.now},
    post: String

});
 
module.exports = mongoose.model('Review', review);