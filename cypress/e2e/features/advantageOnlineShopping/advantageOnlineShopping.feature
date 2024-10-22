Feature: Validacao ecommerce

  Como Um usuario desejo realizar compras no ecommerce
  Quero Fazer uma busca de produtos e verificar o carrinho
  Para Realizar compras

  Scenario: Realiza busca de um produto
    Given Que acesso a pagina de login
    When Clico no botao de busca autocomplete e digito o produto "<produto>"
    Then Devo visualizalo na sugestao do autocomplete "<produto>"

    Examples:
      | produto       | 
      | LAPTOP        |
      | TABLET        |

  Scenario: Inclui produtos no carrinho
    Given Que pesquisei pelo produto "<produto>"
    When Clico no produto desejado e incluo no carrinho
    And Adiciono outros produtos "<outroProduto>"
    Then Verifico se eles estao na tela de pagamento

    Examples:
    | produto  | outroProduto |
    | LAPTOP   | TABLET       |

    Scenario: Verificar se a API retorna a categoria dos produtos
      Given Que eu realizo uma requisição para a API de busca de produtos
      When Eu procuro por produtos da categoria "TABLETS"
      Then O valor do campo "categoryName" deve ser "TABLETS"
   
