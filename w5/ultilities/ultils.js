handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) =>
    res.status(500).send('Internal Server Error')
  );

module.exports = { handleErrors };
