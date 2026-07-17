import {LivroCompletoModel, LivroModel} from "../models/LivroModel";
import {pool} from "../database/connection";
import {CriarEmprestimoModel, EmprestimoCompletoModel, LivrosPorClienteModel} from "../models/EmprestimoModel";
import configEmpresa from '../configuracoes_empresa.json';
import {buscarLivroPorIdServ} from "../services/LivroService";
import {QueryResult} from "pg";

export async function buscarEmprestimoPorIdRP(id: number): Promise<EmprestimoCompletoModel | null> {
    const sql = `
        SELECT
            e.id_emprestimo, e.id_cliente, e.data_emprestimo, e.data_devolucao_prevista, e.data_devolucao_real, e.status,
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.quantidade_emprestada, l.quantidade_disponivel, l.id_autor,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro,
            c.nome AS cliente_nome, c.email, c.telefone, c.data_nascimento, c.data_cadastro AS cliente_data_cadastro
        FROM emprestimos e
                 INNER JOIN emprestimo_livros el ON e.id_emprestimo = el.id_emprestimo
                 INNER JOIN livros l ON el.id_livro = l.id_livro
                 INNER JOIN autores a ON l.id_autor = a.id_autor
                 INNER JOIN clientes c ON e.id_cliente = c.id_cliente
        WHERE e.id_emprestimo = $1
    `;

    const result = await pool.query(sql, [id]);
    return tipaEmprestimoCompleto(result);
}

// Uso no teste antes de excluir livro
export async function livroJaFoiEmprestadoRP(id: number): Promise<boolean> {
    const sql = `
        SELECT id_livro
        FROM emprestimo_livros
        WHERE id_livro = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows.length > 0;
}

/**
 * COMO UTILIZAR
 * const result = await criarEmprestimoRP({
 *        id_cliente: 1,
 *        ids_livros: [1, 2],
 *        dias_para_devolucao: 3
 *    });
 *    console.log(result)
 */
export async function criarEmprestimoRP(dados: CriarEmprestimoModel): Promise< EmprestimoCompletoModel | null> {
    const { id_cliente, ids_livros, dias_para_devolucao = configEmpresa.dias_de_emprestimo } = dados;

    // Verifica se tem livro
    if (!ids_livros || ids_livros.length === 0)
        throw new Error("❌ Não é possível criar um empréstimo sem pelo menos um livro.");

    // Conexão exclusiva para gerenciar a transação
    const client = await pool.connect();
    try {
        // Inicia a transação no banco de dados
        await client.query('BEGIN');

        // Insere o cabeçalho na tabela 'empréstimos'
        const sqlEmprestimo = `
        INSERT INTO emprestimos (id_cliente, data_devolucao_prevista, status)
        VALUES ($1, NOW() + $2 * INTERVAL '1 day', 'ATIVO')
        RETURNING *;

    `;

        const resultadoEmprestimo = await client.query(sqlEmprestimo, [id_cliente, dias_para_devolucao]);
        const id_emprestimo = resultadoEmprestimo.rows[0].id_emprestimo;

        // adiciona livros
        const sqlPivo = `
        INSERT INTO emprestimo_livros (id_emprestimo, id_livro)
        VALUES ($1, $2);
    `;

        for (const id_livro of ids_livros) {
            const livroArray= await buscarLivroPorIdServ(id_livro)

            if (!livroArray || livroArray.length === 0)
                throw new Error(`❌ O livro com ID ${id_livro} não foi encontrado no sistema.`);

            const livro = livroArray[0];

            if (!configEmpresa.permitir_quantidade_livro_disponivel_negativo
                && livro.quantidade_disponivel <= 0)
                throw new Error(`❌ Estoque indisponível para o livro: "${livro.titulo}".`);

            await client.query(sqlPivo, [id_emprestimo, id_livro]);

            await client.query(`
            UPDATE livros 
            SET quantidade_emprestada = quantidade_emprestada + 1, 
                quantidade_disponivel = quantidade_disponivel - 1 
            WHERE id_livro = $1
        `, [id_livro]);
        }
        // dando certo confirma alterações
        await client.query('COMMIT');
        // console.log(resultadoEmprestimo.rows[0]);
        return  buscarEmprestimoPorIdRP(id_emprestimo) ?? null;
    } catch (error: any) {
        // Em caso de erro, desfaz TUDO
        await client.query('ROLLBACK');
        return null
    } finally {
        // Libera a conexão do banco de dados
        client.release();
    }
}
export async function devolucaoEmprestimoRP(id_emprestimo: number): Promise< EmprestimoCompletoModel | null> {
    const emprestimoAtual = await buscarEmprestimoPorIdRP(id_emprestimo);

    if (!emprestimoAtual) throw new Error("⚠ Empréstimo não encontrado.");
    if (emprestimoAtual.status === 'DEVOLVIDO') throw new Error("❌ Empréstimo devolvido anteriormente.");

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Atualiza o status na tab. principal
        const sqlAtualizarEmprestimo = `
            UPDATE emprestimos
            SET data_devolucao_real = NOW(),
                status = 'DEVOLVIDO'
            WHERE id_emprestimo = $1;
        `;
        await client.query(sqlAtualizarEmprestimo, [id_emprestimo]);

        // Atualizar estoque
        const sqlAtualizarEstoque = `
            UPDATE livros 
            SET quantidade_emprestada = quantidade_emprestada - 1, 
                quantidade_disponivel = quantidade_disponivel + 1 
            WHERE id_livro = $1;
        `;

        for (const livro of emprestimoAtual.livros) {
            await client.query(sqlAtualizarEstoque, [livro.id_livro]);
        }

        await client.query('COMMIT');

        // Retorna objeto atualizado
        return await buscarEmprestimoPorIdRP(id_emprestimo);

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function buscarLivrosComEmprestimosAtivosPorIdCliente(id_cliente: number): Promise<LivrosPorClienteModel | null> {
    const sql = `
        SELECT
            e.id_emprestimo, e.id_cliente, e.data_emprestimo, e.data_devolucao_prevista, e.data_devolucao_real, e.status,
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.quantidade_emprestada, l.quantidade_disponivel, l.id_autor,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro,
            c.id_cliente, c.nome AS cliente_nome, c.email, c.telefone, c.data_nascimento, c.data_cadastro AS cliente_data_cadastro
        FROM emprestimos e
                 INNER JOIN emprestimo_livros el ON e.id_emprestimo = el.id_emprestimo
                 INNER JOIN livros l ON el.id_livro = l.id_livro
                 INNER JOIN autores a ON l.id_autor = a.id_autor
                 INNER JOIN clientes c ON e.id_cliente = c.id_cliente
        WHERE c.id_cliente = $1 AND e.status = 'ATIVO'
    `;

    const result = await pool.query(sql, [id_cliente]);
    // const emprestimoCompleto = await tipaEmprestimoCompleto(result);
    // if (!emprestimoCompleto) return null;
    const livros = await mapLivros(result);
    if (!livros) return null
    return {
        nome_cliente: result.rows[0].cliente_nome,
        obs: "Retornando livros com empréstimo ativo por cliente",
        livros:livros,
    }
}

function mapLivros(result: QueryResult): any[] | null {
    if (result.rows.length === 0) return null;
    return result.rows.map((row) => ({
        id_livro: Number(row.id_livro),
        titulo: String(row.titulo),
        isbn: String(row.isbn),
        ano_publicacao: row.ano_publicacao ? Number(row.ano_publicacao) : null,
        quantidade_estoque: Number(row.quantidade_estoque),
        quantidade_emprestada: Number(row.quantidade_emprestada),
        quantidade_disponivel: Number(row.quantidade_disponivel),
        autor: {
            id_autor: Number(row.id_autor),
            nome: String(row.autor_nome),
            nacionalidade: row.autor_nacionalidade ? String(row.autor_nacionalidade) : null,
            data_cadastro: new Date(row.autor_data_cadastro)
        }
    }));
}

function tipaEmprestimoCompleto(result: QueryResult): EmprestimoCompletoModel | null {
    if (result.rows.length === 0) return null;

    const primeiraLinha = result.rows[0];
    const listaLivros = mapLivros(result) ?? [];

    return {
        id_emprestimo: Number(primeiraLinha.id_emprestimo),
        id_cliente: Number(primeiraLinha.id_cliente),
        data_emprestimo: new Date(primeiraLinha.data_emprestimo),
        data_devolucao_prevista: new Date(primeiraLinha.data_devolucao_prevista),
        data_devolucao_real: primeiraLinha.data_devolucao_real ? new Date(primeiraLinha.data_devolucao_real) : null,
        status: primeiraLinha.status as 'ATIVO' | 'DEVOLVIDO',
        cliente: {
            id_cliente: Number(primeiraLinha.id_cliente),
            nome: String(primeiraLinha.cliente_nome),
            email: String(primeiraLinha.email),
            telefone: primeiraLinha.telefone ? String(primeiraLinha.telefone) : null,
            data_nascimento: primeiraLinha.data_nascimento ? new Date(primeiraLinha.data_nascimento) : null,
            data_cadastro: new Date(primeiraLinha.cliente_data_cadastro)
        },
        livros: listaLivros
    };
}



