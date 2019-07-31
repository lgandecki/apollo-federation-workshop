// comment out the first require statement and uncomment the second one to start the exercise
// For this test to pass you have to edit only ./toBeChanged/products/resolvers.js

const { resolvers, typeDefs } = require("./final/products");
// const { resolvers, typeDefs } = require("./toBeChanged/products");

// Do not change anything in the lines below!
// Also - don't worry about understanding what's going on below, at least for now.
//
//
//

const gql = require("graphql-tag");
const { executeGraphql } = require("federation-testing-tool");

test("Can resolve the Product data in the Product service to be used by other services", async () => {
  const inventoryTypeDefs = gql`
    extend type Product @key(fields: "id") {
      id: ID! @external
      weight: Int @external
      price: Int @external
      inStock: Boolean
      shippingEstimate: Int @requires(fields: "price weight")
    }
  `;

  const inventoryResolvers = {
    Product: {
      shippingEstimate: object => {
        if (!object.weight || !object.price) {
          throw new Error(
            "Products service didn't provide the weight and price. Make sure you have the Product.__resolveReference resolver implemented"
          );
        }
        return 100;
      }
    }
  };
  const services = [
    {
      inventory: {
        typeDefs: inventoryTypeDefs,
        resolvers: inventoryResolvers,
        underTest: true
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
        shippingEstimate
      }
    }
  `;

  const result = await executeGraphql({ query, services });

  expect(result.errors && result.errors[0]).toBeUndefined();
  expect(result.data.topProducts[0].shippingEstimate).toEqual(100);
});
