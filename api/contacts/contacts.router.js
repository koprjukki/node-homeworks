const express = require("express");
const controller = require("./contacts.controller");
const router = express.Router();

router.get("/", controller.getContactsList);

router.get("/:id", controller.validateContactId, controller.getContactById);

router.post("/", controller.validateAddContact, controller.postContact);

router.delete("/:id", controller.validateContactId, controller.removeContact);

router.patch(
	"/:id",
	controller.validateContactId,
	controller.validateUpdateContact,
	controller.updateContact,
);

module.exports = router;
