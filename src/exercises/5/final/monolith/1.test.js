const { executeGraphql } = require("federation-testing-tool");

const { mergeTypes, mergeResolvers } = require("merge-graphql-schemas");
const { gql } = require("apollo-server");
const { typeDefs: userTypeDefs } = require("./User/typeDefs");
const { resolvers: userResolvers } = require("./User/resolvers");
const { typeDefs: reviewTypeDefs } = require("./Review/typeDefs");
const { resolvers: reviewResolvers } = require("./Review/resolvers");
const { resolvers: productResolvers } = require("./Product/resolvers");
const { typeDefs: productTypeDefs } = require("./Product/typeDefs");

const { users } = require("./User/dataStore");
const { reviews } = require("./Review/dataStore");
const { products } = require("./Product/dataStore");

const typeDefs = gql`
  ${mergeTypes([userTypeDefs, reviewTypeDefs, productTypeDefs])}
`;

const resolvers = mergeResolvers([
  userResolvers,
  reviewResolvers,
  productResolvers
]);
const context = { users, reviews, products };
const service = { typeDefs, resolvers };

test("Request User name", async () => {
  const query = gql`
    query {
      me {
        name
      }
    }
  `;
  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({ data: { me: { name: "Ada Lovelace" } } });
});

test("Request Review body", async () => {
  const query = gql`
    query {
      reviewsForProduct(productId: 2) {
        body
      }
    }
  `;

  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({
    data: { reviewsForProduct: [{ body: "Too expensive." }] }
  });
});

test("Request User with Reviews", async () => {
  const query = gql`
    query {
      me {
        name
        reviews {
          body
        }
      }
    }
  `;
  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({
    data: {
      me: {
        name: "Ada Lovelace",
        reviews: [{ body: "Love it!" }, { body: "Too expensive." }]
      }
    }
  });
});

test("Request Review with User", async () => {
  const query = gql`
    query {
      reviewsForProduct(productId: 2) {
        body
        author {
          name
        }
      }
    }
  `;

  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({
    data: {
      reviewsForProduct: [
        { body: "Too expensive.", author: { name: "Ada Lovelace" } }
      ]
    }
  });
});

test("Request review for a product with the product", async () => {
  const query = gql`
    query {
      reviewsForProduct(productId: 2) {
        body
        author {
          name
        }
      }
    }
  `;

  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({
    data: {
      reviewsForProduct: [
        { body: "Too expensive.", author: { name: "Ada Lovelace" } }
      ]
    }
  });
});

test("Request review for a product with a product and reviews for it", async () => {
  const query = gql`
    query {
      reviewsForProduct(productId: 2) {
        body
        author {
          name
        }
        product {
          name
        }
      }
    }
  `;

  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({
    data: {
      reviewsForProduct: [
        {
          body: "Too expensive.",
          author: { name: "Ada Lovelace" },
          product: { name: "Couch" }
        }
      ]
    }
  });
});

test("Request user with reviews with product with reviews", async () => {
  const query = gql`
    query {
      reviewsForProduct(productId: 2) {
        body
        author {
          name
        }
        product {
          name
          reviews {
            body
          }
        }
      }
    }
  `;

  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({
    data: {
      reviewsForProduct: [
        {
          body: "Too expensive.",
          author: { name: "Ada Lovelace" },
          product: { name: "Couch", reviews: [{ body: "Too expensive." }] }
        }
      ]
    }
  });
});

test("Request product with its reviews", async () => {
  const query = gql`
    query {
      productById(productId: 2) {
        name
        reviews {
          body
        }
      }
    }
  `;

  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({
    data: {
      productById: { name: "Couch", reviews: [{ body: "Too expensive." }] }
    }
  });
});

test("Request product with its reviews with authors", async () => {
  const query = gql`
    query {
      productById(productId: 2) {
        name
        reviews {
          body
          author {
            name
          }
        }
      }
    }
  `;

  const result = await executeGraphql({
    query,
    service,
    context
  });

  expect(result).toEqual({
    data: {
      productById: {
        name: "Couch",
        reviews: [{ body: "Too expensive.", author: { name: "Ada Lovelace" } }]
      }
    }
  });
});
