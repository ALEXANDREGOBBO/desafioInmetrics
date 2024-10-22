Feature: Validacao ecommerce

  Como um usuario desejo 
  Quero fazer fazer uma busca de um produto
  Para incluir no carrinho

  Scenario: Realiza busca de um produto
    Given Que acesso a pagina de login
    When Clico no botao de busca autocomplete e digito o produto "<produto>"
    Then Devo visualizalo na sugestao do autocomplete "<produto>"

    Examples:
      | produto       | 
      | LAPTOP        |
      | TABLET        |

  Scenario: Inclui um produto no carrinho
    Given Que pesquisei pelo produto "<produto>"
    When Clico no produto desejado e incluo no carrinho
    And Adiciono outros produtos "<outroProduto>"
    Then Verifico se esta na tela de pagamento

    Examples:
    | produto  | outroProduto |
    | LAPTOP   | TABLET       |

