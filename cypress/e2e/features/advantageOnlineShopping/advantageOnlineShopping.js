import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';
import advantageOnline from '../pageObjects/pageObjects'


Before(() => {
  cy.log('Iniciando um novo cenário de teste');
});

After(() => {
  cy.log('Cenário de teste concluído');
});

//Cenario 1

Given('Que acesso a pagina de login', () => {
  advantageOnline.visit();
});

When('Clico no botao de busca autocomplete e digito o produto {string}', (produto) => {
  advantageOnline.pesquisaEValidaProduto(produto);
});

Then('Devo visualizalo na sugestao do autocomplete {string}', (produto) => {
  advantageOnline.validaSugestaoAutocomplete(produto);
});

// Cenario 2

Given('Que pesquisei pelo produto {string}', (produto) => {
  advantageOnline.visit();
  advantageOnline.pesquisaEValidaProduto(produto);
});


When('Clico no produto desejado e incluo no carrinho', () => {
  advantageOnline.clicaProduto();
  advantageOnline.colocaProdutoNoCarrinho();
});

When('For incluido no carrinho', () => {
  cy.wait(8000)
  advantageOnline.adicionarNoCarrinho();
});

When('Adiciono outros produtos {string}', (outroProduto) => {
  cy.wait(8000)
  advantageOnline.pesquisaOutroProduto(outroProduto);
  cy.wait(8000)
  advantageOnline.enterProduto();
  cy.get('#16').click()
  advantageOnline.adicionarNoCarrinho();
});

Then('Verifico se esta na tela de pagamento', () => {
  advantageOnline.verificoSeEstaNaPaginaDePagamento()
})


