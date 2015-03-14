Jasmine Promise Matchers
================

Custom matchers for testing ES6 Promises with **[Jasmine 2.x](http://jasmine.github.io/)**.

This library is compatible with the **[ES6Promise polyfill library](https://github.com/jakearchibald/es6-promise)** if the current browser does not support ES6 Promises. (This means it will work with Phantom JS.)

# Installing

You can install with either NPM or Bower like so:

```shell
npm install jasmine-es6-promise-matchers
bower install jasmine-es6-promise-matchers
```

# Documentation

Testing promises should be simple. This library aims to make it so!

## Initializing the library

To use it, just install the library before your tests begin:

```js
beforeEach(function() {
  // `true` automatically ticks the Jasmine mock-clock for you after each assert.
  // `false` leaves the clock management up to you.
  // I recommend `true` unless your test involves other timing concerns.
  JasminePromisMatchers.install(true);
});
```

And uninstall it once your tests are over:

```js
afterEach(function() {
  JasminePromisMatchers.uninstall();
});
```

Now you're ready to start testing!

## Jasmine matchers

##### toBeRejected
Verify that a Promise is rejected!

```js
expect(promise).toBeRejected();
```

##### toBeRejectedWith
Verify that a Promise is rejected with a specific value:

```js
expect(promise).toBeRejectedWith('something');
```

##### toBeResolved
Verify that a Promise is resolved!

```js
expect(promise).toBeResolved();
```

##### toBeResolvedWith
Verify that a Promise is resolved with a specific value:

```js
expect(promise).toBeResolvedWith('something');
```

## Questions? Suggestions?

Open an issue or toss up a pull request if you'd like to see anything added to this library!