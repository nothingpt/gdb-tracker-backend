const mongoose = require('mongoose');

require("dotenv").config();
const connectionString = `mongodb://${process.env.GDBUSER}:${process.env.GDBPASS}@localhost/${process.env.DB}?retryWrites=true&w=majority`;

const db = mongoose.connect(connectionString);

module.exports = db;
