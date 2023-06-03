const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: '349854345018-25nmbbipvftjocfhjqob78kq3s7urlo1.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://your-app.com/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user authentication and authorization
      // You can store user information in the database or session
      // Call `done(null, user)` to complete the authentication process
    }
  )
);

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
