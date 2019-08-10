/* eslint-disable no-unused-expressions,global-require */

// Make exerciseStarted true to start the exercise -
// comment out the first assignment of exerciseStarted, uncomment the second one

// For this test to pass you have to edit only toBeChanged/accounts/resolvers.js file.

const exerciseStarted = false;
// const exerciseStarted = true;

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

test("Can get the email info from accounts service while querying reviews", async () => {
  const reviewsQuery = gql`
    query {
      reviewsForProduct(productId: 1) {
        author {
          username
          email
        }
      }
    }
  `;

  const result = await executeGraphql({
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
          ...services.accounts,
          underTest: true
        }
      }
    ]
  });

  expect(result.errors && result.errors[0]).toBeUndefined();
  const { reviewsForProduct } = result.data;
  expect(reviewsForProduct).toEqual([
    { author: { username: "@ada", email: "ada@gmail.com" } },
    { author: { username: "@complete", email: "turing@ibm.com" } }
  ]);
});
