var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var _ = require('lodash');

var app = express();

app.use(bodyParser.json());

//mock data
var users = [
	{
		username: 'nodejs',
		password: 'pass'
	}
];
var secret = 'supersecretkey';

// lookup user in DB and check their password
function findUserByUsername(username) {
	return _.find(users, {username:username});
}

function validateUser (user, password) {
	return user.password = password;
}

app.post('/session', function (req, res) {
	var user = findUserByUsername(req.body.username);
	if (!validateUser(user, req.body.password)) {
		return res.send(401)  // unauthorized
	}
	
	var token = jwt.encode({username: user.username}, secret);
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