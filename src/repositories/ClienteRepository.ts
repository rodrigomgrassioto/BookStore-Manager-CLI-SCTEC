/* import { ClienteModel, ClienteCadastro } from '../models/ClienteModel';
import { pool } from '../database/connection';

// Cadastro novo cliente 
// recebe os dados de cadastro e retorna o cliente já com ID e data_cadastro gerado pelo BD.
export async function criarClienteRP(nome: string, email: string, telefone: string, data_nascimento: Date): Promise<ClienteModel> {
        const sql = `INSERT INTO clientes (nome, email, telefone, data_nascimento) VALUES ($1, $2, $3, $4) returning *`;

        const r = await pool.query<ClienteModel>(sql, [nome, email, telefone, data_nascimento]);
        return r.rows[0];
}


// Listar todos os clientes cadastrados
export async function listarClientesRP(): Promise<ClienteModel[]> {
    const sql = `SELECT * FROM clientes`;

    const r = await pool.query<ClienteModel>(sql);
    return r.rows;
}


// Buscar um cliente by nome - retorna null/undefined se não existir
export async function buscarClienteRP(nome: string): Promise<ClienteModel | null> {
    const sql = `SELECT * FROM clientes WHERE nome ILIKE $1`;

    const r = await pool.query<ClienteModel>(sql, [`%${nome}%`]);
    return r.rows[0] || null;
}

// Atualizar dados cliente por ID
// Recebe os dados novos (que podem ser parciais). Retorna o cliente atualizado
export async function atualizarClienteRP(id_cliente: number, dados: ClienteCadastro): Promise<ClienteModel | null> {
    const sql = `UPDATE clientes SET nome = $1, email = $2, telefone = $3, data_nascimento = $4 WHERE id_cliente = $5 RETURNING *`;

    const r = await pool.query<ClienteModel>(sql, [
        dados.nome, 
        dados.email, 
        dados.telefone, 
        dados.data_nascimento, 
        id_cliente
    ]);
    
    return r.rows[0] || null;
}

// Excluir cliente by ID - avisa confirmando se a exclusão foi feita com sucesso
export async function deletarClienteRP(id_cliente: number): Promise<boolean> {
    const sql = `DELETE FROM clientes WHERE id_cliente = $1`;
    const r = await pool.query(sql, [id_cliente]);

    if ((r.rowCount ?? 0) > 0) {
        console.log(`Cliente com ID ${id_cliente} deletado com sucesso.`);
    }
    return (r.rowCount ?? 0) > 0;
}
 */


import { ClienteModel, ClienteCadastro } from '../models/ClienteModel';
import { pool } from '../database/connection';

// Cadastro novo cliente - Retorna ClienteModel (completo)
/* export async function criarClienteRP(nome: string, email: string, telefone: string, data_nascimento: Date): Promise<ClienteModel> {
        const sql = `INSERT INTO clientes (nome, email, telefone, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING *`;
        const r = await pool.query<ClienteModel>(sql, [nome, email, telefone, data_nascimento]);
        return r.rows[0];
} */

export async function criarClienteRP(nome: string, email: string, telefone: string, data_nascimento: Date): Promise<ClienteModel> {
    const sql = `INSERT INTO clientes (nome, email, telefone, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING *`;
    const r = await pool.query<ClienteModel>(sql, [nome, email, telefone, data_nascimento]);
    
    if (!r.rows[0]) {
        throw new Error("Falha ao registrar cliente no banco de dados.");
    }
    
    return r.rows[0];
}

// Listar todos os clientes cadastrados
export async function listarClientesRP(): Promise<ClienteModel[]> {
    const sql = `SELECT * FROM clientes`;
    const r = await pool.query<ClienteModel>(sql);
    return r.rows;
}

// Buscar cliente por aproximação (Usado na busca do Menu)
export async function buscarClienteRP(nome: string): Promise<ClienteModel | null> {
    const sql = `SELECT * FROM clientes WHERE nome ILIKE $1`;
    const r = await pool.query<ClienteModel>(sql, [`%${nome}%`]);
    return r.rows[0] || null;
}

// Atualizar dados cliente por ID
export async function atualizarClienteRP(id_cliente: number, dados: ClienteCadastro): Promise<ClienteModel | null> {
    const sql = `UPDATE clientes SET nome = $1, email = $2, telefone = $3, data_nascimento = $4 WHERE id_cliente = $5 RETURNING *`;
    const r = await pool.query<ClienteModel>(sql, [
        dados.nome, 
        dados.email, 
        dados.telefone ?? '', // evita passar undefined pro banco se o model tiver ?
        dados.data_nascimento, 
        id_cliente
    ]);
    return r.rows[0] || null;
}

// Excluir cliente por ID
export async function deletarClienteRP(id_cliente: number): Promise<boolean> {
    const sql = `DELETE FROM clientes WHERE id_cliente = $1`;
    const r = await pool.query(sql, [id_cliente]);
    return (r.rowCount ?? 0) > 0;
}