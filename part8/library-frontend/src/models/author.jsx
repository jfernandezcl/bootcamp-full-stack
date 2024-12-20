const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  born: {
    type: Number,
  },
});

module.exports = mongoose.model("Author", authorSchema);

