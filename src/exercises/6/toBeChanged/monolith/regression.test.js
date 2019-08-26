test.skip("", () => {});
// // XXX This test should only be switched at the very end when everything should be working properly.
// // At this point we switch the contexts, to use the ones from micro services, and we use multiple services instead of one service.
// // Let's revisit this at the end of this chapter.
//
// const { executeGraphql } = require("federation-testing-tool");
// const { gql } = require("apollo-server");
// const td = require("testdouble");
//
// const { typeDefs } = require("./typeDefs");
// const { resolvers } = require("./resolvers");
// const { context: realContext } = require("./context");
// const accounts = require("../accounts");
//
// const context = td.object(realContext);
// const usersContext = accounts.context.users
//   ? td.object(accounts.context.users)
//   : context.users;
//
// console.log("GOZDECKI usersContext", usersContext.users);
// const services = [
//   { monolith: { typeDefs, resolvers } },
//   { accounts, context: usersContext }
// ];
//
// let PRODUCT_ID;
// let AUTHOR_ID;
// let ARRAY_OF_REVIEWS;
// let NAME;
// let AUTHOR;
// let PRODUCT;
// beforeEach(() => {
//   td.reset();
//   PRODUCT_ID = "someID";
//   AUTHOR_ID = "1";
//   NAME = "some name";
//   ARRAY_OF_REVIEWS = [
//     {
//       authorID: AUTHOR_ID,
//       body: "Too expensive.",
//       product: { id: PRODUCT_ID }
//     }
//   ];
//
//   td.when(context.reviews.getAllByProductId(PRODUCT_ID)).thenReturn(
//     ARRAY_OF_REVIEWS
//   );
//
//   td.when(context.reviews.getAllByProductId(PRODUCT_ID)).thenReturn(
//     ARRAY_OF_REVIEWS
//   );
//
//   AUTHOR = { name: NAME };
//   td.when(usersContext.getById(AUTHOR_ID)).thenReturn(AUTHOR);
//
//   PRODUCT = { name: "product name", id: PRODUCT_ID };
//   td.when(context.products.getById(PRODUCT_ID)).thenReturn(PRODUCT);
// });
//
// test("Request User name", async () => {
//   td.when(usersContext.getMe()).thenReturn({ name: NAME });
//
//   const query = gql`
//     query {
//       me {
//         name
//       }
//     }
//   `;
//   const result = await executeGraphql({
//     query,
//     service: services,
//     context
//   });
//
//   expect(result).toEqual({ data: { me: { name: NAME } } });
// });
//
// test("Request Review body", async () => {
//   // const PRODUCT_ID = "someId";
//   // const ARRAY_OF_REVIEWS = [{ body: "some review body" }];
//   // td.when(context.reviews.getAllByProductId(PRODUCT_ID)).thenReturn(
//   //   ARRAY_OF_REVIEWS
//   // );
//
//   const query = gql`
//     query {
//       reviewsForProduct(productId: "${PRODUCT_ID}") {
//         body
//       }
//     }
//   `;
//
//   const result = await executeGraphql({
//     query,
//     service: services,
//     context
//   });
//
//   expect(result).toEqual({
//     data: {
//       reviewsForProduct: [
//         {
//           body: ARRAY_OF_REVIEWS[0].body
//         }
//       ]
//     }
//   });
// });
//
// test("Request User with Reviews", async () => {
//   const MY_NAME = "Ada Lovelace";
//   const USER_ID = "someUserId";
//   td.when(usersContext.getMe()).thenReturn({ id: USER_ID, name: MY_NAME });
//
//   td.when(context.reviews.getAllByAuthorId(USER_ID)).thenReturn(
//     ARRAY_OF_REVIEWS
//   );
//
//   const query = gql`
//     query {
//       me {
//         name
//         reviews {
//           body
//         }
//       }
//     }
//   `;
//   const result = await executeGraphql({
//     query,
//     service: services,
//     context
//   });
//
//   expect(result).toEqual({
//     data: {
//       me: {
//         name: MY_NAME,
//         reviews: [{ body: ARRAY_OF_REVIEWS[0].body }]
//       }
//     }
//   });
// });
//
// test("Request Review with Author's name", async () => {
//   const query = gql`
//     query {
//       reviewsForProduct(productId: "${PRODUCT_ID}") {
//         body
//         author {
//           name
//         }
//       }
//     }
//   `;
//
//   const result = await executeGraphql({
//     query,
//     service: services,
//     context
//   });
//
//   expect(result).toEqual({
//     data: {
//       reviewsForProduct: [{ body: ARRAY_OF_REVIEWS[0].body, author: AUTHOR }]
//     }
//   });
// });
//
// test("Request review for a product with a product and reviews for it", async () => {
//   const query = gql`
//     query {
//       reviewsForProduct(productId: "${PRODUCT_ID}") {
//         body
//         author {
//           name
//         }
//         product {
//           name
//         }
//       }
//     }
//   `;
//
//   const result = await executeGraphql({
//     query,
//     service: services,
//     context
//   });
//
//   expect(result).toEqual({
//     data: {
//       reviewsForProduct: [
//         {
//           body: ARRAY_OF_REVIEWS[0].body,
//           author: AUTHOR,
//           product: { ...PRODUCT, id: undefined }
//         }
//       ]
//     }
//   });
// });
//
// test("Request user with reviews with product with reviews", async () => {
//   const query = gql`
//     query {
//       reviewsForProduct(productId: "${PRODUCT_ID}") {
//         body
//         author {
//           name
//         }
//         product {
//           name
//           reviews {
//             body
//           }
//         }
//       }
//     }
//   `;
//
//   const result = await executeGraphql({
//     query,
//     service: services,
//     context
//   });
//
//   const review = result.data.reviewsForProduct[0];
//
//   expect(review.product.reviews).toEqual([{ body: "Too expensive." }]);
//
//   expect(review).toMatchObject({
//     body: "Too expensive.",
//     author: { name: "some name" },
//     product: { name: "product name" }
//   });
// });
//
// test("Request product with its reviews", async () => {
//   const query = gql`
//     query {
//       productById(productId: "${PRODUCT_ID}") {
//         name
//         reviews {
//           body
//         }
//       }
//     }
//   `;
//
//   const result = await executeGraphql({
//     query,
//     service: services,
//     context
//   });
//
//   expect(result).toEqual({
//     data: {
//       productById: {
//         name: "product name",
//         reviews: [{ body: "Too expensive." }]
//       }
//     }
//   });
// });
//
// test("Request product with its reviews with authors", async () => {
//   const query = gql`
//     query {
//       productById(productId: "${PRODUCT_ID}") {
//         name
//         reviews {
//           body
//           author {
//             name
//           }
//         }
//       }
//     }
//   `;
//
//   const result = await executeGraphql({
//     query,
//     service: services,
//     context
//   });
//
//   expect(result).toEqual({
//     data: {
//       productById: {
//         name: "product name",
//         reviews: [{ body: "Too expensive.", author: { name: "some name" } }]
//       }
//     }
//   });
// });
