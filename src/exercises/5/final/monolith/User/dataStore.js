exports.users = {
  getById: userId => usersData.find(user => user.id === userId),
  getMe: () => usersData[0]
};

const usersData = [
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
