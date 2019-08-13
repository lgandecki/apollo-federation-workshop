exports.resolvers = {
  Product: {
    // 🐨 Add shippingEstimate resolver here. Use the provided estimateShipping function, and pass to it an object with price and weight.
    // The first argument to the shippingEstimate resolver function will be an object resolved by the __resolveReference function below.
    // There is one more thing you will have to change in this file. Can you spot it?

    // 💰 you can start with this function. Do you have all the required data?
    // shippingEstimate: object => {
    // console.log(object);
    // },

    // 💰 Take a look at the shape of the initial object here. Do we have weight and price available to use? Then think about what we return.
    __resolveReference: object => {
      return {
        ...inventory.find(product => product.id === object.id)
      };
    }
  }
};

// 💯 (extra credit) Move this helper to another file and write unit tests for it.
// Think about testing the GraphQL layer. Take a look at the implementation of 1.test.js. How can you avoid this kind of coupling of your high-level tests to the details of the business logic for the shipping calculations?
// 🦉 Your GraphQL tests should be independent of underlying business logic. In other words - if the rules for shipping changes, only the unit tests for estimateShipping should change.

// eslint-disable-next-line no-unused-vars
const estimateShipping = ({ price, weight }) => {
  if (price > 1000) {
    return 0;
  }
  return weight / 2;
};

const inventory = [
  { id: "1", inStock: true },
  { id: "2", inStock: false },
  { id: "3", inStock: true }
];
