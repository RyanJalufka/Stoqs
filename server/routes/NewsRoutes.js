var express = require('express');
var router = express.Router();
var NewsController = require('../controllers/NewsController.js');

/*
 * GET
 */
router.post('/', NewsController.list);

module.exports = router;