-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           PostgreSQL 18.0 on x86_64-windows, compiled by msvc-19.44.35217, 64-bit
-- OS do Servidor:
-- HeidiSQL Versão:              12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando dados para a tabela public.autores: 1 rows
INSERT INTO "autores" ("id_autor", "nome", "nacionalidade", "data_nascimento") VALUES
    (1, 'tst autor', 'bras', '2026-07-06');

-- Copiando dados para a tabela public.clientes: 1 rows
INSERT INTO "clientes" ("id_cliente", "nome", "email", "telefone", "data_cadastro") VALUES
    (2, 'tst cli', 'sdf', NULL, '2026-07-06 22:36:00.290728');

-- Copiando dados para a tabela public.livros: 1 rows
INSERT INTO "livros" ("id_livro", "titulo", "isbn", "ano_publicacao", "quantidade_estoque", "id_autor") VALUES
    (3, 'tst livro', 'sf', NULL, 5, 1);

-- Copiando dados para a tabela public.emprestimos: 1 rows
INSERT INTO "emprestimos" ("id_emprestimo", "id_livro", "id_cliente", "data_emprestimo", "data_devolucao_prevista", "data_devolucao_real", "status") VALUES
    (1, 3, 2, '2026-07-06 23:36:43', '2026-07-15 23:36:50', NULL, 'ATRASADO');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
