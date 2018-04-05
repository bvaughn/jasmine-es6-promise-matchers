'use strict';

describe('JasminePromiseMatchers', function () {

  var promise;
  var reject;
  var resolve;

  beforeEach(JasminePromiseMatchers.install);

  beforeEach(function() {
    promise = new Promise(function(resolve_, reject_) {
      resolve = resolve_;
      reject = reject_;
    });
  });

  afterEach(JasminePromiseMatchers.uninstall);

  [true, false].forEach(function(completeBefore) {
    it('should recognized resolved promises', function(done) {
      if (completeBefore) {
        resolve();
      }

      expect(promise).toBeResolved(done);

      if (!completeBefore) {
        resolve();
      }
    });

    it('should recognized resolved promises with expected arguments', function(done) {
      if (completeBefore) {
        resolve('foobar');
      }

      expect(promise).toBeResolvedWith('foobar', done);

      if (!completeBefore) {
        resolve('foobar');
      }
    });

    it('should recognize resolved promises with asymmetric matchers ', function(done) {
      var data = {someProperty: 'someValue', somethingElse: 'dontCare'};

      if (completeBefore) {
        resolve(data);
      }

      var asymmetricMatcher = jasmine.objectContaining({
        someProperty: 'someValue'
      });

      expect(promise).toBeResolvedWith(asymmetricMatcher, done);

      if (!completeBefore) {
        resolve(data);
      }
    });

    it('should recognized rejected promises', function(done) {
      if (completeBefore) {
        reject();
      }

      expect(promise).toBeRejected(done);

      if (!completeBefore) {
        reject();
      }
    });

    it('should recognized rejected promises with expected arguments', function(done) {
      if (completeBefore) {
        reject('foobar');
      }

      expect(promise).toBeRejectedWith('foobar', done);

      if (!completeBefore) {
        reject('foobar');
      }
    });

    it('should recognize rejected promises with asymmetric matchers ', function(done) {
      var data = {someProperty: 'someValue', somethingElse: 'dontCare'};

      if (completeBefore) {
        reject(data);
      }

      var asymmetricMatcher = jasmine.objectContaining({
        someProperty: 'someValue'
      });

      expect(promise).toBeRejectedWith(asymmetricMatcher, done);

      if (!completeBefore) {
        reject(data);
      }
    });

    it('should recognize rejected promises with error objects', function(done) {
      var rejection = new Error('Error message');

      if (completeBefore) {
        reject(rejection);
      }

      var errorMatcher = new Error('Error message');
      expect(promise).toBeRejectedWith(errorMatcher, done);

      if (!completeBefore) {
        reject(rejection);
      }
    });

    it('should recognize resolved promises with error objects', function(done) {
      var result = new Error('Error message');

      if (completeBefore) {
        resolve(result);
      }

      var errorMatcher = new Error('Error message');
      expect(promise).toBeResolvedWith(errorMatcher, done);

      if (!completeBefore) {
        resolve(result);
      }
    });

    it('should recognize rejected promises with distinct error messages', function(done) {
      var rejection = new Error('Some error');

      if (completeBefore) {
        reject(rejection);
      }

      var errorMatcher = new Error('Error message');
      expect(promise).not.toBeRejectedWith(errorMatcher, done);

      if (!completeBefore) {
        reject(rejection);
      }
    });
  });
});
