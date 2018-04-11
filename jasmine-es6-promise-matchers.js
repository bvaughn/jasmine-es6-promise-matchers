/**
 * Matcher helpers for tests involving Promises.
 *
 * <p>Note that this library depends on the ES6Promise polyfill library.
 * @see https://github.com/jakearchibald/es6-promise
 *
 * @example
 * expect(promise).toBeRejected();
 * expect(promise).toBeRejectedWith(someValue);
 * expect(promise).toBeResolved();
 * expect(promise).toBeResolvedWith(someValue);
 */

(typeof window === 'undefined' ? global : window).JasminePromiseMatchers = new function() {

  var windowOrGlobal = typeof window === 'undefined' ? global : window;

  var OriginalPromise;

  /**
   * Install the JasminePromiseMatchers library.
   */
  this.install = function() {
    OriginalPromise = windowOrGlobal.Promise;

    // Polyfill if necessary for browsers like Phantom JS.
    windowOrGlobal.Promise = windowOrGlobal.Promise || ES6Promise.Promise;
  };

  /**
   * Uninstall the JasminePromiseMatchers library.
   */
  this.uninstall = function() {
    windowOrGlobal.Promise = OriginalPromise;
  };

  var PROMISE_STATE = {
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
  };

  function isError(value) {
    return value instanceof Error;
  }

  function isAsymmetric(value) {
    return value.asymmetricMatch instanceof Function;
  }

  var verifyData = function(actualData, expectedData) {
    if (expectedData === undefined) {
      return { pass: true };
    }

    if (isError(actualData) && isError(expectedData)) {
        actualData = String(actualData);
        expectedData = String(expectedData);
    }

    if (isAsymmetric(expectedData)) {
      return {
        pass: expectedData.asymmetricMatch(actualData),
        message: 'Expected "' + actualData + '" to contain "' + expectedData + '"'
      };
    }

    return {
      pass: actualData === expectedData,
      message: 'Expected "' + actualData + '" to be "' + expectedData + '"'
    };
  };

  var verifyState = function(actualState, expectedState) {
    return {
      pass: actualState === expectedState,
      message: 'Expected promise to be ' + expectedState + ' but it was ' + actualState + ' instead'
    };
  };

  // Helper method to verify expectations and return a Jasmine-friendly info-object
  var verifyPromiseExpectations = function(done, promise, expectedState, expectedData, isNegative) {
    function verify(promiseState) {
      return function(data) {
        var test = verifyState(promiseState, expectedState);

        if (test.pass) {
          test = verifyData(data, expectedData);
        }

        if (!test.pass && !isNegative) {
          done.fail(new Error(test.message));
          return;
        }

        done();
      }
    }

    promise.then(
      verify(PROMISE_STATE.RESOLVED),
      verify(PROMISE_STATE.REJECTED)
    );

    return { pass: true };
  };

  // Install the matchers
  beforeEach(function() {
    jasmine.addMatchers({
      toBeRejected: function() {
        return {
          compare: function(promise, done) {
            return verifyPromiseExpectations(done, promise, PROMISE_STATE.REJECTED);
          }
        };
      },
      toBeRejectedWith: function() {
        return {
          compare: function(promise, expectedData, done) {
            return verifyPromiseExpectations(done, promise, PROMISE_STATE.REJECTED, expectedData);
          },

          negativeCompare: function (promise, expectedData, done) {
            return verifyPromiseExpectations(done, promise, PROMISE_STATE.REJECTED, expectedData, true);
          }
        };
      },
      toBeResolved: function() {
        return {
          compare: function(promise, done) {
            return verifyPromiseExpectations(done, promise, PROMISE_STATE.RESOLVED);
          }
        };
      },
      toBeResolvedWith: function() {
        return {
          compare: function(promise, expectedData, done) {
            return verifyPromiseExpectations(done, promise, PROMISE_STATE.RESOLVED, expectedData);
          }
        };
      }
    });
  });
}();