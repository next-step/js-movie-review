const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080/',
  },
  env: {
    TMDB_API_URL: 'https://api.themoviedb.org/3',
    TMDB_API_ACCESS_TOKEN: 'token',
    TMDB_API_KEY: 'key',
  },
  projectId: 'aga3gp',
});
