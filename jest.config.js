module.exports = {
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testEnvironment: 'jsdom',
  verbose: false,
  testTimeout: 3000,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts(x?)$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsConfig: 'tsconfig.test.json',
      },
    ],
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
    '^.+.tsx?$': ['ts-jest', {}],
  },
  testPathIgnorePatterns: ['/node_modules/', '/gen/', '__mock__'],
  reporters: ['default', 'jest-junit'],
  collectCoverage: false,
  collectCoverageFrom: [
    './src/**/{*.js,*.ts,*.tsx}',
    '!**/node_modules/**',
    '!**/assets/**',
    '!**/models/**',
  ],
  coverageDirectory: './coverage/',
  coverageReporters: ['json-summary', 'text-summary', 'html'],
  coveragePathIgnorePatterns: ['node_modules', '__mocks__'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mock__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/test/__mock__/fileMock.js',
    '^config$': '<rootDir>/config/test.json',
  },
  resetModules: true,
  rootDir: './',
  roots: ['src', 'test'],
  testRegex: ['(/test/.*|(\\.|/)(spec))\\.tsx?$'],
  transformIgnorePatterns: ['/node_modules/', '\\.svg\\.[^\\/]+$'],
  fakeTimers: {
    enableGlobally: true,
  },
  moduleDirectories: ['node_modules', 'src', 'tests'],
};
