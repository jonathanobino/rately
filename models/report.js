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
	commentId: String,
	count:{type:Number,default:1},
	by: [{name: String, id: String}]
});
 
const report = module.exports.raw = mongoose.model('Report', reportSchema);

var insert = reportBody =>{
	return new Promise((resolve,reject)=>{
		var rep = new report(reportBody)
						.save((err,response)=>{
							if(err) reject(Error(err));
							else  resolve(response);
						})
	})
}


var checkIfExists = module.exports.checkIfExists = (id)=> {
	return new Promise((resolve,reject)=>{
		report.findOne({commentId:id})
		.exec( (err,result) => {
			if(err) reject(false)
			else result == undefined || result == null ? resolve(false): resolve(true);
			})
	})
};

var incrementCount = module.exports.incrementCount = (id,customer)=>{
	return new Promise ((resolve,reject)=>{
		report.findOneAndUpdate({commentId:id},{$inc:{count:1},$addToSet:{by:[customer]}})
		.exec((err,result)=>{
			if(err) reject(err);
			else resolve(result);
		})
	})
}



var insertNewReport = module.exports.newReport = (commentId,customer) =>{

	return checkIfExists(commentId)
	.then( result =>{
		if(result){
			return incrementCount(commentId);
		} else {
			return Company.findByCommentId(commentId)
			.then(response => {
				customer = customer || {name:'Admin',id:'1111'}
				var selected = response.comments.id(commentId).toObject();
				var rep = _.assign(selected,{by:[customer],commentId:selected._id});
				return insert(rep)
			})
			.then( response => response)
		}
	})
	.catch( err => err);
}



    	
