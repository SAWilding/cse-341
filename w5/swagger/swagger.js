const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: { title: 'Pickleball Courts', description: 'API for CSE 341' },
  host: 'localhost:8188',
  schemes: ['http']
};
const outputFile = './swagger.json';
const endpointsFiles = ['../routes/courts.js'];
/* NOTE: if you use the express Router, you must pass in the 'endpointsFiles' only the root file where the route starts, such as index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);
