module.exports = {
  verbose: true,
  projects: [
    {
      displayName: 'UI Unit tests',
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
      extraGlobals: ['Math'],
      testEnvironment: 'enzyme',
      testEnvironmentOptions: {
        enzymeAdapter: 'react16',
      },
      unmockedModulePathPatterns: [
        'node_modules',
      ],
      transformIgnorePatterns: [
        '<rootDir>/node_modules/',
      ],
      moduleDirectories: ['node_modules'],
      moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'node'],
      moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
      },
      testPathIgnorePatterns: [
        'fixtures',
      ],
      coveragePathIgnorePatterns: [
        '<rootDir>/src/config/',
      ],
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.jsx'],
    },
  ],
};
