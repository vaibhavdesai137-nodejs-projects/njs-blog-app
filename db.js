var mongo = require('mongodb');
var mongoose = require('mongoose');
var config = require('./config');

var mongoUri = 'mongodb://' + config.dbUser + ':' + config.dbPassword + '@' + config.dbHost + ':' + config.dbPort + '/' + config.dbName;

console.log('Connecting to the db...');
console.log('mongoUri: ' + mongoUri);
mongoose.connect(mongoUri);

// connected
mongoose.connection.on('connected', function () {
    console.log('DB Connected');
});

// errored
mongoose.connection.on('error', function (err) {
    console.log('Error connecting to DB: ' + err);
});

// disconnected
mongoose.connection.on('disconnected', function () {
    console.log('DB Disconnected');
});

// node process killed
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('DB connection disconnected through app termination');
        process.exit(0);
    });
});

require('./models/Post');
require('./models/Category');