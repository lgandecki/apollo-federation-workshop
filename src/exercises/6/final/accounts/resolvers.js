exports.resolvers = {
  Query: {
    me(_, __, { users }) {
      return users.getMe();
    }
  },
  User: {
    __resolveObject(user, _, { users }) {
      return users.getById(user.id);
    }
  }
};
