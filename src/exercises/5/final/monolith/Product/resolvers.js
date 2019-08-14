exports.resolvers = {
  Query: {
    productById(_, { productId }, { products }) {
      return products.getById(productId);
    }
  },
  Product: {
    reviews(product, _, { reviews }) {
      return reviews.getAllByProductId(product.id);
    }
  }
};
