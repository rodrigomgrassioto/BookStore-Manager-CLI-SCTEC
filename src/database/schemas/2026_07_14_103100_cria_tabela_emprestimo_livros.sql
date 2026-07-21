CREATE TABLE emprestimo_livros (
    id_emprestimo INTEGER NOT NULL,
    id_livro INTEGER NOT NULL,

    -- Chave primária em emprestimo e livro
    PRIMARY KEY (id_emprestimo, id_livro),

    -- Chaves estrangeiras com restrição para proteger a integridade dos dados
    FOREIGN KEY (id_emprestimo) REFERENCES emprestimos (id_emprestimo) ON DELETE RESTRICT,
    FOREIGN KEY (id_livro) REFERENCES livros (id_livro) ON DELETE RESTRICT
);

COMMENT ON TABLE emprestimo_livros IS 'Tabela pivô que vincula múltiplos livros a um único empréstimo';
