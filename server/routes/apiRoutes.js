var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController.js');

/*
 * POST
 */
router.post('/quote', apiController.quote);

/*
 * POST
 */
router.post('/quotechart', apiController.quotechart);

/*
 * POST
 */
router.post('/batch', apiController.batch);


module.exports = router;