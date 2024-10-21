const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Adicionando o preprocessor para cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Configurando o esbuild como preprocessor
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));

      return config;
    },
    specPattern: 'cypress/e2e/**/*.feature', // Localização dos arquivos .feature
    baseUrl: 'https://advantageonlineshopping.com/#/', // Ajuste conforme necessário
  },
});
