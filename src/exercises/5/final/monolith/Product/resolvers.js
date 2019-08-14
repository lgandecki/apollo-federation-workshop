exports.resolvers = {
  Query: {
    productById(_, { productId }, { products }) {
      return products.find(product => product.id === productId);
    }
  },
  Product: {
    reviews(product, _, { reviews }) {
      return reviews.filter(review => review.product.id === product.id);
    }
  }
};
