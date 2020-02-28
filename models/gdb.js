const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gdbSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  rfaid: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  notes: [{
    created: Date,
    note: String
  }],
  created: {
    type: Date
  },
  updated: {
    type: Date
  }
});

const Gdb = mongoose.model('gdb', gdbSchema);

module.exports = Gdb;
