// 1/1.test.js

// !!! Comment out line number 5 below and uncomment the line number 6 to start the exercise.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// For this test to pass you have to edit only ./toBeChanged/products/typeDefs.js

// Do not change anything in the lines below!
// Also - don't worry about understanding what's going on below, at least for now.
//
//
//

const { resolvers, typeDefs } = exerciseStarted
  ? require("./toBeChanged/products")
  : require("./final/products");

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
        // Resolvers are automocked by the federation-testing-tool
      }
    },
    {
      products: {
        typeDefs,
        resolvers
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

  // simulate the GraphQL call going through the Gateway and to the Inventory/Products services.
  const result = await executeGraphql({ query, services });

  expect(result.errors).toBeUndefined();
  expect(result.data.topProducts[0]).toMatchObject({ id: "1" });
});
