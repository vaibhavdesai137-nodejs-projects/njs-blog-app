var express = require('express');
var router = express.Router();
var Post = require('./../models/Post');

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
router.get('/:id', function (req, res, next) {
    var postOid = req.param.id;
    Post.getById(postOid, function (err, post) {
        if (err) throw err;
        res.render('posts', {
            posts: post
        });
    });
});

module.exports = router;