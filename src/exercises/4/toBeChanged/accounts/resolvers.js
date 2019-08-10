exports.resolvers = {
  Query: {
    me() {
      return users[0];
    }
  }
  // 🐨 we need to implement the User.__resolveReference here.

  // 💰 take a look at exercises/1/toBeChanged/products/resolvers.js for inspiration
};

const users = [
  {
    id: "1",
    name: "Ada Lovelace",
    birthDate: "1815-12-10",
    username: "@ada"
  },
  {
    id: "2",
    name: "Alan Turing",
    birthDate: "1912-06-23",
    username: "@complete"
  }
];
