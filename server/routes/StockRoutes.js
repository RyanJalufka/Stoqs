var express = require('express');
var router = express.Router();
var StockController = require('../controllers/StockController.js');

/*
 * GET
 */
router.get('/', StockController.list);

/*
 * GET
 */
router.get('/:id', StockController.show);

/*
 * POST
 */
router.post('/stocklist', StockController.stocklist);

/*
 * POST
 */
router.post('/', StockController.create);

/*
 * PUT
 */
router.put('/:id', StockController.update);

/*
 * DELETE
 */
router.delete('/:id', StockController.remove);

module.exports = router;
