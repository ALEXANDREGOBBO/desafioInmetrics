Desafio Inmetrics

Descrição

Este projeto foi desenvolvido para ser apresentado no desafio técnico do processo seletivo da empresa inmetrics.

Pré-requisitos

Antes de começar, certifique-se de ter o seguinte software instalado:

  Node.js (v12 ou superior)
  Git

Dependências adicionais:
  Este projeto também utiliza os seguintes pacotes adicionais:

    Cypress Cucumber Preprocessor
    Cypress Esbuild Preprocessor
    
Instalação do Ambiente
  Execute o comando: npm install cypress --save-dev | para installar o cypress
  Execute o comando: npm install @badeball/cypress-cucumber-preprocessor --save-dev |  para installar o cucumber preprocessor
    Para melhorar o desempenho e garantir que o preprocessor funcione corretamente, é possivel instalar o @bahmutov/cypress-esbuild-preprocessor: npm install @bahmutov/cypress-esbuild-preprocessor --save-dev

  
Clone o repositório
Abra o terminal e execute o comando abaixo para clonar o repositório:
git clone https://github.com/ALEXANDREGOBBO/desafioInmetrics)

Instale as dependências
Com o Node.js e npm já instalados, execute o comando abaixo para instalar todas as dependências do projeto, conforme especificado no arquivo package.json:

npm cypress open

Configuração de Ambientes de Teste


1. Executar Cypress via Interface Gráfica (modo interativo)


npx cypress open
Isso abrirá a interface gráfica do Cypress, onde você pode selecionar e rodar os testes.

Entao basta somente realizar os testes
