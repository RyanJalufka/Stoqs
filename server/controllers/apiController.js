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
      if(error) { console.log('...') }
    })

  }
}