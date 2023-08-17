const express = require('express');
const router  = express.Router();

const category_controller = require('../controllers/categoryController');
const instrument_controller = require('../controllers/instrumentController');

router.get('/', category_controller.index);

router.get('/category/add', category_controller.category_create_get);

router.post('/category/add', category_controller.category_create_post);

router.get('/category/:id', instrument_controller.instrument_list);

module.exports = router;
