CREATE TABLE clientes (
                          id_cliente SERIAL PRIMARY KEY,
                          nome VARCHAR(100) NOT NULL,
                          email VARCHAR(100) UNIQUE NOT NULL,
                          telefone VARCHAR(20),
                          data_nascimento DATE,
                          data_cadastro TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE clientes IS 'Tabela de clientes que realizam empréstimos';
