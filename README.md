# Apollo Gateway / Federated Services workshop

Hello, welcome to the workshop. Feel free to open github issues if you have any questions or problems. This is an early version of the workshop, I hope to polish it up with your guys help!

If you or your company is interested in having me do the workshop for you, please contact me at lgandecki@thebrain.pro .


## System Requirements

- [git][git] v2 or greater
- [NodeJS][node] v8 or greater
- [yarn][yarn] v1 or greater (or [npm][npm] v6 or greater)

All of these must be available in your `PATH`. To verify things are set up properly, you can run this:

```shell
git --version
node --version
yarn --version # or npm --version
```

If you have trouble with any of these, learn more about the PATH environment variable and how to fix it here for [windows][win-path] or [mac/linux][mac-path].

## Setup

```shell
git clone https://github.com/lgandecki/apollo-federation-workshop

cd apollo-federation-workshop
npm install
```


## Running the tests

```shell
npm test
```

This will start [Jest](http://facebook.github.io/jest) in watch mode. Read the output and play around with it.


## Working through it

This a very exercise-heavy workshop. You'll find the exercises in the
`src/exercises` directory. In each exercise you will find two folders:

- `final/` - to compare your solution, or to get inspiration if you get stuck (but please DON'T peek there unless you really are stuck)
- `toBeChanged/` -  where you will do all your changes (note: you won't have to change all of the files, but they all together make a working service that you could start up at any time, if you wanted)

Both of these will have folders inside with services, named after them. For example `final/products`.

At the top level you should also see a `.md` file, that will give you a brief introduction to the exercise.

To start an exercise open appropriate test file in your exercise. Do them in order (`1.test.js` and then `2.test.js`). Subsequent test might not work correctly unless the previous one is green. All the tests are located in the top level of your exercise.

Follow the instructions in the test file and the files the test advises you to change. Do not change internals of the tests although you are welcome to look around to understand how things get tested, and to debug (you can add console.logs but make sure they only log information, make sure you don't mutate anything).  

**Your goal will be to go into each test, swap the final version for the
exercise version in the import, and make the tests pass**

## Helpful Emoji 🐨 💰 💯 🦉 📜 

Each exercise has comments in it to help you get through the exercise. These fun
emoji characters are here to help you.

- **Kody the Koala Bear** 🐨 will tell you when there's something specific you should do
    
- **Marty the Money Bag** 💰 will give you specific tips (and sometimes code) along the way
- **Hannah the Hundred** 💯 will give you extra challenges you can do if you finish the exercises early.
- **Olivia the Owl** 🦉 will give you useful tidbits/best practice notes and a link for elaboration and feedback.
- **Dominic the Document** 📜 will give you links to useful documentation


## Credit

You might recognize that the format looks suspiciously similar to the [Kent C Dodds](https://kentcdodds.com/)'s' workshops. That's not an accident - it is based on it (the format, not the content). I believe Kent has done a really fantastic job figuring out how to teach JavaScript related topics in an engaging and modern way. At the same time I recognize that many people that might take a look at this workshop might have seen/worked through at least one of his already, so they will welcome the similarity. 


[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[yarn]: https://yarnpkg.com/
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592

