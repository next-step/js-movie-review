require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      API_KEY_TMDB: process.env.API_KEY_TMDB,
      API_TMDB_BASE_URL: process.env.API_TMDB_BASE_URL,
    },
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
