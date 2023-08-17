const express = require('express');
const router  = express.Router();

const category_controller = require('../controllers/categoryController');
const instrument_controller = require('../controllers/instrumentController');

router.get('/', category_controller.index);

router.get('/category/add', category_controller.category_create_get);

router.post('/category/add', category_controller.category_create_post);

router.get('/category/:id/update', category_controller.category_update_get);

router.post('/category/:id/update', category_controller.category_update_post);

router.get('/category/:id/delete', category_controller.category_delete_get);

router.post('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/:id', instrument_controller.instrument_list);

router.get('/instrument/add', instrument_controller.instrument_create_get);

router.post('/instrument/add', instrument_controller.instrument_create_post);

router.get('/instrument/:id/update', instrument_controller.instrument_update_get);

router.post('/instrument/:id/update', instrument_controller.instrument_update_post);

router.get('/instrument/:id/delete', instrument_controller.instrument_delete_get);

router.post('/instrument/:id/delete', instrument_controller.instrument_delete_post);

module.exports = router;
