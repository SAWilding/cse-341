const dotenv = require('dotenv');
dotenv.config();
var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const contactsRoutes = require('./routes/contacts');
const mongodb = require("./db/connect");

// Get environment variables
const port = process.env.PORT | 5500;
// Routes
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    })
    .use("/contacts", contactsRoutes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
