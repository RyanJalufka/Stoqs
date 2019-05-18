const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const PORT = 4000;
const stocks = require("./routes/StockRoutes");
const users = require("./routes/UserRoutes");
const news = require("./routes/NewsRoutes");
const api = require("./routes/apiRoutes");
const passport = require("passport");
//const socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/stocks", stocks);
app.use("/users", users);
app.use("/news", news);
app.use("/api", api);

//------------------------------------------
// socket.on('message', message => console.log(message))
// socket.on('connect', () => {
  
//     console.log('you are connected to the socket boi');
//     // Subscribe to topics (i.e. appl,fb,aig+)
//     socket.emit('subscribe', 'snap')
  
//     // Unsubscribe from topics (i.e. aig+)
//     socket.emit('unsubscribe', 'aig+')
//   })

//------------------------------------------

app.listen(PORT, () => {
  console.log("listening on port", PORT);
  require("./db");
});
