// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
	video: false,
	e2e: {
		specPattern: 'cypress/integration',
		baseUrl: 'http://localhost:8080',
		supportFile: false,
	},
	component: {
		supportFile: false,
	},
});
