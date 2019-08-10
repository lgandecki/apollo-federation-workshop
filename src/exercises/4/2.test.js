/* eslint-disable no-unused-expressions,global-require */

// comment out the first assignment of exerciseStarted, uncomment the second one to start the exercise

// For this test to pass you have to edit only toBeChanged/reviews/typeDefs.js file.
// Look for the comments marked as (test 2) at the bottom of the file for instructions.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// Do not change anything in the lines below!
//
//

let services;

if (exerciseStarted) {
  services = require("./toBeChanged");
} else {
  services = require("./final");
}

const { gql } = require("apollo-server");
const { executeGraphql } = require("federation-testing-tool");

const service = {
  ...services.reviews
};

test("Can get the username directly from the reviews service, without breaking the rest of the graph", async () => {
  const reviewsQuery = gql`
    query {
      reviewsForProduct(productId: 1) {
        author {
          username
        }
      }
    }
  `;

  const reviewsResult = await executeGraphql({
    query: reviewsQuery,
    service
  });

  expect(reviewsResult.errors && reviewsResult.errors[0]).toBeUndefined();
  const { reviewsForProduct } = reviewsResult.data;
  expect(reviewsForProduct).toEqual([
    { author: { username: "@ada" } },
    { author: { username: "@complete" } }
  ]);

  await executeGraphql({
    query: reviewsQuery,
    service: [
      {
        products: {
          ...services.products
        }
      },
      {
        reviews: {
          ...services.reviews
        }
      },
      {
        accounts: {
          ...services.accounts
        }
      }
    ]
  });
});
