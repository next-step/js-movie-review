const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: { baseUrl: "http://localhost:8080/", supportFile: false },
  env: {
    TMDB_API_BASE_URL: process.env.TMDB_API_BASE_URL,
    TMDB_API_ACCESS_TOKEN: process.env.TMDB_API_ACCESS_TOKEN,
    TMDB_IMAGE_BASE_URL: process.env.TMDB_IMAGE_BASE_URL,
  },
});
