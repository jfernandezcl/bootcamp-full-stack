const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

module.exports = typeDefs;
