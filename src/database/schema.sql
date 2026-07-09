-- ========================================================
-- Servidor:                     127.0.0.1
-- Banco de Dados:               bookstore_manager_cli (PostgreSQL)
-- Script:                       schema.sql (Apenas Estrutura)
-- ========================================================

CREATE TABLE autores (
    id_autor SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50),
    data_cadastro TIMESTAMP DEFAULT NOW()
    );

CREATE TABLE livros (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    ano_publicacao INTEGER,
    quantidade_estoque INTEGER NOT NULL DEFAULT 0,
    id_autor INTEGER NOT NULL,
    data_cadastro TIMESTAMP DEFAULT NOW()
);

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    data_cadastro TIMESTAMP DEFAULT NOW()
);

CREATE TABLE emprestimos (
    id_emprestimo SERIAL PRIMARY KEY,
    id_livro INTEGER NOT NULL,
    id_cliente INTEGER NOT NULL,
    data_emprestimo TIMESTAMP DEFAULT NOW(),
    data_devolucao_prevista TIMESTAMP NOT NULL,
    data_devolucao_real TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO',

    -- Garante que o banco rejeite qualquer status diferente destes três
    CONSTRAINT chk_status_emprestimo CHECK (status IN ('ATIVO', 'DEVOLVIDO'))
);

COMMENT ON TABLE autores IS 'Tabela que armazena os autores dos livros';
COMMENT ON TABLE livros IS 'Tabela de livros vinculados obrigatoriamente a um autor';
COMMENT ON TABLE clientes IS 'Tabela de clientes que realizam empréstimos';
COMMENT ON TABLE emprestimos IS 'Tabela que registra as operações de empréstimos e devoluções';
COMMENT ON COLUMN emprestimos.status IS 'Valores aceitos: ATIVO, DEVOLVIDO';

-- Chaves Estrangeiras configuradas com restrição de exclusão
ALTER TABLE livros ADD FOREIGN KEY (id_autor) REFERENCES autores (id_autor) ON DELETE RESTRICT;
ALTER TABLE emprestimos ADD FOREIGN KEY (id_livro) REFERENCES livros (id_livro) ON DELETE RESTRICT;
ALTER TABLE emprestimos ADD FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente) ON DELETE RESTRICT;

