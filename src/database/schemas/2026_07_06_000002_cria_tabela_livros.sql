CREATE TABLE livros (
                        id_livro SERIAL PRIMARY KEY,
                        titulo VARCHAR(150) NOT NULL,
                        isbn VARCHAR(13) UNIQUE NOT NULL,
                        ano_publicacao INTEGER,
                        quantidade_estoque INTEGER NOT NULL DEFAULT 0,
                        id_autor INTEGER NOT NULL,
                        data_cadastro TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE livros IS 'Tabela de livros vinculados obrigatoriamente a um autor';

ALTER TABLE livros ADD FOREIGN KEY (id_autor) REFERENCES autores (id_autor) ON DELETE RESTRICT;
