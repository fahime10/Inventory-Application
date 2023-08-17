const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();

    res.render('index', {
        title: 'Welcome to the inventory application for instruments',
        category_list: allCategories,
    });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render('category_form', { title: 'Create new category' });
});

exports.category_create_post = [
    body('name', 'Category name must be at least 2 characters')
        .trim()
        .isLength({ min: 2 })
        .escape(),

    body('description', 'Description must be minimum 5 characters long')
        .trim()
        .isLength({ min: 5 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({ name: req.body.name, description: req.body.description });

        if (!errors.isEmpty()) {
            res.render('category_form', {
                title: 'Create new category',
                category: category,
                errors: errors.array(),
            });
            return;
        } else {
            const categoryExists = await Category.findOne({ name: req.body.name })
                .collation({ locale: 'en', strength: 2 })
                .exec();

            if (categoryExists) {
                res.redirect(categoryExists.url);
            } else {
                await category.save();
                res.redirect(category.url);
            }
        }
    })
]
