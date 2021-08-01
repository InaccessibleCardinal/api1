/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  timeoutMS: 30000,
  packageManager: 'yarn',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  mutate: [
    './src/**/*.ts',
    '!./**/*.spec.ts',
    '!./src/api/middleware/index.ts',
    '!./src/index.ts',
    '!./**/__mocks__/*',
    '!./src/api/routes/index.ts'
  ],
};
