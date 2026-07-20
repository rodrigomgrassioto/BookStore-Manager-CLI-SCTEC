import { ClienteModel, ClienteCadastro } from '../models/ClienteModel';
import { pool } from '../database/connection';

export interface IClienteRepository {
    criarClienteRP(nome: string, email: string, telefone: string, data_nascimento: Date): Promise<ClienteModel>
    listarClientesRP(): Promise<ClienteModel[]>
    buscarClientePorIdRP(id_cliente: number): Promise<ClienteModel | null>
    atualizarClienteRP(id_cliente: number, dados: ClienteCadastro): Promise<ClienteModel | null>
    deletarClienteRP(id_cliente: number): Promise<boolean>
}

export class ClienteRepository implements IClienteRepository {
    private readonly conexao: typeof pool;

    constructor(conexao: typeof pool = pool) {
        this.conexao = conexao;
    }

    public async criarClienteRP(nome: string, email: string, telefone: string, data_nascimento: Date): Promise<ClienteModel> {
        const sql = `INSERT INTO clientes (nome, email, telefone, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING *`;
        const r = await this.conexao.query<ClienteModel>(sql, [nome, email, telefone, data_nascimento]);

        if (!r.rows[0]) {
            throw new Error("Falha ao registrar cliente no banco de dados.");
        }

        return r.rows[0]
    }

    public async listarClientesRP(): Promise<ClienteModel[]> {
        const sql = `SELECT * FROM clientes`;
        const r = await this.conexao.query<ClienteModel>(sql);
        return r.rows;
    }

    public async buscarClientePorIdRP(id_cliente: number): Promise<ClienteModel | null> {
        const sql = `SELECT * FROM clientes WHERE id_cliente = $1`;
        const r = await this.conexao.query<ClienteModel>(sql, [id_cliente]);
        return r.rows[0] || null
    }

    public async atualizarClienteRP(id_cliente: number, dados: ClienteCadastro): Promise<ClienteModel | null> {
        const sql = `UPDATE clientes SET nome = $1, email = $2, telefone = $3, data_nascimento = $4 WHERE id_cliente = $5 RETURNING *`;
        const r = await this.conexao.query<ClienteModel>(sql, [
            dados.nome,
            dados.email,
            dados.telefone ?? '',
            dados.data_nascimento,
            id_cliente
        ]);
        return r.rows[0] || null;
    }

    public async deletarClienteRP(id_cliente: number): Promise<boolean> {
        const sql = `DELETE FROM clientes WHERE id_cliente = $1`;
        const r = await this.conexao.query(sql, [id_cliente]);
        return (r.rowCount ?? 0) > 0;
    }
}

