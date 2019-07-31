module.exports = {
  resolvers: {
    // 🐨 we need to implement the Product.__resolveReference here.

    // 📜 https://www.apollographql.com/docs/apollo-server/api/apollo-federation/#__resolvereference

    // 💰 if we used external service to resolve the product by id the code could look like this:
    //   Product: {
    //     __resolveReference: object => products.getById(object.id)
    //     }
    //   },
    // In our case we have to find the product in the products array.
    Query: {
      topProducts(_, args) {
        return products.slice(0, args.first);
      }
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
