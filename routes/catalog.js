const express = require('express');
const router  = express.Router();

const category_controller = require('../controllers/categoryController');
const instrument_controller = require('../controllers/instrumentController');

router.get('/', category_controller.index);

router.get('/category/:id', instrument_controller.instrument_list);

module.exports = router;
