const { executeGraphql } = require("federation-testing-tool");
const { gql } = require("apollo-server");
const td = require("testdouble");
const accounts = require("./accounts/");

const usersContext = td.object(accounts.context);
const services = [{ accounts: { ...accounts, context: usersContext } }];

test("Request User name", async () => {
  const AUTHOR = { name: "some name" };
  td.when(usersContext.users.getMe()).thenReturn(AUTHOR);

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
