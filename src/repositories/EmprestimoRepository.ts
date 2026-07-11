import {LivroCompletoModel} from "../models/LivroModel";
import {pool} from "../database/connection";

export async function buscarEmprestimoPorIdRP(id:number){
    const sql = `
        SELECT
            e.*,
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.id_autor,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade,
            c.nome AS cliente_nome, c.email, c.telefone, c.data_nascimento
        FROM  emprestimos e
                  JOIN livros l ON e.id_livro = l.id_livro
                  JOIN autores a ON l.id_autor = a.id_autor
                  JOIN clientes c ON e.id_cliente = c.id_cliente
        WHERE e.id_emprestimo = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows.map((row) => ({
        id_emprestimo: row.id_emprestimo,
        id_livro: row.id_livro,
        id_cliente: row.id_cliente,
        data_emprestimo: row.data_emprestimo,
        data_devolucao_prevista: row.data_devolucao_prevista,
        data_devolucao_real: row.data_devolucao_real,
        status: row.status,
        livro: {
            id_livro: row.id_livro,
            titulo: row.titulo,
            isbn: row.isbn,
            ano_publicacao: row.ano_publicacao,
            // quantidade_estoque: row.quantidade_estoque,
            autor: {
                id_autor: row.id_autor,
                nome: row.autor_nome,
                nacionalidade: row.autor_nacionalidade,
            },
        },
        cliente: {
            id_cliente: row.id_cliente,
            nome: row.cliente_nome,
            email: row.email,
            telefone: row.telefone,
            data_nascimento: row.data_nascimento,
        }
    }));
}

export async function livroJaFoiEmprestadoRP(id:number): Promise<boolean>{
    const sql = `
        SELECT id_emprestimo, id_livro FROM emprestimos
        WHERE id_livro = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows.length > 0;
}
