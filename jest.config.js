export default {
    testEnvironment: 'jsdom', // jsdom for frontend, node for backend
    transform: { "^.+\\.js$": "babel-jest" },
    moduleNameMapper: {
        '^/Scripts/(.*)$': '<rootDir>/FrontEnd/Scripts/$1'
      },
  };