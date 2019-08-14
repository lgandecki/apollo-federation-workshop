exports.resolvers = {
  Query: {
    me(_, __, { users }) {
      return users.getMe();
    }
  },
  User: {
    reviews(user, _, { reviews }) {
      return reviews.getAllByAuthorId(user.id);
    }
  }
};
