/* eslint-disable no-unused-expressions,global-require */

// !!! Comment out line number 5 below and uncomment the line number 6 to start the exercise.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// For this test to pass you have to edit only toBeChanged/reviews/typeDefs.js file.
// Look for the comments marked as (test 2) at the bottom of the file for instructions.

// Do not change anything in the lines below!
//
//

const { products, accounts, reviews } = exerciseStarted
  ? require("./toBeChanged")
  : require("./final");

const { gql } = require("apollo-server");
const { executeGraphql } = require("federation-testing-tool");

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
    service: reviews
  });

  expect(reviewsResult.errors && reviewsResult.errors[0]).toBeUndefined();
  const { reviewsForProduct } = reviewsResult.data;
  expect(reviewsForProduct).toEqual([
    { author: { username: "@ada" } },
    { author: { username: "@complete" } }
  ]);

  await executeGraphql({
    query: reviewsQuery,
    services: [{ products }, { reviews }, { accounts }]
  });
});
