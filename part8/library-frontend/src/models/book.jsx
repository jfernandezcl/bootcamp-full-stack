const mongoose = require("mongoose");
const Author = require("./author");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  published: {
    type: Number,
    required: true,
  },
  genres: [{
    type: String,
    required: true,
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author", // Referencia al modelo Author
    required: true
  }
});

module.exports = mongoose.model("Book", bookSchema);


