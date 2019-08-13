// 2/1.test.js

// !!! Comment out line number 5 below and uncomment the line number 6 to start the exercise.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// For this test to pass you have to edit only ./toBeChanged/inventory/typeDefs.js

// Do not change anything in the lines below!
// Also - don't worry about understanding what's going on below, at least for now.
//
//
//

const { inventory, products } = exerciseStarted
  ? require("./toBeChanged")
  : require("./final");

const gql = require("graphql-tag");
const { executeGraphql } = require("federation-testing-tool");

test("Proper typeDefs for the extended Product in the Inventory service, allowing for querying inStock and resolving through Products service", async () => {
  const services = [{ inventory }, { products }];

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
