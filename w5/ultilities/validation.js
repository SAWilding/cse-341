const { body, check, validationResult } = require('express-validator');

const putAndPostRules = () => {
  return [
    body('name')
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Error, 'name' did not meet the required format."),
    body('condition')
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Error, 'condition' did not meet the required format."),
    body('color')
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Error, 'color' did not meet the required format."),
    body('latitude')
      .trim()
      .escape()
      .isLength({ min: 1 })
      .isNumeric()
      .withMessage("Error, 'latitude' did not meet the required format."),
    body('longitude')
      .trim()
      .escape()
      .isLength({ min: 1 })
      .isNumeric()
      .withMessage("Error, 'longitude' did not meet the required format.")
  ];
};

const getRules = check('method')
  .custom((value, { req }) => req.method === 'GET')
  .withMessage('Invalid request method');

const deleteRules = check('method')
  .custom((value, { req }) => req.method === 'DELETE')
  .withMessage('Invalid request method');

const validateRequest = (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.json(errors);
  }
};

module.exports = { putAndPostRules, getRules, deleteRules, validateRequest };
