const Category = require('../models/category');
const Instrument = require('../models/instrument');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();

    res.render('index', {
        title: 'Welcome to the inventory application for instruments',
        category_list: allCategories,
    });
});
