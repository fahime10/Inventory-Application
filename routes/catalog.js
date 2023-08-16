const express = require('express');
const router  = express.Router();

const category_controller = require('../controllers/categoryController');
const intrument_controller = require('../controllers/instrumentController');

router.get('/', category_controller.index);

// router.get('/category/:id', category_controller.category_detail);

module.exports = router;
