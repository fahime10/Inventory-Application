const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();

    res.render('category', {
        title: "Please select a category",
        category_list: allCategories,
    });
});