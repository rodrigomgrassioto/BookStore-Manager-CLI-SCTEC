CREATE TABLE emprestimos (
    id_emprestimo SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    data_emprestimo TIMESTAMP DEFAULT NOW(),
    data_devolucao_prevista TIMESTAMP NOT NULL,
    data_devolucao_real TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO',

    -- Chave estrangeira ligando o empréstimo ao cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente) ON DELETE RESTRICT,

    -- Validação dos status permitidos
    CONSTRAINT chk_status_emprestimo CHECK (status IN ('ATIVO', 'DEVOLVIDO'))
);

COMMENT ON TABLE emprestimos IS 'Tabela que armazena os dados gerais e o cliente do empréstimo';
