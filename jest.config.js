module.exports = {
  globals: {
    window: true,
    Materialize: true,
    $: true,
  },
  verbose: true,
  collectCoverage: true,
  setupTestFrameworkScriptFile: './client/__tests__/setupTest.js',
  testPathIgnorePatterns: [
    'client/src/reducers/rootReducer.js',
    'client/__tests__/__mocks__',
    'client/__tests__/setupTest.js',
    './node_modules/'],
  collectCoverageFrom: [
    '!client/__tests__/**/*.{js,jsx}',
    '!client/__tests__/setupTest.js',
    '!client/src/index.jsx',
    '!client/src/store/**',
    'client/src/actions/**',
    'client/src/components/**',
    'client/src/reducers/**',
    '!client/src/reducers/rootReducer.js'
  ],
  testMatch: [
    '<rootDir>/client/__tests__/**/*.spec.js?(x)'
  ],
  roots: [
    './client'
  ],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/client/__tests__/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/client/__tests__/__mocks__/styleMocks.js'
  },
};
