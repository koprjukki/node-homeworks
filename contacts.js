const fs = require("fs");
const { promises: fsPromise } = fs;
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

function listContacts() {
	fsPromise
		.readFile(contactsPath, "utf-8")
		.then((data) => console.table(JSON.parse(data)));
}

exports.listContacts = listContacts;

function getContactById(contactId) {
	fsPromise.readFile(contactsPath, "utf-8").then((data) => {
		const contacts = JSON.parse(data);

		const contactById = contacts.filter(({ id }) => id === contactId);
		console.table(contactById);
	});
}

exports.getContactById = getContactById;

function removeContact(contactId) {
	fsPromise.readFile(contactsPath, "utf-8").then((data) => {
		const contacts = JSON.parse(data);

		const filteredContacts = contacts.filter(({ id }) => id !== contactId);

		fsPromise.writeFile(contactsPath, JSON.stringify(filteredContacts));
	});
}

exports.removeContact = removeContact;

function addContact(name, email, phone) {
	fsPromise.readFile(contactsPath, "utf-8").then((data) => {
		const contact = { name, email, phone, id: uuidv4() };
		const contacts = [...JSON.parse(data), contact];

		fsPromise.writeFile(contactsPath, JSON.stringify(contacts));
	});
}

exports.addContact = addContact;
