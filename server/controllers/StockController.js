var StockModel = require("../models/StockModel.js");

/**
 * StockController.js
 *
 * @description :: Server-side logic for managing Stocks.
 */
module.exports = {
  /**
   * StockController.list()
   */
  list: function(req, res) {
    StockModel.find(function(err, Stocks) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Stock.",
          error: err
        });
      }
      return res.json(Stocks);
    });
  },

  /**
   * StockController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    console.log("id is: ", id);
    StockModel.find({ owner: id }, function(err, Stocks) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Stock. show",
          error: err
        });
      }
      if (!Stocks) {
        return res.status(404).json({
          message: "No such Stock"
        });
      }
      return res.json(Stocks);
    });
  },

  /**
   * StockController.stockList()
   */
  stocklist: function(req, res) {
    const owner = req.body.owner;
    console.log('owner id: ', owner);
    var query = StockModel.find({ owner: owner }, null, { skip: 0 });
    query.exec(function(err, docs) {
      console.log(docs);
      res.json(docs);
    });
  },

  /**
   * StockController.create()
   */
  create: function(req, res) {
    const Stock = new StockModel({
      symbol: req.body.symbol,
      shares: req.body.shares,
      price: req.body.price,
      cost: req.body.cost,
      owner: req.body.owner
    });

    Stock.save(function(err, Stock) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating Stock",
          error: err
        });
      }
      return res.status(201).json(Stock);
    });
  },

  /**
   * StockController.update()
   */
  update: function(req, res) {
    const id = req.params.id;
    StockModel.findOne({ _id: id }, function(err, Stock) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Stock",
          error: err
        });
      }
      if (!Stock) {
        return res.status(404).json({
          message: "No such Stock"
        });
      }

      Stock.symbol = req.body.symbol ? req.body.symbol : Stock.symbol;
      Stock.shares = req.body.shares ? req.body.shares : Stock.shares;
      Stock.price = req.body.price ? req.body.price : Stock.price;
      Stock.cost = req.body.cost ? req.body.cost : Stock.cost;
      Stock.owner = req.body.owner;

      Stock.save(function(err, Stock) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Stock.",
            error: err
          });
        }

        return res.json(Stock);
      });
    });
  },

  /**
   * StockController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    StockModel.findByIdAndRemove(id, function(err, Stock) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Stock.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
