const Instrument = require('../models/instrument');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.instrument_list = asyncHandler(async (req, res, next) => {
    const [category, intrumentsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Instrument.find({ category: req.params.id }, 'name description price stock').exec(),
    ]);

    if (category === null) {
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
    }

    res.render('instrument_list', {
        title: `List of instruments`,
        category: category,
        instrument_list: intrumentsInCategory,
    });
});

exports.instrument_create_get = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();

    res.render('instrument_form', {
        title: 'Add new instrument',
        categories: allCategories,
    });
});

exports.instrument_create_post = [
    body('name')
        .trim()
        .escape(),

    body('description')
        .trim()
        .escape(),

    body('price')
        .trim()
        .escape(),

    body('stock')
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const instrument = new Instrument({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
        });

        if (!errors.isEmpty()) {
            const allCategories = await Category.find().exec();

            for (const category of allCategories) {
                if (instrument.category.includes(category._id)) {
                    category.checked = 'true';
                }
            }

            res.render('instrument_form', {
                title: 'Add new instrument',
                categories: allCategories,
                errors: errors.array(),
            });
        } else {
            await instrument.save();
            res.redirect('/catalog');
        }
    }),
];