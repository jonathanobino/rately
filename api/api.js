const Company = require('../models/company');
const Report = require('../models/report');

var api = {};

api.getId = (req,res) =>{
	Company.getById(req.params.id)
	.then(data => res.send(data))
	.catch( err => res.status(403).send(err));
}
api.comment = (req,res) =>{
	Company.comment(req.params.id,req.body)
	.then( data => res.send(data))
	.catch ( err => res.status(403).send(err))
}
api.insert = (req,res) => {

	Company.insertNew(req.body)
	.then( data => res.send(data))
	.catch( err => res.status(403).send(err))
}

api.search = (req,res) => {

	if(req.body.key != ''){
		Company.searchByRegex(req.body.key)
		.then(data =>res.send(data))
		.catch(err =>res.status(403).send(err))
	}
	else{
		res.status(204).send();
	}
}


api.report = (req,res) => {
	var comment_id = req.body.id;
	var customer = req.body.by;
	Report.newReport(comment_id,customer)
	.then( response => {
		console.log(response);
		res.send(response);})
	.catch( err => {
		console.log(err);
		res.status(500).send(err);});
}

module.exports = api ;
