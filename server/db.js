const mongoose = require("mongoose");
const mongoURL = require("./config/keys").mongoURL;
mongoose.Promise = global.Promise;
const connection = mongoose.connect(mongoURL, { useNewUrlParser: true });
connection
  .then(db => {
    console.log("connected to db");
    return db;
  })
  .catch(err => {
    console.log("ERROR connecting to db", err);
  });

module.exports = connection;
