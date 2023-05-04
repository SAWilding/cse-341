import { config } from 'dotenv';
config();
import express from "express";
var app = express();
import { json, urlencoded } from 'body-parser';
import contactsRoutes from './routes/contacts';
import mongodb from "./db/connect";

// Get environment variables
const port = process.env.PORT | 5500;
// Routes
app.use(json())
    .use(urlencoded({ extended: true }))
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
