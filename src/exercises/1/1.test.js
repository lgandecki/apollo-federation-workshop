// 1/1.test.js

// Comment out the first require statement and uncomment the second one to start the exercise.
// For this test to pass you have to edit only ./toBeChanged/products/typeDefs.js

const { resolvers, typeDefs } = require("./final/products"); // 🐨
// const { resolvers, typeDefs } = require("./toBeChanged/products"); // 🐨

// Do not change anything in the lines below!
// Also - don't worry about understanding what's going on below, at least for now.
//
//
//

const gql = require("graphql-tag");
const { executeGraphql } = require("federation-testing-tool");

test("Can reference the Product type from another service", async () => {
  const inventoryTypeDefs = gql`
    extend type Product @key(fields: "id") {
      id: ID! @external
      weight: Int @external
      price: Int @external
      inStock: Boolean
      shippingEstimate: Int @requires(fields: "price weight")
    }
  `;

  const services = [
    {
      inventory: {
        typeDefs: inventoryTypeDefs
      }
    },
    {
      products: {
        typeDefs,
        resolvers,
        underTest: true
      }
    }
  ];

  const query = gql`
    query topProducts {
      topProducts {
        id
      }
    }
  `;

  const result = await executeGraphql({ query, services });

  expect(result.errors).toBeUndefined();
  expect(result.data.topProducts[0].id).toEqual("1");
});
