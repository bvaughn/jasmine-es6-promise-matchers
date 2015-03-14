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
window.JasminePromisMatchers = new function() {
  var OriginalPromise;

  /**
   * Install the JasminePromisMatchers library.
   *
   * @param useMockClock If TRUE, promise matchers will automatically tick the clock to resolve pending Promises.
   */
  this.install = function(useMockClock) {
    this.useMockClock = useMockClock;

    OriginalPromise = window.Promise;

    window.Promise = ES6Promise.Promise;

    if (useMockClock) {
      jasmine.clock().install();
    }
  };

  /**
   * Uninstall the JasminePromisMatchers library.
   */
  this.uninstall = function() {
    window.Promise = OriginalPromise;

    if (this.useMockClock) {
      jasmine.clock().uninstall();
    }
  };
}();

beforeEach(function() {
  jasmine.addMatchers({
    toBeRejected: function() {
      return {
        compare: function(promise) {
          promise.then(
            function() {
              expect('Promise').toBe('rejected');
            },
            function() {});

          if (window.JasminePromisMatchers.useMockClock) {
            jasmine.clock().tick(1);
          }

          return { pass: true };
        }
      };
    },
    toBeRejectedWith: function() {
      return {
        compare: function(promise, expected) {
          promise.then(
            function() {
              expect('Promise').toBe('rejected');
            },
            function(actual) {
              expect(actual).toEqual(expected);
            });

          if (window.JasminePromisMatchers.useMockClock) {
            jasmine.clock().tick(1);
          }

          return { pass: true };
        }
      };
    },
    toBeResolved: function() {
      return {
        compare: function(promise) {
          promise.then(
            function() {},
            function() {
              expect('Promise').toBe('resolved');
            });

          if (window.JasminePromisMatchers.useMockClock) {
            jasmine.clock().tick(1);
          }

          return { pass: true };
        }
      };
    },
    toBeResolvedWith: function() {
      return {
        compare: function(promise, expected) {
          promise.then(
            function(actual) {
              expect(actual).toEqual(expected);
            },
            function() {
              expect('Promise').toBe('resolved');
            });

          if (window.JasminePromisMatchers.useMockClock) {
            jasmine.clock().tick(1);
          }

          return { pass: true };
        }
      };
    }
  });
});