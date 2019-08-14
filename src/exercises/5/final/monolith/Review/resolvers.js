exports.resolvers = {
  Query: {
    reviewsForProduct: (_, { productId }, { reviews }) => {
      return reviews.filter(review => review.product.id === productId);
    }
  },
  Review: {
    author(review, _, { users }) {
      return users.find(user => user.id === review.authorID);
    },
    product(review, _, { products }) {
      return products.find(product => product.id === review.product.id);
    }
  }
};
