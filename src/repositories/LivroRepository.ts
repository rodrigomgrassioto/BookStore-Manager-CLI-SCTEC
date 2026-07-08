import { LivroModel, LivroComAutorModel } from "../models/LivroModel";
import {pool} from "../database/connection";

// query tipada
export async function buscarTodosLivrosComAutor(): Promise<LivroComAutorModel[] | null> {
    const sql = `
        SELECT
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.id_autor, l.data_cadastro,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro
        FROM livros l
            JOIN autores a ON l.id_autor = a.id_autor
    `;
    const result =  await pool.query(sql);

    const res = result.rows.map((row) => ({
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
    return res;



    // return await result.rows; // tipo Aluno
}

// export async function buscarAlunoPorEmail(email:string): Promise<Aluno | null> {
//     const sql = `SELECT * FROM alunos WHERE email = $1`;
//     const result = await pool.query<Aluno>(sql, [email]);
//     return result.rows[0];
// }
//
// export async function criarAluno(
//     nome: string,email: string, curso: string):Promise<Aluno> {
//     const sql = `
//         INSERT INTO alunos (nome, email, curso)
//         VALUES ($1, $2, $3)
//         returning *`;
//
//     const result = await pool.query<Aluno>(sql, [nome, email, curso]);
//     return result.rows[0];
// }
//
// export async function atualizarAluno(
//     id: number, curso: string):Promise<Aluno | null> {
//     const sql = `
//         UPDATE alunos
//         SET curso = $1
//         WHERE ID = $2
//         RETURNING *`;
//
//     const result = await pool.query<Aluno>(sql, [curso, id]);
//     return result.rows[0] ?? null;
// }
//
// export async function deletarAluno(
//     id: number):Promise<boolean> {
//     const sql = `
//         DELETE FROM alunos
//         WHERE ID = $1`;
//
//     const result = await pool.query<Aluno>(sql, [id]);
//     return (result.rowCount ?? 0) > 0;
// }
