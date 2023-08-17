const Instrument = require('../models/instrument');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const category = require('../models/category');

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

exports.instrument_update_get = asyncHandler(async (req, res, next) => {
    const [instrument, allCategories] = await Promise.all([
        Instrument.findById(req.params.id).exec(),
        Category.find().exec(),
    ]);

    if (instrument === null) {
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
    }

    for (const category of allCategories) {
        if (category._id.toString() === instrument.category.toString()) {
            category.checked = 'true';
        }
    }

    res.render('instrument_form', {
        title: 'Update ' + instrument.name,
        categories: allCategories,
        instrument: instrument,
    });
});

exports.instrument_update_post = [
    (req, res, next) => {
        if (!(req.body.category instanceof Array)) {
            if (typeof req.body.category == 'undefined') {
                req.body.category = [];
            } else {
                req.body.category = new Array(req.body.category);
            }
        }
        next();
    },

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
            _id: req.params.id,
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
                instrument: instrument,
                errors: errors.array(),
            });
            return;
        } else {
            await Instrument.findByIdAndUpdate(req.params.id, instrument, {});
            res.redirect('/catalog/category/'+instrument.category);
        }
    }),
];