# 📚 BookStore Manager CLI

> **⚠️ Projeto em desenvolvimento**
>
> Este repositório encontra-se em construção como parte do Projeto Final Avaliativo do Módulo 01 do curso de Desenvolvimento Back-end Node.js do SENAI (Programa SCTec).
>
> O sistema está sendo desenvolvido em squad de 3 integrantes, seguindo arquitetura em camadas, boas práticas de programação e persistência de dados utilizando PostgreSQL.
>
> Novas funcionalidades serão adicionadas conforme a evolução do projeto.

---

# 📝 Sobre o Projeto

O **BookStore Manager CLI** é uma aplicação back-end desenvolvida em **Node.js** e **TypeScript**, executada via terminal (CLI), que tem como objetivo gerenciar uma pequena livraria.

O sistema permite realizar o gerenciamento completo de:

- Autores
- Livros
- Clientes
- Empréstimos

Todos os dados são persistidos em um banco de dados **PostgreSQL**, utilizando SQL nativo através da biblioteca **pg**.

Este projeto está sendo desenvolvido como parte avaliativa do curso de **Desenvolvimento Back-end com Node.js** (Módulo 01) do SENAI (Programa SCTec).

---

# 🎯 Objetivo

Aplicar, na prática, os principais conceitos estudados durante o módulo, tais como:

- Node.js
- TypeScript
- Programação Orientada a Objetos
- Arquitetura em Camadas
- Banco de Dados Relacional
- SQL
- PostgreSQL
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

Atualmente o projeto encontra-se em desenvolvimento, com os módulos de Autores, Livros e Clientes concluídos e a implementação dos módulos Empréstimo e Relatórios em andamento.

### Progresso do Desenvolvimento

#### Infraestrutura

- [x] Planejamento inicial
- [x] Definição da arquitetura
- [x] Configuração do projeto Node.js + TypeScript
- [x] Configuração do PostgreSQL
- [x] Modelagem do banco de dados
- [x] Implementação da arquitetura em camadas

#### Funcionalidades

- [x] CRUD de Autores
- [x] CRUD de Livros
- [x] CRUD de Clientes
- [ ] Controle de Empréstimos
- [ ] Relatórios

#### Entrega

- [ ] Documentação completa
- [ ] Vídeo de apresentação

---

# 🛠 Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- SQL
- Biblioteca pg
- dotenv
- Git
- GitHub
- GitHub Pull Requests
- Jira (gerenciamento do projeto - metodologia kanban)

---

# 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado em sua máquina:

- Node.js (20 ou superior)
- npm
- PostgreSQL
- Git
- Visual Studio Code (ou outra IDE compatível)

> O servidor PostgreSQL deve estar em execução, e o usuário informado nas variáveis de ambiente deve possuir permissão para criar bancos de dados.

---

# 🚀 Instalação

## 1. Clone o repositório

```bash
git clone https://github.com/rodrigomgrassioto/BookStore-Manager-CLI-SCTEC.git
```

Acesse a pasta do projeto:

```bash
cd BookStore-Manager-CLI-SCTEC
```

---

## 2. Instale as dependências

```bash
npm install
```

> O comando acima instalará automaticamente todas as dependências definidas no arquivo `package.json`, incluindo bibliotecas como `pg` e `dotenv`.

---

## 3. Configure as variáveis de ambiente

Crie um arquivo na raiz do projeto:

```text
.env
```

Copie para ele todo o conteúdo do arquivo:

```text
.env.example
```

Em seguida, configure as informações de acesso ao seu PostgreSQL.

> Não é necessário criar previamente o banco informado em `PG_DATABASE`. O script de schemas fará essa criação automaticamente caso ele ainda não exista.

---

## 4. Criar a estrutura do banco de dados

Execute:

```bash
npm run db:schemas
```

Esse comando:

- conecta-se ao banco padrão `postgres`;
- cria automaticamente o banco definido em `PG_DATABASE`, caso necessário;
- cria a tabela de controle `migrations_history`;
- executa, em ordem, os arquivos SQL presentes em:

```text
src/database/schemas/
```

Os schemas já registrados em `migrations_history` não são executados novamente.

---

## 5. Popular o banco de dados (Opcional)

Caso deseje inserir dados para testes:

```bash
npm run db:seed
```

Esse comando executará os arquivos SQL presentes em:

```text
src/database/seeds/
```

---

## 6. Executar a aplicação

Para executar a aplicação em ambiente de desenvolvimento:

```bash
npm run dev
```

---

# 📂 Estrutura do Projeto


A árvore estrutural do projeto segue uma arquitetura em camadas (**Layered Architecture**), separando responsabilidades para facilitar a manutenção, escalabilidade e organização do código.

```text
└── BookStore-Manager-CLI-SCTEC/                # Pasta raiz do projeto
    │
    ├── src/                                    # Código-fonte principal da aplicação
    │   │
    │   ├── controllers/                        # Camada responsável pela interação com o usuário
    │   │   ├── AutorController.ts              # Fluxos da entidade Autor
    │   │   ├── ClienteController.ts            # Fluxos da entidade Cliente
    │   │   ├── EmprestimoController.ts         # Fluxos da entidade Empréstimo
    │   │   ├── LivroController.ts              # Fluxos da entidade Livro
    │   │
    │   ├── database/                           # Configuração, criação e população do PostgreSQL
    │   │   ├── schemas/                        # Scripts SQL versionados (estrutura do banco)
    │   │   ├── seeds/                          # Scripts SQL para inserção de dados de teste
    │   │   ├── connection.ts                   # Configuração da conexão com PostgreSQL
    │   │   ├── DatabaseSeeder.ts               # Executor automático dos arquivos de seeds
    │   │   └── RunSchemas.ts                   # Executor automático dos arquivos de schemas
    │   │
    │   ├── menus/                              # Menus de navegação da aplicação CLI
    │   │   ├── AutorMenu.ts                    # Submenu da entidade Autor
    │   │   ├── ClienteMenu.ts                  # Submenu da entidade Cliente
    │   │   ├── EmprestimoMenu.ts               # Submenu da entidade Empréstimo
    │   │   ├── InicioMenu.ts                   # Menu principal da aplicação
    │   │   └── LivroMenu.ts                    # Submenu da entidade Livro
    │   │
    │   ├── models/                             # Interfaces e modelos das entidades do sistema
    │   │   ├── AutorModel.ts                   # Modelo da entidade Autor
    │   │   ├── ClienteModel.ts                 # Modelo da entidade Cliente
    │   │   ├── EmprestimoModel.ts              # Modelo da entidade Empréstimo
    │   │   └── LivroModel.ts                   # Modelo da entidade Livro
    │   │
    │   ├── repositories/                       # Comunicação direta com o PostgreSQL (SQL)
    │   │   ├── AutorRepository.ts              # Operações SQL da entidade Autor
    │   │   ├── ClienteRepository.ts            # Operações SQL da entidade Cliente
    │   │   ├── EmprestimoRepository.ts         # Operações SQL da entidade Empréstimo
    │   │   └── LivroRepository.ts              # Operações SQL da entidade Livro
    │   │
    │   ├── services/                           # Regras de negócio e validações do sistema
    │   │   ├── AutorService.ts                 # Serviços da entidade Autor
    │   │   ├── ClienteService.ts               # Serviços da entidade Cliente
    │   │   ├── EmprestimoService.ts            # Serviços da entidade Empréstimo
    │   │   └── LivroService.ts                 # Serviços da entidade Livro
    │   │
    │   ├── utils/                              # Funções auxiliares reutilizáveis
    │   │   ├── formatadoresTexto.ts            # Formatação de saídas no terminal
    │   │   ├── leitorFormatadorDeEntradas.ts   # Entrada de dados pelo terminal
    │   │   ├── tratamentosErrosBD.ts           # Tratamento padronizado de erros do PostgreSQL
    │   │   └── validadores.ts                  # Validações compartilhadas do sistema
    │   │
    │   └── index.ts                            # Ponto de entrada da aplicação
    │
    ├── .env.example                            # Modelo das variáveis de ambiente
    ├── package.json                            # Dependências e scripts do projeto
    ├── tsconfig.json                           # Configuração do compilador TypeScript
    ├── .gitignore                              # Arquivos ignorados pelo Git
    └── README.md                               # Documentação do projeto
```

---

# 📚 Funcionalidades do Sistema

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

O **BookStore Manager CLI** utiliza **PostgreSQL** como Sistema Gerenciador de Banco de Dados (SGBD), com persistência realizada por meio de **SQL nativo**, utilizando a biblioteca **pg**.

A estrutura do banco foi organizada utilizando um fluxo inspirado no conceito de **migrations**, no qual cada alteração da estrutura é registrada em um arquivo SQL individual e executada automaticamente pelo projeto.

## Estrutura

```text
src/database/
│
├── schemas/             # Scripts SQL responsáveis pela criação e evolução do banco
├── seeds/               # Scripts SQL para inserção de dados de teste
├── connection.ts        # Configuração da conexão com o PostgreSQL
├── RunSchemas.ts        # Executor automático dos arquivos de schema
└── DatabaseSeeder.ts    # Executor automático dos arquivos de seed
```

## Schemas

Os arquivos presentes em `src/database/schemas/` são executados em ordem cronológica pelo comando:

```bash
npm run db:schemas
```

Durante a execução, o sistema:

- verifica se o banco de dados informado no arquivo `.env` existe;
- cria automaticamente o banco de dados, caso necessário;
- cria a tabela `migrations_history`, responsável pelo controle dos schemas já executados;
- executa apenas os scripts SQL que ainda não foram aplicados.

Cada arquivo representa uma alteração específica da estrutura do banco, como criação de tabelas, inclusão de constraints ou outras modificações.

## Seeds

Os arquivos presentes em `src/database/seeds/` são responsáveis por popular o banco de dados com registros para testes.

A execução é realizada através do comando:

```bash
npm run db:seed
```

Essa etapa é opcional e facilita a validação das funcionalidades durante o desenvolvimento da aplicação.

## Entidades do Sistema

O banco de dados é composto pelas seguintes entidades principais:

- Autores
- Livros
- Clientes
- Empréstimos

As relações entre essas entidades são garantidas por **Primary Keys**, **Foreign Keys**, **Constraints** e demais mecanismos de integridade referencial disponibilizados pelo PostgreSQL.

---

# 🌿 Versionamento

O projeto utiliza um fluxo de versionamento inspirado no **GitFlow**, adaptado às necessidades da equipe e aos requisitos acadêmicos do projeto.

## Branches principais

```text
main
develop
```

- **main**: contém apenas versões estáveis e prontas para entrega.
- **develop**: branch de integração, onde são reunidas e testadas as funcionalidades antes da incorporação à `main`.

## Branches de desenvolvimento

Cada funcionalidade é desenvolvida em uma **branch temporária**, criada a partir da `develop`, seguindo o padrão de nomenclatura definido pela equipe.

Exemplo:

```text
feat/kan-7-vit-clientes
refactor/kan-9-bcf-autor-melhorias
fix/kan-10-rmg-livro-repository
```

Onde:

- **feat**, **fix** ou **refactor** identificam o tipo da alteração;
- **kan-XX** corresponde ao cartão da tarefa no Kanban;
- **iniciais do integrante** identificam o responsável pela implementação;
- o último trecho descreve resumidamente a funcionalidade desenvolvida.

## Pull Requests

Todas as alterações são integradas à branch `develop` por meio de **Pull Requests (PRs)**.

Como prática adotada pela equipe:

- nenhum integrante aprova o próprio Pull Request;
- toda alteração passa por revisão de pelo menos outro integrante da squad antes da integração;
- somente após aprovação o código é incorporado à branch `develop`.

## Histórico das branches

Conforme requisito do projeto, **as branches temporárias não são removidas após o merge**, permanecendo disponíveis para consulta do histórico de desenvolvimento e avaliação da evolução do projeto.

---

# 📌 Kanban

O planejamento das etapas de desenvolvimento e acompanhamento das atividades foi gerenciado de forma visual por meio de um quadro Kanban, utilizando a ferramenta Jira.

Link do quadro: 
> https://rodrigomgrassioto.atlassian.net/jira/software/projects/KAN/boards/1

---

# 👥 Integrantes

- Bruna Caroline Fraga
- Rodrigo Medeiros Grassioto
- Vítor Olegário Becker de Aquino

---

# 🧪 Exemplo de Utilização

> Em construção

---

# 🚀 Melhorias Futuras

> Em construção

---

# 📄 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos.