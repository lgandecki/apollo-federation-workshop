/* eslint-disable no-unused-expressions,global-require */

// !!! Comment out line number 5 below and uncomment the line number 6 to start the exercise.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// Take a look at the expectedProductDataShape const, and the test that's already passing.
// To have the data in the shape we want, we currently have to execute two separate queries.
// This is not "The GraphQL way". We will have to change:
// 1) ./toBeChanged/reviews/typeDefs.js (look for the hints marked test 1)
// 2) ./toBeChanged/accounts/typeDefs.js
// 3) ./toBeChanged/accounts/resolvers.js
// Note, the reviews resolvers can stay exactly as is, even though we are connecting it to the rest of the graph!
// How cool is that?

// If you don't know where to start, drive it with tests - the errors should tell you what to do next.

// Do not change anything in the lines below!
//
//

const { inventory, products, accounts, reviews } = exerciseStarted
  ? require("./toBeChanged")
  : require("./final");

const { gql } = require("apollo-server");
const { executeGraphql } = require("federation-testing-tool");

const initialServices = [{ inventory }, { products }, { accounts }];

const finalServices = [...initialServices, { reviews }];

const expectedProductDataShape = {
  // These two from Products service
  name: "Table",
  price: 899,
  // this one from inventory service
  inStock: true,
  // this array of reviews from reviews service
  reviews: [
    {
      author: { username: "@ada" },
      body: "Love it!"
    },
    {
      author: { username: "@complete" },
      body: "Prefer something else."
    }
  ]
};

!exerciseStarted &&
  test("Can get the needed shape of data by executing two queries", async () => {
    const productQuery = gql`
      query topProduct {
        topProducts(first: 1) {
          id
          name
          price
          inStock
        }
      }
    `;

    const productResult = await executeGraphql({
      query: productQuery,
      services: initialServices
    });

    expect(productResult.errors && productResult.errors[0]).toBeUndefined();

    const productData = productResult.data.topProducts[0];

    const reviewsQuery = gql`
      query reviewsForProduct($productId: ID!) {
        reviewsForProduct(productId: $productId) {
          body
          author {
            username
          }
        }
      }
    `;

    const reviewsResult = await executeGraphql({
      query: reviewsQuery,
      service: reviews,
      variables: { productId: productData.id }
    });

    expect(reviewsResult.errors && reviewsResult.errors[0]).toBeUndefined();
    const { reviewsForProduct } = reviewsResult.data;

    const finalData = { ...productData, reviews: reviewsForProduct };
    delete finalData.id;

    expect(finalData).toEqual(expectedProductDataShape);
  });

test("Can get the needed shape of data by executing only one query", async () => {
  const productQuery = gql`
    query topProduct {
      topProducts(first: 1) {
        name
        price
        inStock
        reviews {
          author {
            username
          }
          body
        }
      }
    }
  `;

  const productResult = await executeGraphql({
    query: productQuery,
    services: finalServices
  });

  expect(productResult.errors && productResult.errors[0]).toBeUndefined();

  const productData = productResult.data.topProducts[0];

  expect(productData).toEqual(expectedProductDataShape);
});
