const { gql } = require("apollo-server");
const { mergeTypes } = require("merge-graphql-schemas");

const { typeDefs: userTypeDefs } = require("./User/typeDefs");
const { typeDefs: reviewTypeDefs } = require("./Review/typeDefs");
const { typeDefs: productTypeDefs } = require("./Product/typeDefs");

exports.typeDefs = gql`
  ${mergeTypes([userTypeDefs, reviewTypeDefs, productTypeDefs])}
`;
