var express = require('express');
var router = express.Router();
var User = require('./../models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// get all users
router.get('/', ensureAuthenticated, function (req, res, next) {
    User.getAll(function (err, users) {
        if (err) throw err;
        console.log(users);

        res.render('users', {
            title: 'Users',
            users: users
        });
    });
});

// render register page
router.get('/register', function (req, res, next) {
    res.render('register', {
        title: 'Register'
    });
});

// register user
router.post('/register', function (req, res, next) {

    var fullname = req.body.fullname;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;
    var profileimage = req.files.profileimage;

    // check if user submitted profile image
    if (profileimage) {
        console.log("Uploading image...");
        var profileImageOrigName = req.files.profileimage.originalname;
        var profileImageName = req.files.profileimage.name;
        var profileImageMimeType = req.files.profileimage.mimetype;
        var profileImagePath = req.files.profileimage.path;
        var profileImageSize = req.files.profileimage.size;
        var profileImageExt = req.files.profileimage.extension;
    } else {
        var profileImageName = 'default-image.png';
    }

    // Validators
    req.checkBody('fullname', 'Full Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('confirmpassword', 'Confirm Password field is required').notEmpty();
    req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

    // Error checking
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            title: 'Register',
            errors: errors,
            fullname: fullname,
            email: email,
            username: username
        });
    } else {

        // create new user in mongo
        var newUser = new User({
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            profileImage: profileImageName
        });

        User.create(newUser, function (err, user) {
            if (err) throw err;
            console.log("New user successfully created");
        });

        // success msg
        req.flash('success', 'You are now a registered user');
        res.location('/users/login');
        res.redirect('/users/login');
    }

});

// render login page
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

// login user
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/users/login',
    failureFlash: 'Invalid Username or Password',
    successFlash: 'You are now logged in'
}), function (req, res) {
    console.log('User authenticated...');
    res.redirect('/users');
});

// logout user
router.get('/logout', function (req, res, next) {
    req.logout();
    req.flash('success', 'You have logged out successfully');
    res.redirect('/users/login');
});

// Passport Stuff
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getByUserId(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getByUserName(username, function (err, user) {
            if (err) throw err;

            // unknown username
            if (!user) {
                console.log('Unknown user');
                return done(null, false, {
                    message: 'Invalid username or password'
                });
            }

            // check if passwords match
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Invalid username or password'
                    });
                }
            });
        });
    }
));

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}


module.exports = router;