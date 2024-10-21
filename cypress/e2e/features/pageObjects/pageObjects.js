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
        cy.get('.logo').click()
        this.clicaAutoComplete();
        // Digita o produto no campo de busca
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
        let produtoTexto; 
        cy.get('a.productName')
        .invoke('text')      
        .then((produto) => {
          cy.log(produto);
          produtoTexto = produto
          expect(produto).to.include(produto);  // Verifica se o texto é o esperado
        });
        return produto
    }

    clicaProduto () {
        cy.get('a.productName')
        .eq(0)
        .click()
    }

    colocaProdutoNoCarrinho() {
        cy.get('#Description')
        .find('h1.roboto-regular') 
        .invoke('text')            
        .then((produtoTexto) => {   
          expect(produtoTexto).to.include('HP ENVY - 17T TOUCH LAPTOP'); 
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

        cy.get('.roboto-regular').first('')
        .invoke('text')            
        .then((produtoTexto) => {   
          expect(produtoTexto).to.include('HP ENVY - 17T TOUCH LAPTOP'); 
        });
    }
}



export default new advantageOnline