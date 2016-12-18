var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');

var app = express();

app.use(bodyParser.json());

var secret = 'supersecretkey';

app.post('/session', function (req, res) {
	var username = req.body.username;
	//TODO: Validate Password
	
	var token = jwt.encode({username: username}, secret);
	res.json(token);
});

app.get('/user', function (req, res) {
	var token = req.headers['x-auth'];
	var user = jwt.decode(token, secret);
	
	//TODO: pull user from Database
	
	res.json(user)
});


app.listen(3000, function () {
	console.log('Server starts at 3000');
});