var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController.js');

/*
 * GET
 */
router.post('/quote', apiController.quote);

module.exports = router;