Jasmine Promise Matchers
================

Custom matchers for testing ES6 Promises with **[Jasmine 2.x](http://jasmine.github.io/)**.

**NOTE: This library expects ES6 `Promise` feature to be present.**

If you're testing in an old environment, e.g. PhantomJS, you need to load a polyfill.

# Installing

You can install with either NPM or Bower like so:

```shell
npm i -D jasmine-es6-promise-matchers
bower install jasmine-es6-promise-matchers
```

# Overview

Using the Jasmine matchers provided by this extension allows a simpler and cleaner flow of unit tests.

**Before:**

This is not only harded to read, but also unstable. If the promise is never resolved, the tests hang for a long timeout.

```js
describe('test', function() {
  it('should resolve to something', function(done) {
    function assert(value) {
      expect(value).toBe('something');
      done();
    }

    const promise = something.withPromise();
    promise.then(assert, done.fail);
  });
});
```

**After:**

Using the matchers provided by this library your tests could instead look like this:

```js
describe('test', function() {
  it('should resolve to something', function(done) {
    const promise = something.withPromise();
    expect(promise).toBeResolvedWith('something', done);
  });
});

```

## Using the matchers

This library includes a couple of matchers, as shown below.

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
