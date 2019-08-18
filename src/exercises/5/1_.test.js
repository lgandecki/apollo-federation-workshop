// !!! Comment out line number 5 below and uncomment the line number 6 to start the exercise.

const exerciseStarted = false; // 🐨
// const exerciseStarted = true; // 🐨

// For this exercise you have to fill the:
// 1) ./toBeChanged/accounts/dataStore.js
// 2) ./toBeChanged/accounts/typeDefs.js
// 3) ./toBeChanged/accounts/resolvers.js

// Start by copying and pasting them from the existing monolith (./toBeChanged/monolith/User).
// DO NOT OVERWRITE THEM  (using cp command for example),
// Because You will find additional tips in the scaffold files already waiting in the ./toBeChanged/accounts folder.

// Do not change anything in the lines below!
//
//
const { accounts } = exerciseStarted
  ? require("./toBeChanged")
  : require("./final");

const { executeGraphql } = require("federation-testing-tool");
const { gql } = require("apollo-server");
const td = require("testdouble");

accounts.context = td.object(accounts.context);
const services = [{ accounts }];

test("Can request User name from the accounts service working as a standalone GraphQL service", async () => {
  const AUTHOR = { name: "some name" };
  td.when(accounts.context.users.getMe()).thenReturn(AUTHOR);

  const query = gql`
    query {
      me {
        name
      }
    }
  `;
  const result = await executeGraphql({
    query,
    services
  });

  expect(result).toEqual({ data: { me: AUTHOR } });
});
