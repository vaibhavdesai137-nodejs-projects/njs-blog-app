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

// our schemas
var postSchema = new mongoose.Schema({
    author: String,
    title: String,
    category: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var categorySchema = new mongoose.Schema({
    name: String
});

var Post = mongoose.model('posts', postSchema);
var Category = mongoose.model('categories', categorySchema);

// All Post methods
Post.create = function (newPost, callback) {
    newPost.save(callback);
};

Post.getAll = function (callback) {
    Post.find({}, callback);
};

Post.getById = function (id, callback) {
    Post.findById(id, callback);
};

// All Category methods
Category.create = function (newCategory, callback) {
    newCategory.save(callback);
};

Category.getAll = function (callback) {
    Category.find({}, callback);
};

Category.getByName = function (categoryName, callback) {
    Category.findOne({
        name: categoryName
    }, callback);
};

var models = {
    'Post': Post,
    'Category': Category,
}

module.exports = models;