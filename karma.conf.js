module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: {
    },
    files: [
      'node_modules/es6-promise/dist/es6-promise.js',
      'jasmine-es6-promise-matchers.js',
      'test.js'
    ],
    exclude: [],
    reporters: ['progress'],
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.CHROME_HEADLESS ? ['ChromeHeadless'] : ['Chrome'],
    captureTimeout: 5000,
    singleRun: false,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    }
  });
};
