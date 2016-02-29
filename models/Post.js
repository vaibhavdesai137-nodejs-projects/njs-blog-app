var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    author: String,
    title: String,
    category: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    imageName: String,
    comments: []
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

Post.getByCategory = function (category, callback) {
    Post.find({
        category: category
    }, callback);
};

Post.addComment = function (postOid, comment, callback) {

    Post.update({
            _id: postOid
        }, {
            $push: {
                comments: comment
            }
        },
        callback);
};

module.exports = Post;