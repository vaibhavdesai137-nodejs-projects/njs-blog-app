var mongo = require('mongodb');
var mongoose = require('mongoose');
var config = require('./../config');

var mongoUri = 'mongodb://' + config.dbUser + ':' + config.dbPassword + '@' + config.dbHost + ':' + config.dbPort + '/' + config.dbName;

console.log('Connecting to the db...');
console.log('mongoUri: ' + mongoUri);
mongoose.connect(mongoUri, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});

// our schema
var userSchema = new mongoose.Schema({
    title: String,
    category: String,
    author: String,
    body: String,
    date: Date
});

var Post = mongoose.model('posts', userSchema);

Post.getAll = function (callback) {
    Post.find({}, callback);
};

Post.getById = function (id, callback) {
    Post.findById(id, callback);
};

module.exports = Post;