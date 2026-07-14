-- ============================================================================
-- Descrição:                    Histórico de 15 Empréstimos ATIVOS
-- ============================================================================

-- 31. Empréstimo Natan Gomes
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'natan.gomes@email.com'), '2026-07-05 09:00:00', '2026-08-05 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Dom Casmurro'));

-- 32. Empréstimo Marina Rocha
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'marina.rocha@email.com'), '2026-07-05 10:15:00', '2026-08-05 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Memórias Póstumas de Brás Cubas'));

-- 33. Empréstimo Leonardo Cruz
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'leonardo.cruz@email.com'), '2026-07-05 11:30:00', '2026-08-05 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Hora da Estrela'));

-- 34. Empréstimo Katia Rodrigues
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'katia.rodrigues@email.com'), '2026-07-05 14:00:00', '2026-08-05 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Perto do Coração Selvagem'));

-- 35. Empréstimo Julio César
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'julio.cesar@email.com'), '2026-07-05 15:45:00', '2026-08-05 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = '1984'));

-- 36. Empréstimo Isabela Alves
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'isabela.alves@email.com'), '2026-07-06 09:30:00', '2026-08-06 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Revolution dos Bichos'));

-- 37. Empréstimo Hugo Martins
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'hugo.martins@email.com'), '2026-07-06 10:45:00', '2026-08-06 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Harry Potter e a Pedra Filosofal'));

-- 38. Empréstimo Gisele Ribeiro
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'gisele.ribeiro@email.com'), '2026-07-06 13:15:00', '2026-08-06 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Harry Potter e a Câmara Secreta'));

-- 39. Empréstimo Fabio Costa
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'fabio.costa@email.com'), '2026-07-06 14:30:00', '2026-08-06 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Iluminado'));

-- 40. Empréstimo Elena Pereira
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'elena.pereira@email.com'), '2026-07-06 16:00:00', '2026-08-06 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'It: A Coisa'));

-- 41. Empréstimo Diego Lima
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'diego.lima@email.com'), '2026-07-07 09:00:00', '2026-08-07 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Cem Anos de Solidão'));

-- 42. Empréstimo Carla Souza
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'carla.souza@email.com'), '2026-07-07 10:20:00', '2026-08-07 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Amor nos Tempos do Cólera'));

-- 43. Empréstimo Bruno Santos
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'bruno.santos@email.com'), '2026-07-07 11:15:00', '2026-08-07 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Hobbit'));

-- 44. Empréstimo Ana Oliveira
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'ana.oliveira@email.com'), '2026-07-07 14:30:00', '2026-08-07 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Senhor dos Anéis: A Sociedade do Anel'));

-- 45. Empréstimo Lucas Silva
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'lucas.silva@email.com'), '2026-07-07 15:50:00', '2026-08-07 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'E Não Sobrou Nenhum'));

-- 46. Empréstimo Erica Campos
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'erica.campos@email.com'), '2026-07-07 16:10:00', '2026-08-07 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Assassinato no Expresso do Oriente'));

-- 47. Empréstimo Daniel Faria
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'daniel.faria@email.com'), '2026-07-08 08:30:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Capitães da Areia'));

-- 48. Empréstimo Cintia Lopes
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'cintia.lopes@email.com'), '2026-07-08 09:15:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Dona Flor e Seus Dois Maridos'));

-- 49. Empréstimo Beto Barbosa
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'beto.barbosa@email.com'), '2026-07-08 10:00:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Mrs. Dalloway'));

-- 50. Empréstimo Alice Monteiro
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'alice.monteiro@email.com'), '2026-07-08 11:20:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Ao Farol'));

-- 51. Empréstimo Zeca Pagodinho
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'zeca.pagodinho@email.com'), '2026-07-08 13:00:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Velho e o Mar'));

-- 52. Empréstimo Yara Nogueira
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'yara.nogueira@email.com'), '2026-07-08 14:10:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Por Quem os Sinos Dobram'));

-- 53. Empréstimo William Carvalho
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'william.carvalho@email.com'), '2026-07-08 14:50:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Norwegian Wood'));

-- 54. Empréstimo Vanessa Dias
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'vanessa.dias@email.com'), '2026-07-08 15:20:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Kafka à Beira-Mar'));

-- 55. Empréstimo Uelinton Silva
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'uelinton.silva@email.com'), '2026-07-08 16:00:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Casa dos Espíritos'));

-- 56. Empréstimo Tatiana Ramos
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'tatiana.ramos@email.com'), '2026-07-08 16:30:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'De Amor e de Sombra'));

-- 57. Empréstimo Samuel Antunes
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'samuel.antunes@email.com'), '2026-07-08 16:45:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'Sentimento do Mundo'));

-- 58. Empréstimo Raquel Fonseca
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'raquel.fonseca@email.com'), '2026-07-08 17:00:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Rosa do Povo'));

-- 59. Empréstimo Pedro Cardoso
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'pedro.cardoso@email.com'), '2026-07-08 17:15:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'A Metamorfose'));

-- 60. Empréstimo Olivia Mendes
WITH novo_emp AS (
INSERT INTO "emprestimos" ("id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status")
VALUES ((SELECT id_cliente FROM clientes WHERE email = 'olivia.mendes@email.com'), '2026-07-08 17:30:00', '2026-08-08 18:00:00', NULL, 'ATIVO')
    RETURNING id_emprestimo
    )
INSERT INTO "emprestimo_livros" ("id_emprestimo", "id_livro") VALUES
    ((SELECT id_emprestimo FROM novo_emp), (SELECT id_livro FROM livros WHERE titulo = 'O Processo'));
