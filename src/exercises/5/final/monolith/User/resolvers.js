exports.resolvers = {
  Query: {
    me(_, __, { users }) {
      return users[0];
    }
  },
  User: {
    reviews(user, _, { reviews }) {
      return reviews.filter(review => review.authorID === user.id);
    }
  }
};
