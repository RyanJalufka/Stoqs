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
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/stocks", stocks);
app.use("/users", users);
app.use("/news", news);
app.use("/api", api);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
  require("./db");
});
