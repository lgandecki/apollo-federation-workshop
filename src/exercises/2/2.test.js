// 2/2.test.js

// !!! Comment out line number 5 below and uncomment the line number 6 to start the exercise.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// For this test to pass you have to edit only ./toBeChanged/inventory/resolvers.js

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

test("Correct __resolveReference implementation for Inventory Product definition that allows looking up the inStock field", async () => {
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

  const { topProducts } = result.data;
  expect(topProducts.find(p => p.id === "1").inStock).toEqual(true);
  expect(topProducts.find(p => p.id === "2").inStock).toEqual(false);
  expect(topProducts.find(p => p.id === "3").inStock).toEqual(true);
});
