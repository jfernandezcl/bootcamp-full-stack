const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      authorization: req.headers.authorization || "",
    };
  },
});

server.applyMiddleware({ app });

mongoose.connect("mongodb://localhost:27017/bookstore", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen({ port: 4000 }, () =>
      console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
    );
  })
  .catch(error => {
    console.error("Database connection error:", error);
  });
