exports.resolvers = {
  Query: {
    reviewsForProduct: (_, { productId }, { reviews }) => {
      return reviews.getAllByProductId(productId);
    }
  },
  Review: {
    author(review, _, { users }) {
      return users.getById(review.authorID);
    },
    product(review, _, { products }) {
      return products.getById(review.product.id);
    }
  },
  User: {
    reviews(user, _, { reviews }) {
      return reviews.getAllByAuthorId(user.id);
    }
  }
};
