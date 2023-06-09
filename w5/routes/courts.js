const routes = require('express').Router();
const { handleErrors } = require('../ultilities/ultils.js');
const MyController = require('../controllers/courts');
const {
  validateRequest,
  getRules,
  deleteRules,
  putAndPostRules
} = require('../ultilities/validation.js');

const isAuth = (req, res, next) => {
  console.log(req.originalUrl);
  // Perform authentication for other requests
  if (req.user || swagger) {
    next();
  } else {
    res.redirect('/login');
  }
};

routes.get('/', isAuth, getRules, validateRequest, handleErrors(MyController.getCourts));
routes.get('/:id', isAuth, getRules, validateRequest, handleErrors(MyController.getCourt));
routes.post(
  '/',
  isAuth,
  putAndPostRules(),
  validateRequest,
  handleErrors(MyController.insertCourt)
);
routes.put(
  '/:id',
  isAuth,
  putAndPostRules(),
  validateRequest,
  handleErrors(MyController.updateCourt)
);
routes.delete('/:id', isAuth, deleteRules, validateRequest, handleErrors(MyController.removeCourt));

module.exports = routes;
