// 2/2.test.js

// comment out the first require statement and uncomment the second one to start the exercise
// For this test to pass you have to edit only ./toBeChanged/inventory/resolvers.js

const { inventory, products } = require("./final"); // 🐨
// const { inventory, products } = require("./toBeChanged"); // 🐨

// Do not change anything in the lines below!
// Also - don't worry about understanding what's going on below, at least for now.
//
//
//

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
