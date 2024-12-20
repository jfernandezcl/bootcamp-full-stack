const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const SECRET_KEY = "your_secret_key";

const authenticateUser = (context) => {
  const auth = context.authorization || "";

  if (auth.startsWith("Bearer ")) {
    const token = auth.substring(7);
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch {
      throw new GraphQLError("Invalid or expired token", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }
  }
  throw new GraphQLError("Missing token", {
    extensions: { code: "UNAUTHENTICATED" },
  });
};

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
    me: async (_, __, context) => {
      const user = authenticateUser(context);
      return await User.findById(user.id);
    },
  },
  Mutation: {
    addBook: async (_, { title, author, published, genres }, context) => {
      authenticateUser(context);

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
    editAuthor: async (_, { name, setBornTo }, context) => {
      authenticateUser(context);

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
    createUser: async (_, { username, favoriteGenre }) => {
      try {
        const newUser = new User({ username, favoriteGenre });
        await newUser.save();
        return newUser;
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("Validation error", {
            extensions: { code: "BAD_USER_INPUT", errorDetails: error.errors },
          });
        }
        throw new GraphQLError("Failed to create user", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    },
    login: async (_, { username, password }) => {
      const HARDCODED_PASSWORD = "password123";
      const user = await User.findOne({ username });

      if (!user || password !== HARDCODED_PASSWORD) {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY);
      return { value: token };
    },
  },
};

module.exports = resolvers;
