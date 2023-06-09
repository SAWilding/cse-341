const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
global.app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const courtsRoutes = require('./routes/courts');
const authRoutes = require('./routes/auth');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
// Get environment variables
const port = process.env.PORT | 5500;
global.swagger = false;

const isAuth = (req, res, next) => {
  // Perform authentication for other requests
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
const swaggerAuthMiddleware = (req, res, next) => {
  global.swagger = true;
  next();
};

// Routes
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(
    '/api-docs',
    swaggerAuthMiddleware,
    (req, res, next) => {
      req = res.modifiedReq;
      next();
    },
    isAuth,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc)
  )
  .use('/', authRoutes)
  .use('/courts', courtsRoutes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

module.exports = app;
