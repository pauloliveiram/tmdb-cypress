const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.themoviedb.org/3",
    specPattern: [
      "cypress/integration/api-tests/*.spec.{js,jsx,ts,tsx}",
      "cypress/integration/api-tests/account/*.spec.{js,jsx,ts,tsx}",
      "cypress/integration/api-tests/lists/*.spec.{js,jsx,ts,tsx}",
    ],
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
  video: false,
});
