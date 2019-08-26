// 6/2.test.js

// !!! Comment out line number 5 below and uncomment the line number 6 to start the exercise.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// For this exercise you have to change the:
// 1) ./toBeChanged/User/typeDefs.js

// Start by copying and pasting them from the existing monolith (./toBeChanged/monolith/User).
// DO NOT OVERWRITE THEM  (using cp command for example),
// Because You will find additional tips in the scaffold files already waiting in the ./toBeChanged/accounts folder.

// Do not change anything in the lines below!
//
//
const { accounts, monolith } = exerciseStarted
  ? require("./toBeChanged")
  : require("./final");

const { executeGraphql } = require("federation-testing-tool");
const { gql } = require("apollo-server");
const td = require("testdouble");

accounts.context = td.object(accounts.context);
monolith.context = td.object(monolith.context);
const services = [{ monolith }, { accounts }];

test("Can request User reviews by connecting data between the accounts service and the monolith", async () => {
  const AUTHOR_ID = "1";
  const AUTHOR = { name: "some name", id: AUTHOR_ID };

  td.when(accounts.context.users.getMe()).thenReturn(AUTHOR);

  td.when(accounts.context.users.getById(AUTHOR_ID)).thenReturn(AUTHOR);

  const REVIEWS_ARRAY = [{ body: "some body" }];
  td.when(monolith.context.reviews.getAllByAuthorId(AUTHOR_ID)).thenReturn(
    REVIEWS_ARRAY
  );

  const query = gql`
    query {
      me {
        name
        reviews {
          body
        }
      }
    }
  `;
  const result = await executeGraphql({
    query,
    services
  });

  expect(result.errors && result.errors[0]).toBeUndefined();
  expect(result.data.me.name).toEqual(AUTHOR.name);
  expect(result.data.me.reviews).toEqual(REVIEWS_ARRAY);
});
