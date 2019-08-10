exports.resolvers = {
  Query: {
    reviewsForProduct: (_, { productId }) => {
      return reviews.filter(review => review.product.id === productId);
    }
  },
  Review: {
    author(review) {
      return { __typename: "User", id: review.authorID };
    }
  },
  User: {
    reviews(user) {
      return reviews.filter(review => review.authorID === user.id);
    },
    username(user) {
      const found = usernames.find(username => username.id === user.id);
      return found ? found.username : null;
    }
  },
  Product: {
    reviews(product) {
      return reviews.filter(review => review.product.id === product.id);
    }
  }
};

const usernames = [
  { id: "1", username: "@ada" },
  { id: "2", username: "@complete" }
];
const reviews = [
  {
    id: "1",
    authorID: "1",
    product: { id: "1" },
    body: "Love it!"
  },
  {
    id: "2",
    authorID: "1",
    product: { id: "2" },
    body: "Too expensive."
  },
  {
    id: "3",
    authorID: "2",
    product: { id: "3" },
    body: "Could be better."
  },
  {
    id: "4",
    authorID: "2",
    product: { id: "1" },
    body: "Prefer something else."
  }
];
