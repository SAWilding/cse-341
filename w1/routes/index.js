const routes = require("express").Router();

const MyController = require("../controllers");

routes.get("/", MyController.displayName)

module.exports = routes;