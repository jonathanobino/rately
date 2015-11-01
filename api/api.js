var Company = require('../models/company');
var Report = require('../models/report');
var mongoose = require('mongoose');

var api = {};

api.all = (req,res) =>{

	Company.find({})
	.exec((err,cmp) =>{
		res.send(cmp);
	})

}
api.getId = (req,res) =>{

	Company.findOne({
		_id:req.params.id
	})
	.exec((err,response) => {
		var total = response.comments.reduce((prev,curr) =>{
			prev += curr.rating;
			return prev;
		},0);
		response = response.toObject();
		response.media = total / response.comments.length;
		if(err) res.send(err);
		else res.send(response);
	})

}
api.comment = (req,res) =>{

	console.log("comment api");
	Company.findOne({_id:req.params.id}).
	exec((err,cmp) =>{
		cmp.comments.push(req.body);
		cmp.save((err, response) => {
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
api.insert = (req,res) => {

	console.log(req.body);

	comp = new Company(req.body)
			.save((err, response) => {
				if(err) res.status(403).send({});
				else	res.send(response);
			});

}

api.search = (req,res) => {

	if(req.body.key != ''){
	var q = new RegExp(req.body.key , "ig");
	console.log(q);
	Company.find({name:q})
	.limit(10)
	.select('name address')
	.exec((err,response)=> {
			if(err) res.status(403).send({});
			else	res.send(response);
		});
	}
	else{
		res.status(204).send({});
	}
}


api.report = (req,res) => {
	var comment_id = req.body.id;

	Company.findOne({"comments._id":comment_id})
	.select('comments')
	.exec(function(err,response){
		if(err) res.status(500).send({});
		else {
			var selected = response.comments.id(comment_id);
			var rep = new Report(selected);
			rep.by = req.body.by;
			rep.save((err,response) => {
				if(err) res.status(500).send({});
				else res.send(response)
			})
		}
	})

}

module.exports = api ;
