const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { json } = require("express");
const contactsRouter = require("./contacts/contacts.router");

const app = express();

app.use(json());
app.use(cors());
app.use(morgan());
app.use("/api/contacts", contactsRouter);

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Database connection successful");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

dbConnect();

app.listen(process.env.PORT, () =>
	console.log(`App listening at http://localhost:${process.env.PORT}`),
);
