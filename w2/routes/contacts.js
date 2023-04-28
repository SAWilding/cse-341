const routes = require("express").Router();

const MyController = require("../controllers/contacts");

routes.get("/", MyController.getContacts)
routes.get("/:id", MyController.getContact)

module.exports = routes;