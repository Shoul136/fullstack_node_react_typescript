export default {
  testEnvironment: 'node',
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts'],
moduleNameMapper: {
    '^(\\.\\.?\\/.+)\\.js$': '$1',
  },
 transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ]
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  extensionsToTreatAsEsm: ['.ts'],
};