const axios = require('axios');

module.exports = {

  quote: function(req, res) {
    const symbol = req.body.symbol

    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(response => response.data)
    .then(data => {
      res.send(data);
    })
    .catch((error) => {
      if(error) { console.log('news error...') }
    })

  },

  quotechart: function(req, res) {
    const symbol = req.body.symbol

    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,chart&range=1m`)
    .then(response => response.data)
    .then(data => {
      res.send(data);
    })
    .catch((error) => {
      if(error) { console.log('news error...') }
    })

  },

  batch: function(req, res) {
    const stocks = req.body.stocks;

    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${stocks}&types=quote`)
    .then(response => response.data)
    .then(data => {
      res.send(data);
    })
    .catch((error) => {
      if(error) { console.log('batch error...') }
    })
  }
}