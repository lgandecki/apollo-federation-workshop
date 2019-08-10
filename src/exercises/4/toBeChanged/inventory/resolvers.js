exports.resolvers = {
  Product: {
    shippingEstimate: object => {
      return estimateShipping(object);
    },
    __resolveReference: object => ({
      ...object,
      ...inventory.find(product => product.id === object.id)
    })
  }
};

const estimateShipping = ({ price, weight }) => {
  if (price > 1000) {
    return 0;
  }
  return weight / 2;
};

const inventory = [
  { id: "1", inStock: true },
  { id: "2", inStock: false },
  { id: "3", inStock: true }
];
