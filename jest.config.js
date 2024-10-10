module.exports = {
  collectCoverageFrom: [
    'src/app/**/*.ts',
  ],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: 'coverage/frontend',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^uuid$': require.resolve('uuid'),
  },
};
