module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/src/utils/', '<rootDir>/src/typings', '<rootDir>/public/'],
  collectCoverage: true,
  coverageReporters: [
    'lcov',
    'text',
  ],
};
