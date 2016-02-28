var express = require('express');
var router = express.Router();
var Post = require('./../models/Post');
var Category = require('./../models/Category');

// get all posts
router.get('/', function (req, res, next) {
    Post.getAll(function (err, posts) {
        if (err) throw err;
        res.render('posts', {
            title: 'Home',
            posts: posts
        });
    });
});

// get a aprticular post
router.get('/show/:id', function (req, res, next) {
    var postOid = req.params.id;
    Post.getById(postOid, function (err, post) {
        if (err) throw err;
        res.render('post', {
            title: 'Post',
            post: post
        });
    });
});

// show addpost page
router.get('/add', function (req, res, next) {

    Category.getAll(function (err, categories) {

        if (err) throw err;

        res.render('addpost', {
            title: 'Add Post',
            categories: categories
        });
    });
});

// save a new post
router.post('/add', function (req, res, next) {

    var postAuthor = req.body.postAuthor;
    var postTitle = req.body.postTitle;
    var postCategory = req.body.postCategory;
    var postContent = req.body.postContent;
    var postImage = req.files.postImage;

    // check if user submitted a post image
    if (postImage) {
        console.log("Uploading image...");
        var postImageOrigName = req.files.postImage.originalname;
        var postImageName = req.files.postImage.name;
        var postImageMimeType = req.files.postImage.mimetype;
        var postImagePath = req.files.postImage.path;
        var postImageSize = req.files.postImage.size;
        var postImageExt = req.files.postImage.extension;
    } else {
        var postImageName = 'default-image.jpg';
    }

    // Validators
    req.checkBody('postAuthor', 'Full Name field is required').notEmpty();
    req.checkBody('postTitle', 'Post Title field is required').notEmpty();
    req.checkBody('postCategory', 'Post Category field is required').notEmpty();
    req.checkBody('postContent', 'Post Content is required').notEmpty();

    // Error checking
    var errors = req.validationErrors();
    if (errors) {
        res.render('addpost', {
            title: 'Add Post',
            errors: errors,
            postAuthor: postAuthor,
            postTitle: postTitle,
            postCategory: postCategory,
            postContent: postContent
        });
    } else {

        // create new post
        var newPost = new Post({
            author: postAuthor,
            title: postTitle,
            category: postCategory,
            content: postContent,
            imageName: postImageName
        });

        Post.create(newPost, function (err, post) {
            if (err) throw err;
            console.log("New post successfully created");
        });

        // success msg
        req.flash('success', 'Post successfully saved');
        res.location('/');
        res.redirect('/');
    }
});

module.exports = router;