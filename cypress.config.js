const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    },

    env: {
        TMDB_API_KEY: 'cd45ff31f728c6222a2830fc1fb7f44e'
    }
});
