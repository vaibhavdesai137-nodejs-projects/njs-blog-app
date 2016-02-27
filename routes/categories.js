var express = require('express');
var router = express.Router();
var Category = require('./../models/Category');

// get all users
router.get('/', function (req, res, next) {
    res.send("all good");
});

module.exports = router;