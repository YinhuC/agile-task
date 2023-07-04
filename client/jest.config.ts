const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    axios: 'axios/dist/node/axios.cjs',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@mantine)',
    '<rootDir>/node_modules/(?!axios)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
