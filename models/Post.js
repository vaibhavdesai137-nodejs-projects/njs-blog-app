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
var schema = new mongoose.Schema({
    author: String,
    title: String,
    category: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var Post = mongoose.model('posts', schema);

Post.create = function (newPost, callback) {
    console.log("NEW: " + JSON.stringify(newPost));
    newPost.save(callback);
}

Post.getAll = function (callback) {
    Post.find({}, callback);
};

Post.getById = function (id, callback) {
    Post.findById(id, callback);
};

module.exports = Post;