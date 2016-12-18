var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/token-auth');

var userSchema = mongoose.Schema({
	username: String,
	password: {type: String, select:false}		// select:false used for not sending password to client in jwt token
});

module.exports = mongoose.model('User', userSchema);
