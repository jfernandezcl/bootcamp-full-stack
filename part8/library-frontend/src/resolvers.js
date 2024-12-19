const Author = require("./models/author");
const Book = require("./models/book");

const resolvers = {
  Query: {
    // Consulta de todos los libros con filtro por género
    allBooks: async (_, { genre }) => {
      if (genre) {
        return await Book.find({ genres: genre }).populate("author", { name: 1, born: 1 });
      }
      return await Book.find({}).populate("author", { name: 1, born: 1 });
    },
    allAuthors: async () => {
      return await Author.find({});
    }
  },
  Mutation: {
    // Agregar un libro
    addBook: async (_, { title, author, published, genres }) => {
      // Buscar el autor por nombre
      const authorObj = await Author.findOne({ name: author });

      if (!authorObj) {
        throw new Error("Author not found");
      }

      // Crear un nuevo libro
      const newBook = new Book({
        title,
        author: authorObj._id,
        published,
        genres
      });

      await newBook.save();

      return newBook;
    },
    // Editar el año de nacimiento de un autor
    editAuthor: async (_, { name, setBornTo }) => {
      const author = await Author.findOne({ name });

      if (!author) {
        throw new Error("Author not found");
      }

      author.born = setBornTo;
      await author.save();

      return author;
    }
  }
};

module.exports = resolvers;
