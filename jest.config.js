module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/styleMock.js"
  },
  globalTeardown: './test-teardown-globals.js',
};