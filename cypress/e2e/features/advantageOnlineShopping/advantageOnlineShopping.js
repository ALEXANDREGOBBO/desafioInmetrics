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
  advantageOnline.adicionarNoCarrinho();
});


When('Adiciono outros produtos {string}', (outroProduto) => {
  cy.get('.logo').first().click().
  advantageOnline.enterProduto();
  cy.get('#16').click()
  advantageOnline.adicionarNoCarrinho();
});

Then('Verifico se esta na tela de pagamento', () => {
  advantageOnline.verificoSeEstaNaPaginaDePagamento()
})

// Cenário 3 validacao da API:

// URL da API
const apiUrl = 'https://advantageonlineshopping.com/catalog/api/v1/products/search?name=TABLETS&quantityPerEachCategory=100';

Given('Que eu realizo uma requisição para a API de busca de produtos', () => {
  
});

When('Eu procuro por produtos da categoria "TABLETS"', () => {
});


  Then('O valor do campo "categoryName" deve ser "TABLETS"', () => {
    cy.request({
      method: 'GET',
      url: 'https://advantageonlineshopping.com/catalog/api/v1/products/search?name=TABLETS&quantityPerEachCategory=100',
    }).should(({ status, body }) => {
      expect(status).to.eq(200);
      
      expect(body).to.be.an('array').that.is.not.empty;
    
      const firstCategory = body[0]; 
      
      expect(firstCategory.categoryName).to.eq('TABLETS');
    
      firstCategory.products.forEach(product => {
        expect(product.categoryId).to.eq(3); //
        expect(product.productName.toLowerCase()).to.contain('tablet');
        
      });
    });
   
  });


