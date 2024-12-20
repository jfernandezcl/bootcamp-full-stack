const { GraphQLError } = require("graphql");
const Author = require("./models/author");
const Book = require("./models/book");

const resolvers = {
  Query: {
    allBooks: async (_, { genre }) => {
      try {
        if (genre) {
          return await Book.find({ genres: genre }).populate("author");
        }
        return await Book.find({}).populate("author");
      } catch (error) {
        throw new GraphQLError("Failed to fetch books", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    },
    allAuthors: async () => {
      try {
        return await Author.find({});
      } catch (error) {
        throw new GraphQLError("Failed to fetch authors", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    },
  },
  Mutation: {
    addBook: async (_, { title, author, published, genres }) => {
      try {
        let authorObj = await Author.findOne({ name: author });

        if (!authorObj) {
          authorObj = new Author({ name: author });
          await authorObj.save();
        }

        const newBook = new Book({
          title,
          published,
          genres,
          author: authorObj._id,
        });

        await newBook.save();

        return await Book.findById(newBook._id).populate("author");
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("Validation error", {
            extensions: { code: "BAD_USER_INPUT", errorDetails: error.errors },
          });
        }
        throw new GraphQLError("Failed to add book", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    },
    editAuthor: async (_, { name, setBornTo }) => {
      try {
        const author = await Author.findOne({ name });

        if (!author) {
          throw new GraphQLError("Author not found", { extensions: { code: "NOT_FOUND" } });
        }

        author.born = setBornTo;
        await author.save();

        return author;
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("Validation error", {
            extensions: { code: "BAD_USER_INPUT", errorDetails: error.errors },
          });
        }
        throw new GraphQLError("Failed to edit author", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    },
  },
};

module.exports = resolvers;
