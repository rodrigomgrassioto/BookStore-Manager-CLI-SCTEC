import { AutorModel, AutorCadastro } from '../models/AutorModel';
import { pool } from '../database/connection';

export async function cadastrarAutor(
    nome: string, 
    nacionalidade?: string
): Promise<AutorModel> {
    const sql = 
        `INSERT INTO autores (nome, nacionalidade)
         VALUES ($1, $2)
         RETURNING *`;

    const result = await pool.query<AutorModel>(sql, [nome, nacionalidade ?? null]);
    return result.rows[0];
};

export async function listarAutores(): Promise<AutorModel[]> {
    const sql = 
    `SELECT * FROM autores`;

    const result = await pool.query<AutorModel>(sql, []);
    return result.rows || null;
};

export async function buscarAutorPorId(id_autor: number): Promise<AutorModel | null> {
    const sql = 
    `SELECT * FROM autores 
     WHERE id_autor = $1`;

    const result = await pool.query<AutorModel>(sql, [id_autor]);
    return result.rows[0] || null;
};

export async function atualizarAutor(id_autor: number, nome: string, nacionalidade?: string): Promise<AutorModel> {
    const sql = 
    `UPDATE autores 
     SET nome = $2, 
         nacionalidade = $3 
     WHERE id_autor = $1 
     RETURNING *`;

    const result = await pool.query<AutorModel>(sql, [id_autor, nome, nacionalidade ?? null]);
    return result.rows[0] ?? null;
};

export async function deletarAutor(id_autor: number): Promise<boolean> {
    const sql = 
    `DELETE FROM autores 
     WHERE id_autor = $1`;

     const result = await pool.query(sql, [id_autor]);
     return (result.rowCount ?? 0) > 0;
};
