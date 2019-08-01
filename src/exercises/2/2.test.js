// comment out the first require statement and uncomment the second one to start the exercise
// For this test to pass you have to edit only ./toBeChanged/inventory/typeDefs.js
// 2) ./toBeChanged/inventory/resolvers.js

const { inventory, products } = require("./final");
// const { inventory, products } = require("./toBeChanged");

// Do not change anything in the lines below!
// Also - don't worry about understanding what's going on below, at least for now.
//
//
//

const gql = require("graphql-tag");
const { executeGraphql } = require("federation-testing-tool");

test("Proper typeDefs for the extended Product in the Inventory service, allowing for querying inStock and resolving through Products service", async () => {
  const services = [
    {
      inventory: {
        ...inventory,
        underTest: true
      }
    },
    {
      products: {
        ...products,
        underTest: true
      }
    }
  ];

  const query = gql`
    query topProducts {
      topProducts {
        id
        inStock
      }
    }
  `;

  const result = await executeGraphql({ query, services });

  expect(result.errors && result.errors[0]).toBeUndefined();
});
