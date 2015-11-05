const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');
const _ = require('lodash');

const reportSchema = new Schema({
    text: String,
	address: String,
	rating: Number,
	project: String,
	dateAdded: {type: Date, default: Date.now},
	user: {name:String, id:String},
	id: String,
	count:{type:Number,default:1},
	by: {name: String, id: String}
});
 
const report = module.exports.raw = mongoose.model('Report', reportSchema);

var insert = reportBody =>{
	return new Promise((resolve,reject)=>{
		var rep = new report(reportBody)
						.save((err,response)=>{
							if(err) reject(err);
							else  resolve(response);
						})
	})
}

var insertNewReport = module.exports.newReport = (commentId,customer) =>{
	return Company.findByCommentId(commentId)
	.then(response => {
		customer = customer || {name:'Admin',id:'1111'}
		var selected = response.comments.id(commentId).toObject();
		var rep = _.assign(selected,{by:customer});
		return insert(rep)
		.then( response => response)
		.catc( err => err);
	})
	.catch( err => err)
}



    	
