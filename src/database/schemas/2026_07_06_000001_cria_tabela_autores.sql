CREATE TABLE autores (
                         id_autor SERIAL PRIMARY KEY,
                         nome VARCHAR(100) NOT NULL,
                         nacionalidade VARCHAR(50),
                         data_cadastro TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE autores IS 'Tabela que armazena os autores dos livros';
