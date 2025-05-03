export default {
    testEnvironment: 'node',
    transform: { "^.+\\.js$": "babel-jest" },
    setupFilesAfterEnv: ["<rootDir>/tests/setupTestDB.js"]
  };