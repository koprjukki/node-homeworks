const Joi = require("@hapi/joi");
const model = require("./contact.model");
const {
	Types: { ObjectId },
} = require("mongoose");

class contactsController {
	static getContactsList = async (req, res, next) => {
		try {
			const options = {
				page: (req.query && req.query.page) || "1",
				limit: (req.query && req.query.limit) || "10",
				sort: { name: 1 },
			};
			let filterBySubscription = null;

			if (req.query && req.query.sub) {
				filterBySubscription = { subscription: req.query.sub };
			}

			const contactsList = await model.paginate(
				{ ...filterBySubscription },
				options,
			);
			res.status(200).send(contactsList);
		} catch (err) {
			next(err);
		}
	};

	static postContact = async (req, res, next) => {
		try {
			const contactToAdd = await model.create(req.body);

			res.status(201).send(contactToAdd);
		} catch (err) {
			next(err);
		}
	};

	static validateAddContact = async (req, res, next) => {
		try {
			const schema = Joi.object({
				name: Joi.string().required(),
				phone: Joi.string().required(),
				email: Joi.string().required(),
				subscription: Joi.string().required(),
			});
			const validation = await schema.validate(req.body);

			if (validation.error) {
				return res.status(400).send({
					message: `missing required ${validation.error.details[0].path[0]}`,
				});
			}
			next();
		} catch (err) {
			next(err);
		}
	};

	static validateContactId = (req, res, next) => {
		const { id } = req.params;
		if (!ObjectId.isValid(id)) {
			res.status(404).send({ message: "wrong Id" });
		}
		next();
	};

	static getContactById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const findContact = await model.findById(id);

			if (findContact) {
				res.status(200).send(findContact);
			} else {
				res.status(404).send({ message: "Not found" });
			}
		} catch (err) {
			next(err);
		}
	};

	static removeContact = async (req, res, next) => {
		try {
			const { id } = req.params;
			const findContact = await model.findByIdAndRemove(id);

			if (findContact) {
				res.status(200).send({ message: "contact deleted" });
			} else {
				res.status(404).send({ message: "Not found" });
			}
		} catch (err) {
			next(err);
		}
	};

	static updateContact = async (req, res, next) => {
		try {
			const { id } = req.params;
			const findContact = await model.findByIdAndUpdate(id, req.body, {
				new: true,
			});

			if (findContact) {
				res.status(200).send(findContact);
			} else {
				res.status(404).send({ message: "Not found" });
			}
		} catch (err) {
			next(err);
		}
	};

	static validateUpdateContact = async (req, res, next) => {
		try {
			const schema = Joi.object({
				name: Joi.string(),
				email: Joi.string(),
				phone: Joi.string(),
			});
			const validation = await schema.validate(req.body);

			if (validation.error) {
				return res.status(400).send({
					message: "missing fields",
				});
			}
			next();
		} catch (err) {
			next(err);
		}
	};
}

module.exports = contactsController;
