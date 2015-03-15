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
   *
   * @param useMockClock Promise matchers should automatically initialize the Jasmine mock-clock
   *                     and expectation functions should tick the clock to resolve pending Promises.
   *                     Defaults to true.
   */
  this.install = function(useMockClock) {
    this.useMockClock_ = useMockClock !== false;

    OriginalPromise = window.Promise;

    // Polyfill if necessary for browsers like Phantom JS.
    window.Promise = window.Promise || ES6Promise.Promise;

    if (this.useMockClock_) {
      jasmine.clock().install();
    }
  };

  /**
   * Uninstall the JasminePromiseMatchers library.
   */
  this.uninstall = function() {
    window.Promise = OriginalPromise;

    if (this.useMockClock_) {
      jasmine.clock().uninstall();
    }
  };

  this.maybeTickClockAndCompleteCompare_ = function(promiseResolution, message) {
    if (this.useMockClock_) {
      jasmine.clock().tick(1);

      if (!promiseResolution.valid) {
        return {
          message: message,
          pass: false
        };
      }
    }

    return {
      pass: true
    };
  };
}();

beforeEach(function() {
  jasmine.addMatchers({
    toBeRejected: function() {
      return {
        compare: function(promise) {
          var status = {valid: false};

          promise.then(
            function() {
              throw new Error('Expected Promise to be rejected.');
            },
            function() {
              status.valid = true;
            });

          return JasminePromiseMatchers.maybeTickClockAndCompleteCompare_(status, 'Promise did not reject.');
        }
      };
    },
    toBeRejectedWith: function() {
      return {
        compare: function(promise, expected) {
          var status = {valid: false};

          promise.then(
            function() {
              throw new Error('Expected Promise to be rejected.');
            },
            function(actual) {
              status.valid = true;
              expect(actual).toEqual(expected);
            });

          return JasminePromiseMatchers.maybeTickClockAndCompleteCompare_(status, 'Promise did not reject.');
        }
      };
    },
    toBeResolved: function() {
      return {
        compare: function(promise) {
          var status = {valid: false};

          promise.then(
            function() {
              status.valid = true;
            },
            function() {
              throw new Error('Expected Promise to be resolved.');
            });

          return JasminePromiseMatchers.maybeTickClockAndCompleteCompare_(status, 'Promise did not resolve.');
        }
      };
    },
    toBeResolvedWith: function() {
      return {
        compare: function(promise, expected) {
          var status = {valid: false};

          promise.then(
            function(actual) {
              status.valid = true;

              expect(actual).toEqual(expected);
            },
            function() {
              throw new Error('Expected Promise to be resolved.');
            });

          return JasminePromiseMatchers.maybeTickClockAndCompleteCompare_(status, 'Promise did not resolve.');
        }
      };
    }
  });
});

// Maintain backwards compatibility until a 2.0 release;
// See issue #1 (and feel free to laugh at me for my inability to type or spell-check)
window.JasminePromisMatchers = window.JasminePromiseMatchers;