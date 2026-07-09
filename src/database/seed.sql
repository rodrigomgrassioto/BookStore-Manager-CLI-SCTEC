-- ========================================================
-- Servidor:                     127.0.0.1
-- Banco de Dados:               bookstore_manager_cli (PostgreSQL)
-- Script:                       seed.sql (Estrutura + Dados de Teste)
-- ========================================================

-- 1. ESTRUTURA DAS TABELAS

CREATE TABLE IF NOT EXISTS autores (
    id_autor SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50) NULL DEFAULT NULL,
    data_cadastro TIMESTAMP NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NULL DEFAULT NULL,
    data_nascimento DATE NULL DEFAULT NULL,
    data_cadastro TIMESTAMP NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS livros (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    ano_publicacao INTEGER NULL DEFAULT NULL,
    quantidade_estoque INTEGER NOT NULL DEFAULT 0,
    id_autor INTEGER NOT NULL,
    data_cadastro TIMESTAMP NULL DEFAULT now(),
    CONSTRAINT livros_id_autor_fkey FOREIGN KEY (id_autor) REFERENCES autores (id_autor) ON UPDATE NO ACTION ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS emprestimos (
    id_emprestimo SERIAL PRIMARY KEY,
    id_livro INTEGER NOT NULL,
    id_cliente INTEGER NOT NULL,
    data_emprestimo TIMESTAMP NULL DEFAULT now(),
    data_devolucao_prevista TIMESTAMP NOT NULL,
    data_devolucao_real TIMESTAMP NULL DEFAULT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO',
    CONSTRAINT emprestimos_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente) ON UPDATE NO ACTION ON DELETE RESTRICT,
    CONSTRAINT emprestimos_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES livros (id_livro) ON UPDATE NO ACTION ON DELETE RESTRICT,
    CONSTRAINT chk_status_emprestimo CHECK (status IN ('ATIVO', 'DEVOLVIDO', 'ATRASADO'))
);

COMMENT ON TABLE autores IS 'Tabela que armazena os autores dos livros';
COMMENT ON TABLE livros IS 'Tabela de livros vinculados obrigatoriamente a um autor';
COMMENT ON TABLE clientes IS 'Tabela de clientes que realizam empréstimos';
COMMENT ON TABLE emprestimos IS 'Tabela que registra as operações de empréstimos e devoluções';
COMMENT ON COLUMN emprestimos.status IS 'Valores aceitos: ATIVO, DEVOLVIDO';

-- ========================================================
-- 2. POPULAÇÃO DE DADOS (SEED)

-- Inserindo 15 Autores
INSERT INTO autores (id_autor, nome, nacionalidade) VALUES
    (1, 'Machado de Assis', 'Brasileira'),
    (2, 'Clarice Lispector', 'Brasileira'),
    (3, 'George Orwell', 'Britânica'),
    (4, 'J.K. Rowling', 'Britânica'),
    (5, 'Stephen King', 'Americana'),
    (6, 'Gabriel García Márquez', 'Colombiana'),
    (7, 'J.R.R. Tolkien', 'Britânica'),
    (8, 'Agatha Christie', 'Britânica'),
    (9, 'Jorge Amado', 'Brasileira'),
    (10, 'Virginia Woolf', 'Britânica'),
    (11, 'Ernest Hemingway', 'Americana'),
    (12, 'Haruki Murakami', 'Japonesa'),
    (13, 'Isabel Allende', 'Chilena'),
    (14, 'Carlos Drummond de Andrade', 'Brasileira'),
    (15, 'Franz Kafka', 'Tcheca');

-- Inserindo 30 Livros (2 para cada autor)
INSERT INTO livros (id_livro, titulo, isbn, ano_publicacao, quantidade_estoque, id_autor) VALUES
    (1, 'Dom Casmurro', '9788594318602', 1899, 5, 1),
    (2, 'Memórias Póstumas de Brás Cubas', '9788535933222', 1881, 3, 1),
    (3, 'A Hora da Estrela', '9788532530738', 1977, 4, 2),
    (4, 'Perto do Coração Selvagem', '9788532530721', 1943, 2, 2),
    (5, '1984', '9788535914849', 1949, 8, 3),
    (6, 'A Revolução dos Bichos', '9788535909555', 1945, 10, 3),
    (7, 'Harry Potter e a Pedra Filosofal', '9788532511010', 1997, 12, 4),
    (8, 'Harry Potter e a Câmara Secreta', '9788532511669', 1998, 7, 4),
    (9, 'O Iluminado', '9788543809632', 1977, 4, 5),
    (10, 'It: A Coisa', '9788535924732', 1986, 3, 5),
    (11, 'Cem Anos de Solidão', '9788501012074', 1967, 6, 6),
    (12, 'O Amor nos Tempos do Cólera', '9788501031303', 1985, 4, 6),
    (13, 'O Hobbit', '9788595084742', 1937, 9, 7),
    (14, 'O Senhor dos Anéis: A Sociedade do Anel', '9788595086357', 1954, 5, 7),
    (15, 'E Não Sobrou Nenhum', '9788525057174', 1939, 6, 8),
    (16, 'Assassinato no Expresso do Oriente', '9788525055934', 1934, 8, 8),
    (17, 'Capitães da Areia', '9788535911695', 1937, 7, 9),
    (18, 'Dona Flor e Seus Dois Maridos', '9788535914948', 1966, 3, 9),
    (19, 'Mrs. Dalloway', '9788521206124', 1925, 2, 10),
    (20, 'Ao Farol', '9788521206131', 1927, 3, 10),
    (21, 'O Velho e o Mar', '9788528620313', 1952, 5, 11),
    (22, 'Por Quem os Sinos Dobram', '9788528620320', 1940, 4, 11),
    (23, 'Norwegian Wood', '9788535912432', 1987, 4, 12),
    (24, 'Kafka à Beira-Mar', '9788535912449', 2002, 3, 12),
    (25, 'A Casa dos Espíritos', '9788525062536', 1982, 5, 13),
    (26, 'De Amor e de Sombra', '9788525062543', 1984, 2, 13),
    (27, 'Sentimento do Mundo', '9788535921830', 1940, 6, 14),
    (28, 'A Rosa do Povo', '9788535921847', 1945, 4, 14),
    (29, 'A Metamorfose', '9788535905335', 1915, 8, 15),
    (30, 'O Processo', '9788535905342', 1925, 5, 15);

-- Inserindo 30 Clientes
INSERT INTO clientes (id_cliente, nome, email, telefone, data_nascimento) VALUES
    (1, 'Lucas Silva', 'lucas.silva@email.com', '11999991111', '1990-05-15'),
    (2, 'Ana Oliveira', 'ana.oliveira@email.com', '11999992222', '1985-08-22'),
    (3, 'Bruno Santos', 'bruno.santos@email.com', '21999993333', '1993-01-10'),
    (4, 'Carla Souza', 'carla.souza@email.com', '21999994444', '1978-12-05'),
    (5, 'Diego Lima', 'diego.lima@email.com', '31999995555', '2000-03-30'),
    (6, 'Elena Pereira', 'elena.pereira@email.com', '31999996666', '1995-07-18'),
    (7, 'Fabio Costa', 'fabio.costa@email.com', '41999997777', '1988-11-25'),
    (8, 'Gisele Ribeiro', 'gisele.ribeiro@email.com', '41999998888', '1992-09-14'),
    (9, 'Hugo Martins', 'hugo.martins@email.com', '51999999999', '1982-04-02'),
    (10, 'Isabela Alves', 'isabela.alves@email.com', '51988881111', '1997-06-27'),
    (11, 'Julio César', 'julio.cesar@email.com', '11988882222', '1989-02-14'),
    (12, 'Katia Rodrigues', 'katia.rodrigues@email.com', '11988883333', '1974-10-19'),
    (13, 'Leonardo Cruz', 'leonardo.cruz@email.com', '21988884444', '2001-08-08'),
    (14, 'Marina Rocha', 'marina.rocha@email.com', '21988885555', '1994-05-24'),
    (15, 'Natan Gomes', 'natan.gomes@email.com', '31988886666', '1987-03-12'),
    (16, 'Olivia Mendes', 'olivia.mendes@email.com', '31988887777', '1991-12-31'),
    (17, 'Pedro Cardoso', 'pedro.cardoso@email.com', '47999991122', '1996-01-20'),
    (18, 'Raquel Fonseca', 'raquel.fonseca@email.com', '47999993344', '1983-09-09'),
    (19, 'Samuel Antunes', 'samuel.antunes@email.com', '51988888888', '1998-07-07'),
    (20, 'Tatiana Ramos', 'tatiana.ramos@email.com', '51988889999', '1979-11-15'),
    (21, 'Uelinton Silva', 'uelinton.silva@email.com', '11977771111', '1992-04-13'),
    (22, 'Vanessa Dias', 'vanessa.dias@email.com', '11977772222', '1986-06-18'),
    (23, 'William Carvalho', 'william.carvalho@email.com', '21977773333', '1995-10-30'),
    (24, 'Yara Nogueira', 'yara.nogueira@email.com', '21977774444', '1981-08-04'),
    (25, 'Zeca Pagodinho', 'zeca.pagodinho@email.com', '31977775555', '1959-02-04'),
    (26, 'Alice Monteiro', 'alice.monteiro@email.com', '31977776666', '1999-05-29'),
    (27, 'Beto Barbosa', 'beto.barbosa@email.com', '41977777777', '1955-02-27'),
    (28, 'Cintia Lopes', 'cintia.lopes@email.com', '41977778888', '1984-03-21'),
    (29, 'Daniel Faria', 'daniel.faria@email.com', '47991112233', '1990-11-01'),
    (30, 'Erica Campos', 'erica.campos@email.com', '47992223344', '1993-07-12');

-- Inserindo 60 Empréstimos

-- PARTE 1/2: 30 Empréstimos já DEVOLVIDOS (Histórico no Passado - Ano 2026)
INSERT INTO "emprestimos" ("id_emprestimo", "id_livro", "id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status") VALUES
    (1, 1, 1, '2026-01-10 10:00:00', '2026-01-17 10:00:00', '2026-01-15 14:20:00', 'DEVOLVIDO'),
    (2, 3, 2, '2026-01-12 11:30:00', '2026-01-19 11:30:00', '2026-01-19 09:15:00', 'DEVOLVIDO'),
    (3, 5, 3, '2026-01-15 14:00:00', '2026-01-22 14:00:00', '2026-01-21 16:45:00', 'DEVOLVIDO'),
    (4, 7, 4, '2026-01-18 09:00:00', '2026-01-25 09:00:00', '2026-01-24 11:00:00', 'DEVOLVIDO'),
    (5, 9, 5, '2026-01-20 16:15:00', '2026-01-27 16:15:00', '2026-01-27 15:30:00', 'DEVOLVIDO'),
    (6, 11, 6, '2026-02-01 10:00:00', '2026-02-08 10:00:00', '2026-02-07 11:00:00', 'DEVOLVIDO'),
    (7, 13, 7, '2026-02-03 11:00:00', '2026-02-10 11:00:00', '2026-02-10 10:45:00', 'DEVOLVIDO'),
    (8, 15, 8, '2026-02-05 15:30:00', '2026-02-12 15:30:00', '2026-02-11 17:00:00', 'DEVOLVIDO'),
    (9, 17, 9, '2026-02-10 09:20:00', '2026-02-17 09:20:00', '2026-02-16 14:10:00', 'DEVOLVIDO'),
    (10, 19, 10, '2026-02-12 14:00:00', '2026-02-19 14:00:00', '2026-02-19 13:50:00', 'DEVOLVIDO'),
    (11, 21, 11, '2026-03-01 10:30:00', '2026-03-08 10:30:00', '2026-03-06 15:22:00', 'DEVOLVIDO'),
    (12, 23, 12, '2026-03-03 12:00:00', '2026-03-10 12:00:00', '2026-03-10 11:15:00', 'DEVOLVIDO'),
    (13, 25, 13, '2026-03-05 16:00:00', '2026-03-12 16:00:00', '2026-03-11 09:30:00', 'DEVOLVIDO'),
    (14, 27, 14, '2026-03-08 09:00:00', '2026-03-15 09:00:00', '2026-03-14 10:00:00', 'DEVOLVIDO'),
    (15, 29, 15, '2026-03-10 14:15:00', '2026-03-17 14:15:00', '2026-03-17 11:45:00', 'DEVOLVIDO'),
    (16, 2, 16, '2026-04-01 11:00:00', '2026-04-08 11:00:00', '2026-04-07 16:00:00', 'DEVOLVIDO'),
    (17, 4, 17, '2026-04-04 15:00:00', '2026-04-11 15:00:00', '2026-04-11 14:30:00', 'DEVOLVIDO'),
    (18, 6, 18, '2026-04-06 09:30:00', '2026-04-13 09:30:00', '2026-04-12 10:15:00', 'DEVOLVIDO'),
    (19, 8, 19, '2026-04-10 13:00:00', '2026-04-17 13:00:00', '2026-04-16 17:10:00', 'DEVOLVIDO'),
    (20, 10, 20, '2026-04-12 16:45:00', '2026-04-19 16:45:00', '2026-04-19 15:00:00', 'DEVOLVIDO'),
    (21, 12, 21, '2026-05-02 10:00:00', '2026-05-09 10:00:00', '2026-05-08 11:30:00', 'DEVOLVIDO'),
    (22, 14, 22, '2026-05-05 14:20:00', '2026-05-12 14:20:00', '2026-05-12 13:00:00', 'DEVOLVIDO'),
    (23, 16, 23, '2026-05-08 09:00:00', '2026-05-15 09:00:00', '2026-05-14 10:45:00', 'DEVOLVIDO'),
    (24, 18, 24, '2026-05-10 11:15:00', '2026-05-17 11:15:00', '2026-05-16 16:20:00', 'DEVOLVIDO'),
    (25, 20, 25, '2026-05-15 15:30:00', '2026-05-22 15:30:00', '2026-05-22 14:00:00', 'DEVOLVIDO'),
    (26, 22, 26, '2026-06-01 10:00:00', '2026-06-08 10:00:00', '2026-06-07 11:10:00', 'DEVOLVIDO'),
    (27, 24, 27, '2026-06-03 14:00:00', '2026-06-10 14:00:00', '2026-06-10 12:45:00', 'DEVOLVIDO'),
    (28, 26, 28, '2026-06-05 09:30:00', '2026-06-12 09:30:00', '2026-06-11 15:15:00', 'DEVOLVIDO'),
    (29, 28, 29, '2026-06-08 16:00:00', '2026-06-15 16:00:00', '2026-06-15 14:30:00', 'DEVOLVIDO'),
    (30, 30, 30, '2026-06-10 11:00:00', '2026-06-17 11:00:00', '2026-06-16 16:50:00', 'DEVOLVIDO');

-- PARTE 2/2: 30 Empréstimos ATIVOS (Com Devolução Prevista para o Mês Que Vem - Agosto de 2026)
INSERT INTO "emprestimos" ("id_emprestimo", "id_livro", "id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status") VALUES
    (31, 1, 15, '2026-07-05 09:00:00', '2026-08-05 18:00:00', NULL, 'ATIVO'),
    (32, 2, 14, '2026-07-05 10:15:00', '2026-08-05 18:00:00', NULL, 'ATIVO'),
    (33, 3, 13, '2026-07-05 11:30:00', '2026-08-05 18:00:00', NULL, 'ATIVO'),
    (34, 4, 12, '2026-07-05 14:00:00', '2026-08-05 18:00:00', NULL, 'ATIVO'),
    (35, 5, 11, '2026-07-05 15:45:00', '2026-08-05 18:00:00', NULL, 'ATIVO'),
    (36, 6, 10, '2026-07-06 09:30:00', '2026-08-06 18:00:00', NULL, 'ATIVO'),
    (37, 7, 9, '2026-07-06 10:45:00', '2026-08-06 18:00:00', NULL, 'ATIVO'),
    (38, 8, 8, '2026-07-06 13:15:00', '2026-08-06 18:00:00', NULL, 'ATIVO'),
    (39, 9, 7, '2026-07-06 14:30:00', '2026-08-06 18:00:00', NULL, 'ATIVO'),
    (40, 10, 6, '2026-07-06 16:00:00', '2026-08-06 18:00:00', NULL, 'ATIVO'),
    (41, 11, 5, '2026-07-07 09:00:00', '2026-08-07 18:00:00', NULL, 'ATIVO'),
    (42, 12, 4, '2026-07-07 10:20:00', '2026-08-07 18:00:00', NULL, 'ATIVO'),
    (43, 13, 3, '2026-07-07 11:15:00', '2026-08-07 18:00:00', NULL, 'ATIVO'),
    (44, 14, 2, '2026-07-07 14:30:00', '2026-08-07 18:00:00', NULL, 'ATIVO'),
    (45, 15, 1, '2026-07-07 15:50:00', '2026-08-07 18:00:00', NULL, 'ATIVO'),
    (46, 16, 30, '2026-07-07 16:10:00', '2026-08-07 18:00:00', NULL, 'ATIVO'),
    (47, 17, 29, '2026-07-08 08:30:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (48, 18, 28, '2026-07-08 09:15:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (49, 19, 27, '2026-07-08 10:00:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (50, 20, 26, '2026-07-08 11:20:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (51, 21, 25, '2026-07-08 13:00:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (52, 22, 24, '2026-07-08 14:10:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (53, 23, 23, '2026-07-08 14:50:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (54, 24, 22, '2026-07-08 15:20:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (55, 25, 21, '2026-07-08 16:00:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (56, 26, 20, '2026-07-08 16:30:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (57, 27, 19, '2026-07-08 16:45:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (58, 28, 18, '2026-07-08 17:00:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (59, 29, 17, '2026-07-08 17:15:00', '2026-08-08 18:00:00', NULL, 'ATIVO'),
    (60, 30, 16, '2026-07-08 17:30:00', '2026-08-08 18:00:00', NULL, 'ATIVO');
