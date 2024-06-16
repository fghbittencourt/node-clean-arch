export default {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text'],
  coveragePathIgnorePatterns: ['node_modules/', 'tests/'],
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  transformIgnorePatterns: [],
  testMatch: ['**/tests/unit/**/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  setupFilesAfterEnv: ['./tests/jest.setup.ts']
};
