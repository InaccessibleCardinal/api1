/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  automock: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-TEST.xml',
      },
    ],
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/api/middleware/index.ts',
    '!src/api/utils/readFromDb.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  // setupFiles: ['./jest.setup-file.ts'],
};
