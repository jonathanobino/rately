var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 
var user = new Schema({
    ref: String
});
 
module.exports = mongoose.model('User', user);