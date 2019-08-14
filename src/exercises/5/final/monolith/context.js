const { users } = require("./User/dataStore");
const { reviews } = require("./Review/dataStore");
const { products } = require("./Product/dataStore");

exports.context = { users, reviews, products };
