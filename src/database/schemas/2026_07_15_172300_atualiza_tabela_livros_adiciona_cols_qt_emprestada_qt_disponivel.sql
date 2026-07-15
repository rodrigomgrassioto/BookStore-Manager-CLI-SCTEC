-- Adiciona as novas colunas
ALTER TABLE livros
    ADD COLUMN quantidade_emprestada INTEGER NOT NULL DEFAULT 0;

ALTER TABLE livros
    ADD COLUMN quantidade_disponivel INTEGER NOT NULL DEFAULT 0;

-- Atualiza quantidade emprestada e disponível ** não necessário em novas implementações
-- UPDATE livros l
-- SET
--     quantidade_emprestada = COALESCE(subconsulta.total_ativo, 0),
--     quantidade_disponivel = l.quantidade_estoque - COALESCE(subconsulta.total_ativo, 0)
--     FROM (
--     SELECT el.id_livro, COUNT(el.id_livro) as total_ativo
--     FROM emprestimo_livros el
--     INNER JOIN emprestimos e ON el.id_emprestimo = e.id_emprestimo
--     WHERE e.status = 'ATIVO'
--     GROUP BY el.id_livro
-- ) AS subconsulta
-- WHERE l.id_livro = subconsulta.id_livro;
--
-- -- Livros que NÃO possuem empréstimo ativo a quantidade_disponivel igual à quantidade_estoque.
-- UPDATE livros
-- SET quantidade_disponivel = quantidade_estoque
-- WHERE quantidade_emprestada = 0;
