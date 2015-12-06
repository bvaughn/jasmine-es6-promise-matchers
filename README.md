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

# Overview

Testing promises should be simple but it's normally a bit of a hassle. Your tests probably look something like this:

```js
function(done) {
  promise.then(
    function(value) {
      expect(value).toBe('something');
      done();
    },
    done.fail);
```

Using the matchers provided by this library your tests could instead look like this:

```js
function(done) {
  expect(promise).toBeResolvedWith('something', done);
}
```

## Initializing the library

To use it, just install the library before your tests begin:

```js
beforeEach(JasminePromiseMatchers.install);
```

And uninstall it once your tests are over:

```js
afterEach(JasminePromiseMatchers.uninstall);
```

Now you're ready to start testing!

## Using the matchers

This library includes a couple of matchers, shown below.

##### toBeRejected(done:Function)
Verify that a Promise is (or will be) rejected.

```js
expect(promise).toBeRejected(done);
```

##### toBeRejectedWith(data:*, done:Function)
Verify that a Promise is rejected with a specific value.

```js
expect(promise).toBeRejectedWith('something', done);

// Asymmetric matching is also supported for objects:
var partialMatch = jasmine.objectContaining({partial: 'match'});
expect(promise).toBeRejectedWith(partialMatch, done);
```

##### toBeResolved(done:Function)
Verify that a Promise is resolved.

```js
expect(promise).toBeResolved(done);
```

##### toBeResolvedWith(data:*, done:Function)
Verify that a Promise is resolved with a specific value.

```js
expect(promise).toBeResolvedWith('something', done);

// Asymmetric matching is also supported for objects:
var partialMatch = jasmine.objectContaining({partial: 'match'});
expect(promise).toBeResolvedWith(partialMatch, done);
```

## Questions? Suggestions?

Open an issue or toss up a pull request if you'd like to see anything added to this library!
