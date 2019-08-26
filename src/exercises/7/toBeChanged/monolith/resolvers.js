const { mergeResolvers } = require("merge-graphql-schemas");

const { resolvers: userResolvers } = require("./User/resolvers");
const { resolvers: reviewResolvers } = require("./Review/resolvers");
const { resolvers: productResolvers } = require("./Product/resolvers");

exports.resolvers = mergeResolvers([
  userResolvers,
  reviewResolvers,
  productResolvers
]);
