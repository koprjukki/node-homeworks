const express = require("express");
const contactsController = require("./contacts.controller");
const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getContactsList);

contactsRouter.post(
	"/",
	contactsController.validateAddedContact,
	contactsController.postContact,
);

contactsRouter.get(
	"/:id",
	contactsController.validateId,
	contactsController.getContactById,
);

contactsRouter.delete(
	"/:id",
	contactsController.validateId,
	contactsController.removeContact,
);

contactsRouter.patch(
	"/:id",
	contactsController.validateId,
	contactsController.validateUpdateContact,
	contactsController.updateContact,
);

module.exports = contactsRouter;
