// comment out the first require statement and uncomment the second one to start the exercise
// For this test to pass you have to edit two files:
// 1) ./toBeChanged/inventory/typeDefs.js
// 2) ./toBeChanged/inventory/resolvers.js
// You might want to add some console.log in resolvers and try to debug things by your own to make it all work.

const { inventory, products } = require("./final");
// const { inventory, products } = require("./toBeChanged");

// Do not change anything in the lines below!
// Also - don't worry about understanding what's going on below, at least for now.
//
//
//

const gql = require("graphql-tag");
const { executeGraphql } = require("federation-testing-tool");

test("Can use weight and price from Products service to estimate shipping costs in the Inventory service", async () => {
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
