exports.resolvers = {
  Product: {
    __resolveReference: object =>
      products.find(product => product.id === object.id)
  },
  Query: {
    topProducts(_, args) {
      return products.slice(0, args.first);
    }
  }
};

const products = [
  {
    id: "1",
    name: "Table",
    price: 899,
    weight: 100
  },
  {
    id: "2",
    name: "Couch",
    price: 1299,
    weight: 1000
  },
  {
    id: "3",
    name: "Chair",
    price: 54,
    weight: 50
  }
];
