import {LivroCompletoModel, LivroModel} from "../models/LivroModel";
import {pool} from "../database/connection";

// query tipada
export async function listarLivros(): Promise<LivroCompletoModel[]> {
    const sql = `
        SELECT
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.id_autor, l.data_cadastro,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro
        FROM livros l
            JOIN autores a ON l.id_autor = a.id_autor
    `;
    const result =  await pool.query(sql);

    return result.rows.map((row) => ({
        id_livro: row.id_livro,
        titulo: row.titulo,
        isbn: row.isbn,
        ano_publicacao: row.ano_publicacao,
        quantidade_estoque: row.quantidade_estoque,
        id_autor: row.id_autor,
        data_cadastro: row.data_cadastro,
        autor: {
            nome: row.autor_nome,
            nacionalidade: row.autor_nacionalidade,
            data_cadastro: row.autor_data_cadastro,
        },
    }));
}

export async function buscarLivroPorTitulo(titulo:string): Promise<LivroCompletoModel[]> {
    const sql = `
        SELECT
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.id_autor, l.data_cadastro,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro
        FROM livros l
            JOIN autores a ON l.id_autor = a.id_autor
        WHERE l.titulo ILIKE $1
    `;

    const result = await pool.query(sql, [titulo+'%']);

    return result.rows.map((row) => ({
        id_livro: row.id_livro,
        titulo: row.titulo,
        isbn: row.isbn,
        ano_publicacao: row.ano_publicacao,
        quantidade_estoque: row.quantidade_estoque,
        id_autor: row.id_autor,
        data_cadastro: row.data_cadastro,
        autor: {
            nome: row.autor_nome,
            nacionalidade: row.autor_nacionalidade,
            data_cadastro: row.autor_data_cadastro,
        },
    }));
}

export async function criaLivro(
    titulo: string,isbn: string, ano_publicacao: number, quantidade_estoque: number, id_autor: number)
    :Promise<LivroCompletoModel > {
    const sql = `
        INSERT INTO livros (titulo,isbn, ano_publicacao, quantidade_estoque, id_autor)
        VALUES ($1, $2, $3, $4, $5)
        returning *`;

    const result = await pool.query<LivroCompletoModel>(sql, [titulo,isbn, ano_publicacao, quantidade_estoque, id_autor]);
    return result.rows[0] ?? 'não criado';
}

// export async function atualizarLivro(
//     id_livro: number, titulo: string, isbn: string, ano_publicacao: number, quantidade_estoque:number, id_autor: number):Promise<Aluno | null> {
//     const sql = `
//         UPDATE livros
//         SET titulo = $2
//         SET isbn = $3
//         SET ano_publicacao = $4
//         SET quantidade_estoque = $5
//         SET id_autor = $6
//         WHERE ID = $1
//         RETURNING *`;
//
//     const result = await pool.query<Aluno>(sql, [id_livro, titulo, isbn, ano_publicacao, quantidade_estoque, id_autor]);
//     return result.rows[0] ?? null;
// }

// export async function deletarAluno(
//     id: number):Promise<boolean> {
//     const sql = `
//         DELETE FROM alunos
//         WHERE ID = $1`;
//
//     const result = await pool.query<Aluno>(sql, [id]);
//     return (result.rowCount ?? 0) > 0;
// }
