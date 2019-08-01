exports.resolvers = {
  Product: {
    __resolveReference: object => ({
      ...inventory.find(product => product.id === object.id)
    })
  }
};

const inventory = [
  { id: "1", inStock: true },
  { id: "2", inStock: false },
  { id: "3", inStock: true }
];
