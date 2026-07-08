import {Aluno} from "../types/aluno";
import {pool} from "../config/db";

// query tipada
export async function bucarTodosAlunos(): Promise<Aluno[] | null> {
    const sql = `SELECT * FROM alunos`
    const result =  await pool.query<Aluno>(sql);
    return await result.rows; // tipo Aluno
}

export async function buscarAlunoPorEmail(email:string): Promise<Aluno | null> {
    const sql = `SELECT * FROM alunos WHERE email = $1`;
    const result = await pool.query<Aluno>(sql, [email]);
    return result.rows[0];
}

export async function criarAluno(
    nome: string,email: string, curso: string):Promise<Aluno> {
    const sql = `
        INSERT INTO alunos (nome, email, curso)
        VALUES ($1, $2, $3)
        returning *`;

    const result = await pool.query<Aluno>(sql, [nome, email, curso]);
    return result.rows[0];
}

export async function atualizarAluno(
    id: number, curso: string):Promise<Aluno | null> {
    const sql = `
        UPDATE alunos
        SET curso = $1
        WHERE ID = $2
        RETURNING *`;

    const result = await pool.query<Aluno>(sql, [curso, id]);
    return result.rows[0] ?? null;
}

export async function deletarAluno(
    id: number):Promise<boolean> {
    const sql = `
        DELETE FROM alunos
        WHERE ID = $1`;

    const result = await pool.query<Aluno>(sql, [id]);
    return (result.rowCount ?? 0) > 0;
}
