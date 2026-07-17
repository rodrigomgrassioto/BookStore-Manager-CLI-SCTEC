import { pool } from "../database/connection";
import {
    LivroDisponivelModel,
    LivroEmprestadoModel,
    LivroPorAutorModel,
    EmprestimosPorLivroModel,
    ClienteComEmprestimoAtivoModel
} from "../models/RelatorioModel";

// livros disponíveis
export async function livrosDisponiveisRP(): Promise<LivroDisponivelModel[]> {
    const sql = `
        SELECT l.id_livro, l.titulo, l.isbn, l.quantidade_estoque, l.quantidade_disponivel,
               a.nome AS autor_nome
        FROM livros l
        INNER JOIN autores a ON l.id_autor = a.id_autor
        WHERE l.quantidade_disponivel > 0
        ORDER BY l.titulo ASC
    `;
    const result = await pool.query(sql);
    return result.rows.map((row) => ({
        id_livro: Number(row.id_livro),
        titulo: String(row.titulo),
        isbn: String(row.isbn),
        quantidade_estoque: Number(row.quantidade_estoque),
        quantidade_disponivel: Number(row.quantidade_disponivel),
        autor_nome: String(row.autor_nome)
    }));
}

// livros emprestados
export async function livrosEmprestadosRP(): Promise<LivroEmprestadoModel[]> {
    const sql = `
        SELECT l.id_livro, l.titulo, l.isbn, l.quantidade_emprestada,
               a.nome AS autor_nome
        FROM livros l
        INNER JOIN autores a ON l.id_autor = a.id_autor
        WHERE l.quantidade_emprestada > 0
        ORDER BY l.quantidade_emprestada DESC, l.titulo ASC
    `;
    const result = await pool.query(sql);
    return result.rows.map((row) => ({
        id_livro: Number(row.id_livro),
        titulo: String(row.titulo),
        isbn: String(row.isbn),
        quantidade_emprestada: Number(row.quantidade_emprestada),
        autor_nome: String(row.autor_nome)
    }));
}

// livros cadastrados por autor
export async function livrosCadastradosPorAutorRP(): Promise<LivroPorAutorModel[]> {
    const sql = `
        SELECT a.id_autor, a.nome AS autor_nome, l.id_livro, l.titulo
        FROM autores a
        LEFT JOIN livros l ON l.id_autor = a.id_autor
        ORDER BY a.nome ASC, l.titulo ASC
    `;
    const result = await pool.query(sql);
    return result.rows.map((row) => ({
        id_autor: Number(row.id_autor),
        autor_nome: String(row.autor_nome),
        id_livro: row.id_livro !== null ? Number(row.id_livro) : null,
        titulo: row.titulo !== null ? String(row.titulo) : null
    }));
}

// quantidade de empréstimos por livro
export async function quantidadeEmprestimosPorLivroRP(): Promise<EmprestimosPorLivroModel[]> {
    const sql = `
        SELECT l.id_livro, l.titulo, COUNT(el.id_emprestimo) AS total_emprestimos
        FROM livros l
        LEFT JOIN emprestimo_livros el ON el.id_livro = l.id_livro
        GROUP BY l.id_livro, l.titulo
        ORDER BY total_emprestimos DESC, l.titulo ASC
    `;
    const result = await pool.query(sql);
    return result.rows.map((row) => ({
        id_livro: Number(row.id_livro),
        titulo: String(row.titulo),
        total_emprestimos: Number(row.total_emprestimos)
    }));
}

// Clientes com empréstimos ativos
export async function clientesComEmprestimosAtivosRP(): Promise<ClienteComEmprestimoAtivoModel[]> {
    const sql = `
        SELECT c.id_cliente, c.nome AS cliente_nome, c.email,
               l.id_livro, l.titulo, e.data_devolucao_prevista
        FROM clientes c
        INNER JOIN emprestimos e ON e.id_cliente = c.id_cliente AND e.status = 'ATIVO'
        INNER JOIN emprestimo_livros el ON el.id_emprestimo = e.id_emprestimo
        INNER JOIN livros l ON l.id_livro = el.id_livro
        ORDER BY c.nome ASC, e.data_devolucao_prevista ASC
    `;
    const result = await pool.query(sql);
    return result.rows.map((row) => ({
        id_cliente: Number(row.id_cliente),
        cliente_nome: String(row.cliente_nome),
        email: String(row.email),
        id_livro: Number(row.id_livro),
        titulo: String(row.titulo),
        data_devolucao_prevista: new Date(row.data_devolucao_prevista)
    }));
}
