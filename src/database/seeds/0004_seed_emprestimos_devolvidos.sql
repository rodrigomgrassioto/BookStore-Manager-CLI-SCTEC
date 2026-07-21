-- ============================================================================
-- Servidor:                     127.0.0.1
-- Banco de Dados:               sctec_bookstore (PostgreSQL)
-- Script:                       0004_seed_emprestimos_devolvidos.sql (Dados de Teste N:N)
-- Descrição:                    Histórico de 30 Empréstimos já DEVOLVIDOS
-- ============================================================================

-- 1. Empréstimo Lucas Silva
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'lucas.silva@email.com'), '2026-01-10 10:00:00', '2026-01-17 10:00:00', '2026-01-15 14:20:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Dom Casmurro'));

-- 2. Empréstimo Ana Oliveira
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'ana.oliveira@email.com'), '2026-01-12 11:30:00', '2026-01-19 11:30:00', '2026-01-19 09:15:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Hora da Estrela'));

-- 3. Empréstimo Bruno Santos
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'bruno.santos@email.com'), '2026-01-15 14:00:00', '2026-01-22 14:00:00', '2026-01-21 16:45:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = '1984'));

-- 4. Empréstimo Carla Souza
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'carla.souza@email.com'), '2026-01-18 09:00:00', '2026-01-25 09:00:00', '2026-01-24 11:00:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Harry Potter e a Pedra Filosofal'));

-- 5. Empréstimo Diego Lima
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'diego.lima@email.com'), '2026-01-20 16:15:00', '2026-01-27 16:15:00', '2026-01-27 15:30:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Iluminado'));

-- 6. Empréstimo Elena Pereira
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'elena.pereira@email.com'), '2026-02-01 10:00:00', '2026-02-08 10:00:00', '2026-02-07 11:00:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Cem Anos de Solidão'));

-- 7. Empréstimo Fabio Costa
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'fabio.costa@email.com'), '2026-02-03 11:00:00', '2026-02-10 11:00:00', '2026-02-10 10:45:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Hobbit'));

-- 8. Empréstimo Gisele Ribeiro
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'gisele.ribeiro@email.com'), '2026-02-05 15:30:00', '2026-02-12 15:30:00', '2026-02-11 17:00:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'E Não Sobrou Nenhum'));

-- 9. Empréstimo Hugo Martins
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'hugo.martins@email.com'), '2026-02-10 09:20:00', '2026-02-17 09:20:00', '2026-02-16 14:10:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Capitães da Areia'));

-- 10. Empréstimo Isabela Alves
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'isabela.alves@email.com'), '2026-02-12 14:00:00', '2026-02-19 14:00:00', '2026-02-19 13:50:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Mrs. Dalloway'));

-- 11. Empréstimo Julio César
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'julio.cesar@email.com'), '2026-03-01 10:30:00', '2026-03-08 10:30:00', '2026-03-06 15:22:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Velho e o Mar'));

-- 12. Empréstimo Katia Rodrigues
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'katia.rodrigues@email.com'), '2026-03-03 12:00:00', '2026-03-10 12:00:00', '2026-03-10 11:15:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Norwegian Wood'));

-- 13. Empréstimo Leonardo Cruz
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'leonardo.cruz@email.com'), '2026-03-05 16:00:00', '2026-03-12 16:00:00', '2026-03-11 09:30:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Casa dos Espíritos'));

-- 14. Empréstimo Marina Rocha
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'marina.rocha@email.com'), '2026-03-08 09:00:00', '2026-03-15 09:00:00', '2026-03-14 10:00:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Sentimento do Mundo'));

-- 15. Empréstimo Natan Gomes
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'natan.gomes@email.com'), '2026-03-10 14:15:00', '2026-03-17 14:15:00', '2026-03-17 11:45:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Metamorfose'));

-- 16. Empréstimo Olivia Mendes
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'olivia.mendes@email.com'), '2026-04-01 11:00:00', '2026-04-08 11:00:00', '2026-04-07 16:00:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Memórias Póstumas de Brás Cubas'));

-- 17. Empréstimo Pedro Cardoso
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'pedro.cardoso@email.com'), '2026-04-04 15:00:00', '2026-04-11 15:00:00', '2026-04-11 14:30:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Perto do Coração Selvagem'));

-- 18. Empréstimo Raquel Fonseca
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
    VALUES ((SELECT id_cliente FROM clientes WHERE email = 'raquel.fonseca@email.com'), '2026-04-06 09:30:00', '2026-04-13 09:30:00', '2026-04-12 10:15:00', 'DEVOLVIDO')
        RETURNING id_emprestimo
        )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Revolution dos Bichos'));

-- 19. Empréstimo Samuel Antunes
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'samuel.antunes@email.com'), '2026-04-10 13:00:00', '2026-04-17 13:00:00', '2026-04-16 17:10:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Harry Potter e a Câmara Secreta'));

-- 20. Empréstimo Tatiana Ramos
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'tatiana.ramos@email.com'), '2026-04-12 16:45:00', '2026-04-19 16:45:00', '2026-04-19 15:00:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'It: A Coisa'));

-- 21. Empréstimo Uelinton Silva
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'uelinton.silva@email.com'), '2026-05-02 10:00:00', '2026-05-09 10:00:00', '2026-05-08 11:30:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Amor nos Tempos do Cólera'));

-- 22. Empréstimo Vanessa Dias
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'vanessa.dias@email.com'), '2026-05-05 14:20:00', '2026-05-12 14:20:00', '2026-05-12 13:00:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Senhor dos Anéis: A Sociedade do Anel'));

-- 23. Empréstimo William Carvalho
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'william.carvalho@email.com'), '2026-05-08 09:00:00', '2026-05-15 09:00:00', '2026-05-14 10:45:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Assassinato no Expresso do Oriente'));

-- 24. Empréstimo Yara Nogueira
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'yara.nogueira@email.com'), '2026-05-10 11:15:00', '2026-05-17 11:15:00', '2026-05-16 16:20:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Dona Flor e Seus Dois Maridos'));

-- 25. Empréstimo Zeca Pagodinho
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'zeca.pagodinho@email.com'), '2026-05-15 15:30:00', '2026-05-22 15:30:00', '2026-05-22 14:00:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Ao Farol'));

-- 26. Empréstimo Alice Monteiro
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'alice.monteiro@email.com'), '2026-06-01 10:00:00', '2026-06-08 10:00:00', '2026-06-07 11:10:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Por Quem os Sinos Dobram'));

-- 27. Empréstimo Beto Barbosa
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'beto.barbosa@email.com'), '2026-06-03 14:00:00', '2026-06-10 14:00:00', '2026-06-10 12:45:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Kafka à Beira-Mar'));

-- 28. Empréstimo Cintia Lopes
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'cintia.lopes@email.com'), '2026-06-05 09:30:00', '2026-06-12 09:30:00', '2026-06-11 15:15:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'De Amor e de Sombra'));

-- 29. Empréstimo Daniel Faria
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'daniel.faria@email.com'), '2026-06-08 16:00:00', '2026-06-15 16:00:00', '2026-06-15 14:30:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Rosa do Povo'));

-- 30. Empréstimo Erica Campos
WITH novo_emp AS (
INSERT INTO emprestimos (id_cliente, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status)
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'erica.campos@email.com'), '2026-06-10 11:00:00', '2026-06-17 11:00:00', '2026-06-16 16:50:00', 'DEVOLVIDO')
    RETURNING id_emprestimo
    )
INSERT INTO emprestimo_livros (id_emprestimo, id_livro) VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Processo'));
