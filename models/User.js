var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var config = require('./../config');

var mongoUri = 'mongodb://' + config.dbUser + ':' + config.dbPassword + '@' + config.dbHost + ':' + config.dbPort + '/' + config.dbName;

console.log('Connecting to the db...');
console.log('mongoUri: ' + mongoUri);
mongoose.connect(mongoUri, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
})

// our schema
var userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
        bcrypt: true
    },
    profileimage: String
});

var User = module.exports = mongoose.model('User', userSchema);

User.create = function (newUser, callback) {
    var hash = bcrypt.hashSync(newUser.password, 8);
    newUser.password = hash;
    newUser.save(callback);
};

User.getByUserName = function (username, callback) {
    var query = {
        username: username
    };
    User.findOne(query, callback);
}

User.getByUserId = function (id, callback) {
    User.findById(id, callback);
}

User.comparePassword = function (enteredPassword, hash, callback) {
    bcrypt.compare(enteredPassword, hash, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}

User.getAll = function (callback) {
    User.find({}, callback);
};