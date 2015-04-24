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
window.JasminePromiseMatchers = new function() {
  var OriginalPromise;

  /**
   * Install the JasminePromiseMatchers library.
   */
  this.install = function() {
    OriginalPromise = window.Promise;

    // Polyfill if necessary for browsers like Phantom JS.
    window.Promise = window.Promise || ES6Promise.Promise;
  };

  /**
   * Uninstall the JasminePromiseMatchers library.
   */
  this.uninstall = function() {
    window.Promise = OriginalPromise;
  };

  var PROMISE_STATE = {
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
  };

  var verifyData = function(actualData, expectedData, done) {
    if (expectedData !== undefined) {
      if (expectedData.asymmetricMatch instanceof Function) {
        if (!expectedData.asymmetricMatch(actualData)) {
          done.fail('Expected ' + actualData + ' to contain ' + expectedData);
        }
      } else if (actualData !== expectedData) {
        done.fail('Expected ' + actualData + ' to be ' + expectedData);
      }
    }
  };

  var verifyState = function(actualState, expectedState, done) {
    if (actualState !== expectedState) {
      done.fail('Expected ' + actualState + ' to be ' + expectedState);
    }
  };

  // Helper method to verify expectations and return a Jasmine-friendly info-object
  var verifyPromiseExpectations = function(done, promise, expectedState, expectedData) {
    promise.then(
      function(data) {
        verifyState(PROMISE_STATE.RESOLVED, expectedState, done);
        verifyData(data, expectedData, done);
        done();
      },
      function(data) {
        verifyState(PROMISE_STATE.REJECTED, expectedState, done);
        verifyData(data, expectedData, done);
        done();
      });

    return {pass: true};
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