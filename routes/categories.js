var express = require('express');
var router = express.Router();
var Category = require('./../models/Models').Category;

// show addcategory page
router.get('/add', function (req, res, next) {

    Category.getAll(function (err, categories) {

        if (err) throw err;

        res.render('addcategory', {
            title: 'Add Category',
            categories: categories
        });
    });
});

// save a new post
router.post('/add', function (req, res, next) {

    var categoryName = req.body.categoryName;

    // Validators
    req.checkBody('categoryName', 'Category Name field is required').notEmpty();

    // Error checking
    var errors = req.validationErrors();
    if (errors) {
        res.render('addcategory', {
            title: 'Add Category',
            errors: errors,
            categoryName: categoryName
        });
    } else {

        // check if we a category with the given name already
        Category.getByName(categoryName, function (err, category) {
            if (err) throw err;

            if (category) {
                req.flash('error', 'Category already exists');
                res.location('/categories/add');
                res.redirect('/categories/add');
                return;
            }

            // create new category
            var newCategory = new Category({
                name: categoryName
            });

            Category.create(newCategory, function (err, category) {
                if (err) throw err;
                console.log("New category successfully created");

                // success msg
                req.flash('success', 'Category successfully saved');
                res.location('/categories/add');
                res.redirect('/categories/add');
            });
        });
    }
});

module.exports = router;