# 📚 BookStore Manager CLI

> **⚠️ Projeto em desenvolvimento**
>
> Este repositório encontra-se em construção como parte do Projeto Final Avaliativo do Módulo 01 do curso de Desenvolvimento Back-end Node.js.
>
> O sistema está sendo desenvolvido em squad, seguindo arquitetura em camadas, boas práticas de programação e persistência de dados utilizando PostgreSQL.
>
> Novas funcionalidades serão adicionadas conforme a evolução do projeto.

---

# 📝 Sobre o Projeto

O **BookStore Manager CLI** é uma aplicação back-end desenvolvida em **Node.js** e **TypeScript**, executada via terminal (CLI), que tem como objetivo gerenciar uma pequena livraria.

O sistema permitirá realizar o gerenciamento completo de:

- Autores
- Livros
- Clientes
- Empréstimos

Todos os dados serão persistidos em um banco de dados **PostgreSQL**, utilizando SQL nativo através da biblioteca **pg**.

Este projeto está sendo desenvolvido como parte avaliativa do curso de **Desenvolvimento Back-end Node.js** (Módulo 01).

---

# 🎯 Objetivo

Aplicar, na prática, os principais conceitos estudados durante o módulo, tais como:

- Node.js
- TypeScript
- Programação Orientada a Objetos
- Arquitetura em Camadas
- PostgreSQL
- SQL
- Programação Assíncrona
- Interfaces
- Classes
- Tratamento de Erros
- Clean Code
- SOLID
- Git
- GitHub
- GitFlow

---

# 🚧 Status do Projeto

Atualmente o projeto encontra-se na fase inicial de desenvolvimento.

### Etapas previstas

- [x] Planejamento inicial
- [x] Definição da arquitetura
- [x] Configuração do projeto Node.js + TypeScript
- [ ] Configuração do PostgreSQL
- [ ] Modelagem do banco de dados
- [ ] Implementação da arquitetura em camadas
- [ ] CRUD de Autores
- [ ] CRUD de Livros
- [ ] CRUD de Clientes
- [ ] Controle de Empréstimos
- [ ] Relatórios
- [ ] Documentação completa
- [ ] Vídeo de apresentação

---

# 🛠 Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- SQL
- Biblioteca pg
- Git
- GitHub
- Gerenciamento com Jira (metodologia kanban)

---

# 📋 Pré-requisitos

> Em construção

---

# 🚀 Instalação

> Em construção
---

# 📂 Estrutura do Projeto

```
bookstore-manager-cli/
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── database/
│   ├── menus/
│   ├── utils/
│   └── main.ts
│
├── package.json
├── tsconfig.json
├── .env
├── README.md
└── .gitignore
```

### Organização das Camadas

**Main**

Responsável por iniciar a aplicação, estabelecer a conexão com o banco de dados e iniciar o menu principal do sistema. 

**Controllers**

Responsável por realizar a interação com o usuário por meio do 
terminal, recebendo entradas, apresentando menus, exibindo 
mensagens e acionando os serviços da aplicação. 

**Services**

Responsável por implementar as regras de negócio do sistema, 
realizando validações, processando informações e coordenando as 
operações necessárias antes do acesso ao banco de dados.

**Repositories**

Responsável exclusivamente pela comunicação com o PostgreSQL, 
executando comandos SQL para inserção, atualização, consulta e 
remoção de registros. 

**Models**

Responsável por representar as entidades do sistema por meio de 
classes, interfaces e tipos utilizados ao longo da aplicação. 

**Database**

Responsável por centralizar a configuração da conexão com o 
PostgreSQL e armazenar o script SQL de criação da estrutura do banco 
dedados. 

**Utils**

Responsável por concentrar funções auxiliares reutilizáveis, como 
validações, formatação de textos, tratamento de datas e outras rotinas 
compartilhadas. 

**Menus**

Responsável pela organização dos menus da aplicação, tornando a 
navegação mais modular e facilitando futuras expansões do sistema. 

---

# 📚 Funcionalidades Previstas

## Autores

- Cadastro
- Listagem
- Consulta
- Atualização
- Remoção

## Livros

- Cadastro
- Listagem
- Consulta
- Atualização
- Remoção

## Clientes

- Cadastro
- Listagem
- Consulta
- Atualização
- Remoção

## Empréstimos

- Registrar empréstimo
- Registrar devolução
- Consultar empréstimos

## Relatórios

- Livros disponíveis
- Livros emprestados
- Livros por autor
- Quantidade de empréstimos por livro
- Clientes com empréstimos ativos

---

# 🗃 Banco de Dados

O banco será desenvolvido em PostgreSQL utilizando SQL nativo.

As principais entidades serão:

- Autores
- Livros
- Clientes
- Empréstimos

A estrutura será disponibilizada no arquivo:

```
src/database/schema_sql-bkp-2026-07-14
```

---

# 🌿 Versionamento

O projeto segue um fluxo baseado em GitFlow simplificado.

Branches principais:

```
main
develop
```

Branches de funcionalidades:

```
Em construção
```

---

# 📌 Kanban

O planejamento das etapas de desenvolvimento foi gerenciado de forma visual através de um quadro Kanban, utilizando a ferramenta Jira.

Link do quadro: 
> https://rodrigomgrassioto.atlassian.net/jira/software/projects/KAN/boards/1

---

# 👥 Integrantes

- Bruna Caroline Fraga
- Rodrigo Medeiros Grassioto
- Vítor O. Becker de Aquino

---

# 📄 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos.