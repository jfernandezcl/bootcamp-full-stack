const { gql } = require("apollo-server-express");

const typeDefs = gql`
   type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }


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
    me: User
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

     createUser(
    username: String!
    favoriteGenre: String!
  ): User
  
  login(
    username: String!
    password: String!
  ): Token
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

module.exports = typeDefs;
