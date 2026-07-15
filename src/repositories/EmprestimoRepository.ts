import {LivroCompletoModel} from "../models/LivroModel";
import {pool} from "../database/connection";
import {EmprestimoCompletoModel} from "../models/EmprestimoModel";

export async function buscarEmprestimoPorIdRP(id: number): Promise<EmprestimoCompletoModel | null> {
    const sql = `
        SELECT
            e.id_emprestimo, e.id_cliente, e.data_emprestimo, e.data_devolucao_prevista, e.data_devolucao_real, e.status,
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.id_autor,
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

    if (result.rows.length === 0) {
        return null;
    }

    const primeiraLinha = result.rows[0];

    // Mapeia as linhas para preencher o array de livros respeitando a interface LivroComAutorModel
    const livros = result.rows.map((row) => ({
        id_livro: Number(row.id_livro),
        titulo: String(row.titulo),
        isbn: String(row.isbn),
        ano_publicacao: row.ano_publicacao ? Number(row.ano_publicacao) : null,
        // quantidade_estoque: Number(row.quantidade_estoque),
        autor: {
            id_autor: Number(row.id_autor),
            nome: String(row.autor_nome),
            nacionalidade: row.autor_nacionalidade ? String(row.autor_nacionalidade) : null,
            data_cadastro: new Date(row.autor_data_cadastro), // Garante que seja um objeto Date
        },
    }));

    // Retorna o objeto formatado exatamente como a EmprestimoCompletoModel espera
    return {
        id_emprestimo: Number(primeiraLinha.id_emprestimo),
        id_cliente: Number(primeiraLinha.id_cliente),
        data_emprestimo: new Date(primeiraLinha.data_emprestimo),
        data_devolucao_prevista: new Date(primeiraLinha.data_devolucao_prevista),
        data_devolucao_real: primeiraLinha.data_devolucao_real ? new Date(primeiraLinha.data_devolucao_real) : null,
        status: primeiraLinha.status as 'ATIVO' | 'DEVOLVIDO', // Type cast para o enum do TS
        cliente: {
            id_cliente: Number(primeiraLinha.id_cliente),
            nome: String(primeiraLinha.cliente_nome),
            email: String(primeiraLinha.email),
            telefone: primeiraLinha.telefone ? String(primeiraLinha.telefone) : null,
            data_nascimento: primeiraLinha.data_nascimento ? new Date(primeiraLinha.data_nascimento) : null,
            data_cadastro: new Date(primeiraLinha.cliente_data_cadastro),
        },
        livros: livros,
    };
}



// Uso no teste antes de excluir livro
export async function livroJaFoiEmprestadoRP(id:number): Promise<boolean>{
    const sql = `
        SELECT id_emprestimo, id_livro FROM emprestimos
        WHERE id_livro = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows.length > 0;
}
