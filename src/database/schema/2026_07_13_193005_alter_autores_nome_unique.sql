-- Altera a tabela "autores" para adicionar uma restrição de unicidade na coluna "nome"
ALTER TABLE autores ADD CONSTRAINT uq_autores_nome UNIQUE (nome);