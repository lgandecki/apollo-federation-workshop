const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const { context } = require("./context");

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
