class advantageOnline {
    
        visit() {
            //Acessa a pagina
        cy.visit("https://advantageonlineshopping.com/#/");
            //Confirma se o titulo existe para verificar se esta na pagina
        cy.title().should("include", "Advantage Shopping");
            // Pega a URL reliza o GET e aguarda o retorno para verificar se foi 200
        cy.intercept({
            method: 'GET',
            url: "https://advantageonlineshopping.com/services.properties"
        }).as('validaRetorno');

        return cy.wait('@validaRetorno').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });


    };

    clicaAutoComplete() {
        cy.get('#mobileSearch')
         .should('be.visible')
            .click()       
    }

    pesquisaProduto(produto) {
        this.clicaAutoComplete();
        // Digita o produto no campo de busca
        cy.get('#mobileSearch')
          .type(produto)
          .intercept({
            method: 'GET',
             url: "https://advantageonlineshopping.com/catalog/api/v1/categories/all_data*"
         }).as('validaRetorno');
 
         return cy.wait('@validaRetorno').then((interception) => {
             expect(interception.response.statusCode).to.eq(200);
        });
    }

    pesquisaOutroProduto(outroProduto) {

        this.clicaAutoComplete();
        cy.get('#mobileSearch')
          .type(outroProduto)
          .intercept({
            method: 'GET',
             url: "https://advantageonlineshopping.com/catalog/api/v1/categories/all_data*"
         }).as('validaRetorno');
 
         return cy.wait('@validaRetorno').then((interception) => {
             expect(interception.response.statusCode).to.eq(200);
        });

    }

    enterProduto () {
        cy.get('#mobileSearch')
          .type('{enter}');
    }
    
    validaSugestaoAutocomplete(produto){
        const produtoEsperado = produto.trim().toLowerCase();

        // Itera sobre cada produto na lista de sugestões de autocomplete
        cy.get('a.productName').each(($el) => {
            const produtoTexto = $el.text().trim().toLowerCase();
    
            // Verifica se o produto esperado está incluído no texto da sugestão atual
            if (produtoTexto.includes(produtoEsperado)) {
                cy.log(`Produto encontrado: ${produtoTexto}`);
    
                // Envolva o valor do produto encontrado com `cy.wrap` para reutilizar depois
                cy.wrap(produtoTexto).as('produtoCapturado'); // Alias para reutilizar
                expect(produtoTexto).to.include(produtoEsperado);
            }
        });
    }

    clicaProduto () {
        cy.get('a.productName')
        .eq(0)
        .click()
    }

    colocaProdutoNoCarrinho() {
        cy.get('@produtoCapturado').then((produtoCapturado) => {
            cy.get('#Description')
              .find('h1.roboto-regular')
              .invoke('text')
              .then((produtoTexto) => {
                  expect(produtoTexto.trim().toLowerCase()).to.include(produtoCapturado); 
              });
        });
        
    }

    pesquisaEValidaProduto(produto) {
        this.clicaAutoComplete();
        this.pesquisaProduto(produto);
        this.enterProduto();
        this.validaSugestaoAutocomplete(produto);
      }

    adicionarNoCarrinho () {
        cy.get('[name="save_to_cart"]')
        .eq(0)
        .click();
    }

    verificoSeEstaNaPaginaDePagamento () {
        cy.get('#menuCart').click()
        cy.get('.roboto-regular').first('')
        .invoke('text')            
        .then((produtoTexto) => {   
          expect(produtoTexto).to.include('HP ELITEPAD 1000 G2 TABLET'); 
        });

        cy.get('.roboto-regular').eq(1)
        .invoke('text')            
        .then((produtoTexto) => {   
          expect(produtoTexto).to.include('HP ENVY - 17T TOUCH LAPTOP'); 
        });
    }
}



export default new advantageOnline