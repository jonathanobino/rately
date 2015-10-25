var mongoose = require('mongoose');
var express = require('express');
var api = require('./api/api');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config/config');

var dbUrl = config.base + config.user+":"+config.psw+config.uri;

app.use(bodyParser.json());

app.set("port",(process.env.PORT || 5000));

mongoose.connect(dbUrl,function(err){
	if(err) console.log(err);
	console.log('connected');
});



//only testing

app.use(function(req,res,next){
	console.log(req.method,req.originalUrl);
	next();
});

app.use('/', express.static(__dirname+'/public'));

app.get('/api/all', api.all);

app.get('/api/:id', api.getId);

app.post('/api/search', api.search);

app.post('/api/report',api.report);

app.post('/api/:id', api.comment);

app.post('/api', api.insert);


var server = app.listen(app.get('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
