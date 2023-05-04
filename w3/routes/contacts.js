const routes = require("express").Router();

const MyController = require("../controllers/contacts");

routes.get("/", MyController.getContacts);
routes.get("/:id", MyController.getContact);
routes.post("/", MyController.insertContact);
routes.put("/:id", MyController.updateContact);
routes.delete("/:id", MyController.removeContact);

module.exports = routes;