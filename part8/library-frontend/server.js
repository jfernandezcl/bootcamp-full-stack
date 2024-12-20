const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();


mongoose.connect("mongodb://localhost/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authorization = req.headers.authorization || "";
    return { authorization };
  },
});


server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);

