Este arquivo é um rascunho para depois adicionado as informações no README.md

***** rodar projeto em ambiente de desenvolvimento ***
CRIAR BANCO DE DADOS EX: CREATE DATABASE bookstore_sctec
se desejar banco de dados VAZIO, rodar no pgadmin o conteúdo de src/database/schema.sql
se desejar banco de dados POPULADO, rodar no pgadmin o conteúdo de src/database/seed.sql

criar arquivo .env e colar nele o conteúdo de .env.example

para instalar as dependências rodar no terminal: npm install
para executar projeto em ambiente dev: npm run dev

***********

melhorias em livroControllerListar -> exibir autor na tabala


*** conferencia antes de enviar push ***
nos controllers toda chamada de Service deve estar dentro de try -> cath
tratar nos services recebimento de Zero nos IDs


