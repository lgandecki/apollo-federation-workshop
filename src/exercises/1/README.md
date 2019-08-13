## Exercise 1

We start with a simple, standalone *products* GraphQL service. We want to turn it into a federated service, that could be used by Apollo Gateway. 

What we will be working through is the first step (lines 1, 2, 3) towards using this service in a data flow as following in the next exercise:

![dataflow](./1.png)

### How to start

Open ./1.test.js , comment line 5 and uncomment line 6.
Make sure that either:
- jest is running `npm test`
- [wallabyjs](https://wallabyjs.com/docs/intro/install.html#jetbrains-ides) is running ([starting recently there is no need for a separate configuration file!](https://wallabyjs.com/docs/intro/config.html#automatic-configuration)). Highly recommended!
- If you prefer not to use command line - start the test in a watch mode in your IDE. You should be able to see changing errors from jest while doing your changes.

Once you are done with `1.test.js` go to `2.test.js` and repeat the steps.

### New Syntax
In this section you will learn about `__resolveReference` function, `@key` annotation
