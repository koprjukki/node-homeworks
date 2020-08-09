const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	subscription: { type: String, required: true },
});

schema.plugin(mongoosePaginate);

const contactModel = mongoose.model("contact", schema);

module.exports = contactModel;
