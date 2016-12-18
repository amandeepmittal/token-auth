var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var _ = require('lodash');
var bcrypt = require('bcrypt');

var app = express();
var User = require('./user.model');

app.use(bodyParser.json());

//mock data
//var users = [
//	{
//		username: 'nodejs',
//		password: '$2a$10$Eqz8EfcNAKvP1vqS0YEUnupHw8Dn6LdHP2ut2cOHtRUyhnVQtypa2'
//	}
//];
var secret = 'supersecretkey';

//// lookup user in DB and check their password
//function findUserByUsername(username) {
//	return _.find(users, {username:username});
//}
//
////	pass a callback "cb" to make it async
//function validateUser (user, password, cb) {
//	bcrypt.compare(password, user.password, cb);
//}

app.post('/user', function (req, res, next) {
	var user = new User({
		username: req.body.username
	});
	
	bcrypt.hash(req.body.password, 10, function (err, hash) {
		user.password = hash;
		user.save(function (err, user) {
			if (err) {return next(err);}
			console.log(user);
			res.send(201);
		})
	})
});

app.post('/session', function (req, res, next) {
	//	lookup a match for username
	User.findOne({username: req.body.username})
		.select('password')
		.exec(function (err, user) {
			if (err) {return next(err);}
			if(!user) {return res.send(401);}  // unauthorized
			//	check for password that is sent
			bcrypt.compare(req.body.password, user.password, function (err, valid) {
				if (err) {return next(err);}
				if(!valid) {return res.send(401);}  // unauthorized
				// if password is valid, encode jwt token
				var token = jwt.encode({username: user.username}, secret);
				res.json(token);
			});
		});
});

app.get('/user', function (req, res) {
	var token = req.headers['x-auth'];
	var auth = jwt.decode(token, secret);
	
	User.findOne({username: auth.username}, function (err, user) {
		res.json(user);
	});
});


app.listen(3000, function () {
	console.log('Server starts at 3000');
});