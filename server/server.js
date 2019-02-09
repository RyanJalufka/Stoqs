const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const PORT = 4000;
const stocks = require("./routes/StockRoutes");
const users = require("./routes/UserRoutes");
const passport = require("passport");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);
require("./config/passport")(passport);
app.use("/stocks", stocks);
app.use("/users", users); //might be an issue for routes '/user/login' '/users/register

app.listen(PORT, () => {
  console.log("listening on port", PORT);
  require("./db");
});
