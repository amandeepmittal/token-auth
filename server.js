var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var _ = require('lodash');
var bcrypt = require('bcrypt');

var app = express();

app.use(bodyParser.json());

//mock data
var users = [
	{
		username: 'nodejs',
		password: '$2a$10$Eqz8EfcNAKvP1vqS0YEUnupHw8Dn6LdHP2ut2cOHtRUyhnVQtypa2'
	}
];
var secret = 'supersecretkey';

// lookup user in DB and check their password
function findUserByUsername(username) {
	return _.find(users, {username:username});
}

//	pass a callback "cb" to make it async
function validateUser (user, password, cb) {
	bcrypt.compare(password, user.password, cb);
}

app.post('/session', function (req, res) {
	var user = findUserByUsername(req.body.username);
	
	validateUser(user, req.body.password, function (err, valid) {
		//	if not valid, send unauthorized error
		if (err || !valid) {
			return res.send(401);		//	unauthorized
		}
		// if valid then encode
		var token = jwt.encode({username: user.username}, secret);
		res.json(token);
	});
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