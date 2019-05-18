const axios = require('axios');

module.exports = {

  list: function(req, res) {
    const symbols = req.body.symbols
    console.log("SYMBOLS", symbols);
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=news`)
    .then(response => response.data)
    .then(data => {
      res.send(data);
    })
    .catch((error) => {
      if(error) { console.log('...') }
    })

  }
}