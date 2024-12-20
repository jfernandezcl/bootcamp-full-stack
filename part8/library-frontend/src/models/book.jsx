const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
  },
  published: {
    type: Number,
    required: [true, "Published year is required"],
  },
  genres: [
    {
      type: String,
      required: [true, "At least one genre is required"],
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "Author is required"],
  },
});

module.exports = mongoose.model("Book", bookSchema);



