var Company = require('../models/company');
var Report = require('../models/report');
var mongoose = require('mongoose');

var api = {};

var errorHandler = function (err, response){
	if(err) res.send(err);
	else	res.send(response);
}

api.all = function(req,res){

	Company.find({})
	.exec(function(err,cmp){
		res.send(cmp);
	})

}
api.getId = function(req,res){

	console.log(req.params.id);

	Company.findOne({
		_id:req.params.id
	})
	.exec(function(err,response){
		if(err) res.send(err);
		else res.send(response);
	})

}
api.comment = function(req,res){

	console.log("comment api");
	Company.findOne({_id:req.params.id}).
	exec(function(err,cmp){
		cmp.comments.push(req.body);
		cmp.save(function (err, response){
			if(err) res.send(err);
			else	res.send(response);
		});
	})

	// Company.findOne({_id:req.params.id}).
	// exec(function(err,cmp){
	// 	console.log('query exeecuted',cmp);
	// 	rev = new Review(req.body);
	// 	console.log(rev);
	// 	cmp.comments.push(rev);
	// 	rev.save();
	// 	cmp.save(function(err,response){
	// 		if(err) res.send(err);
	// 		else	res.send(response);
	// 	})
	// })

}
api.insert = function(req,res){

	console.log(req.body);

	comp = new Company(req.body)
			.save(function (err, response){
				if(err) res.send(err);
				else	res.send(response);
			});

}

api.search = function (req,res) {

	if(req.body.key != ''){
	var q = new RegExp(req.body.key , "ig");
	console.log(q);
	Company.find({name:q})
	.limit(10)
	.select('name address')
	.exec(function(err,response)
		{
			res.send(response);
		});
	}
	else{
		res.send({});
	}
}


api.report = function(req,res){

	console.log(req.body);

	var comment_id = req.body.id;

	Company.findOne({"comments._id":comment_id})
	.select('comments')
	.exec(function(err,response){
		if(err) res.send(err);
		else{
			var selected = response.comments.id(comment_id);
			var rep = new Report(selected)
			rep.by = req.body.by;
			rep.save(function(err,response){
				if(err) res.send(err);
				else res.send(response)
			})
		}
	})

}

module.exports = api ;
