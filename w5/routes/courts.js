const routes = require('express').Router();

const MyController = require('../controllers/courts');

routes.get('/', MyController.getCourts);
routes.get('/:id', MyController.getCourt);
routes.post('/', MyController.insertCourt);
routes.put('/:id', MyController.updateCourt);
routes.delete('/:id', MyController.removeCourt);

module.exports = routes;
