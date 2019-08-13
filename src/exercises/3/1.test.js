// 3/1.test.js

// !!! Comment out line number 5 below and uncomment the line number 6 to start the exercise.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// For this test to pass you have to edit two files:
// 1) ./toBeChanged/inventory/typeDefs.js
// 2) ./toBeChanged/inventory/resolvers.js

// You might want to add some console.log/breakpoints in resolvers and try to debug things on your own to make it all work.
// Things are supposed to be a little more difficult now, so don't worry if you don't solve it as quickly as the previous exercises.

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

test("Can use weight and price from Products service to estimate shipping costs in the Inventory service", async () => {
  const services = [{ inventory }, { products }];

  const query = gql`
    query topProducts {
      topProducts {
        id
        shippingEstimate
      }
    }
  `;

  const result = await executeGraphql({ query, services });

  expect(result.errors && result.errors[0]).toBeUndefined();

  const { topProducts } = result.data;
  expect(topProducts.find(p => p.id === "1").shippingEstimate).toEqual(50);
  expect(topProducts.find(p => p.id === "2").shippingEstimate).toEqual(0);
  expect(topProducts.find(p => p.id === "3").shippingEstimate).toEqual(25);
});
