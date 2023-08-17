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