const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'coverage_cy/my-cypress-output-[suiteName].xml',
    toConsole: true,
  },
  e2e: {
    baseUrl: 'http://localhost:3000', // Base URL for your application
    supportFile: 'cypress/support/e2e.js', // Path to support file
    specPattern: 'cypress/e2e/**/*.cy.js', // Pattern for test files
    viewportWidth: 1280, // Default viewport width
    viewportHeight: 720, // Default viewport height
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
