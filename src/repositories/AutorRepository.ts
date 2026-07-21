import {Autor, AutorModel} from '../models/AutorModel';
import { pool } from '../database/connection';

export interface IAutorRepository {
    cadastrarAutor(nome: string, nacionalidade?: string): Promise<AutorModel>;
    listarAutores(): Promise<AutorModel[]>;
    buscarAutorPorId(id_autor: number): Promise<AutorModel | null>;
    atualizarAutor(id_autor: number, nome: string, nacionalidade?: string): Promise<AutorModel>;
    deletarAutor(id_autor: number): Promise<boolean>;
}

export class AutorRepository implements IAutorRepository {
    private readonly conexao: typeof pool;

    constructor(conexao: typeof pool = pool) {
        this.conexao = conexao;
    }

    public async cadastrarAutor(nome: string, nacionalidade?: string): Promise<AutorModel> {
        const sql =
            `INSERT INTO autores (nome, nacionalidade)
         VALUES ($1, $2)
         RETURNING *`;

        const result = await this.conexao.query<AutorModel>(sql, [nome, nacionalidade ?? null]);
        return result.rows[0];
    }

    public async listarAutores(): Promise<AutorModel[]> {
        const sql =
            `SELECT * FROM autores`;

        const result = await this.conexao.query<AutorModel>(sql, []);
        return result.rows || null;
    }

    public async buscarAutorPorId(id_autor: number): Promise<AutorModel | null> {
        const sql =
            `SELECT * FROM autores 
     WHERE id_autor = $1`;

        const result = await this.conexao.query<AutorModel>(sql, [id_autor]);

        if (!result.rows || result.rows.length === 0) return null;
        const { id_autor: idDb, nome: nomeDb, nacionalidade, data_cadastro } = result.rows[0];

        return new Autor(idDb, nomeDb, nacionalidade, data_cadastro);
    }

    public async atualizarAutor(id_autor: number, nome: string, nacionalidade?: string): Promise<AutorModel> {
        const sql =
            `UPDATE autores 
     SET nome = $2, 
         nacionalidade = $3 
     WHERE id_autor = $1 
     RETURNING *`;

        const result = await this.conexao.query<AutorModel>(sql, [id_autor, nome, nacionalidade ?? null]);
        return result.rows[0] ?? null;
    }

    public async deletarAutor(id_autor: number): Promise<boolean> {
        const sql =
            `DELETE FROM autores 
     WHERE id_autor = $1`;

        const result = await this.conexao.query(sql, [id_autor]);
        return (result.rowCount ?? 0) > 0;
    }
}