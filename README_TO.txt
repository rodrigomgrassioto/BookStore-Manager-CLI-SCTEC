Este arquivo é um rascunho para depois adicionado as informações no README.md

*** RODAR PROJETO ***
criar arquivo .env e colar nele o conteúdo de .env.example
para instalar as dependências rodar no terminal: npm install

*** CRIAR BANCO DE DADOS ***
            *** desatualizado *** CRIAR BANCO DE DADOS EX: CREATE DATABASE bookstore_sctec
            *** desatualizado *** se desejar banco de dados VAZIO, rodar no pgadmin o conteúdo de src/database/schema_sql-bkp-2026-07-14
rodar no terminal: npm run db:schemas

*** POPULAR DB COM DADOS PARA TESTE (opcional) ***
            *** desatualizado *** se desejar banco de dados POPULADO, rodar no pgadmin o conteúdo de src/database/seed_sql-bkp-2026-07-14
rodar no terminal: npm run db:seed

para executar projeto em ambiente dev: npm run dev

***********

- melhorias em livroControllerListar -> exibir autor na tabela
- melhorias no tratamento de erro do banco de dados: evitar uso do tipo any, usando o tipo unknown
- implementar busca do autor por nome caso sobre tempo

*** conferencia antes de enviar push ***
nos controllers toda chamada de Service deve estar dentro de try -> cath
tratar nos services recebimento de Zero nos IDs


*** ajuste BD AutorService - nomeAutor como UNIQUE
