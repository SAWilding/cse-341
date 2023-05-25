const routes = require('express').Router();
const { handleErrors } = require('../ultilities/ultils.js');
const MyController = require('../controllers/courts');
const {
  validateRequest,
  getRules,
  deleteRules,
  putAndPostRules
} = require('../ultilities/validation.js');

routes.get('/', getRules, validateRequest, handleErrors(MyController.getCourts));
routes.get('/:id', getRules, validateRequest, handleErrors(MyController.getCourt));
routes.post('/', putAndPostRules(), validateRequest, handleErrors(MyController.insertCourt));
routes.put('/:id', putAndPostRules(), validateRequest, handleErrors(MyController.updateCourt));
routes.delete('/:id', deleteRules, validateRequest, handleErrors(MyController.removeCourt));

module.exports = routes;
