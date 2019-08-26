// 6/1.test.js

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
const services = [{ monolith }, { accounts }];

test("Can request User name from the accounts service working as a part of a connected graph", async () => {
  const AUTHOR_ID = "1";
  const AUTHOR = { name: "some name", id: AUTHOR_ID };
  td.when(accounts.context.users.getMe()).thenReturn(AUTHOR);
  td.when(accounts.context.users.getById(AUTHOR_ID)).thenReturn(AUTHOR);

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

  expect(result.errors && result.errors[0]).toBeUndefined();
  expect(result).toEqual({ data: { me: { name: AUTHOR.name } } });
});
