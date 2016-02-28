var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: String
});

var Category = mongoose.model('categories', categorySchema);

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

module.exports = Category;