var mongoose = require('mongoose');

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

var Post = mongoose.model('posts', postSchema);

Post.create = function (newPost, callback) {
    newPost.save(callback);
};

Post.getAll = function (callback) {
    Post.find({}, callback);
};

Post.getById = function (id, callback) {
    Post.findById(id, callback);
};

module.exports = Post;