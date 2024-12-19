const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  born: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Author", authorSchema);
