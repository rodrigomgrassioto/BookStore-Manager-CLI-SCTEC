import {Livro, LivroCompletoModel, LivroModel} from "../models/LivroModel";
import {pool} from "../database/connection";

export interface ILivroRepository {
    listarLivrosRP(): Promise<LivroCompletoModel[]>
    buscarLivroPorIdRP(id:number): Promise<LivroCompletoModel[]>
    buscarLivroPorIsbnRP(isbn:string): Promise<LivroCompletoModel[]>
    buscarLivroPorTituloRP(titulo:string): Promise<LivroCompletoModel[]>
    criaLivroRP(titulo: string,isbn: string, quantidade_estoque: number, id_autor: number,
                ano_publicacao?: number | null):Promise<LivroModel>
    atualizarLivroRP(id_livro: number, titulo: string, isbn: string, quantidade_estoque:number, id_autor: number,
        ano_publicacao?: number | null):Promise<LivroModel | null>
    deletarLivroRP(id: number):Promise<boolean>
}

export class LivroRepository implements ILivroRepository {

    private readonly conexao: typeof pool;

    constructor(conexao: typeof pool = pool) {
        this.conexao = conexao;
    }

    public async listarLivrosRP(): Promise<LivroCompletoModel[]> {
        const sql = `
        SELECT
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.quantidade_emprestada, l.quantidade_disponivel, l.id_autor, l.data_cadastro,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro
        FROM livros l
            JOIN autores a ON l.id_autor = a.id_autor
        ORDER BY l.id_livro
    `;
        const result =  await this.conexao.query(sql);

        return result.rows.map((row) => ({
            id_livro: row.id_livro,
            titulo: row.titulo,
            isbn: row.isbn,
            ano_publicacao: row.ano_publicacao,
            quantidade_estoque: row.quantidade_estoque,
            quantidade_emprestada: row.quantidade_emprestada,
            quantidade_disponivel: row.quantidade_disponivel,
            id_autor: row.id_autor,
            data_cadastro: row.data_cadastro,
            autor: {
                nome: row.autor_nome,
                nacionalidade: row.autor_nacionalidade,
                data_cadastro: row.autor_data_cadastro,
            },
        }))
    }

    public async buscarLivroPorIdRP(id:number): Promise<LivroCompletoModel[]> {
        const sql = `
        SELECT
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.quantidade_emprestada, l.quantidade_disponivel, l.id_autor, l.data_cadastro,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro
        FROM livros l
            JOIN autores a ON l.id_autor = a.id_autor
        WHERE l.id_livro = $1
    `;

        const result = await this.conexao.query(sql, [id]);

        return result.rows.map((row) => {
            const {
                id_livro,
                titulo,
                isbn,
                ano_publicacao,
                quantidade_estoque,
                quantidade_emprestada,
                quantidade_disponivel,
                id_autor,
                autor_nome,
                autor_nacionalidade
            } = row;

            return new Livro(
                id_livro,
                titulo,
                isbn,
                ano_publicacao,
                quantidade_estoque,
                quantidade_emprestada,
                quantidade_disponivel,
                id_autor,
                {
                    nome: autor_nome,
                    nacionalidade: autor_nacionalidade
                }
            ) as unknown as LivroCompletoModel;
        });

    }

    public async buscarLivroPorIsbnRP(isbn:string): Promise<LivroCompletoModel[]> {
        const sql = `
        SELECT
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.id_autor, l.data_cadastro,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro
        FROM livros l
            JOIN autores a ON l.id_autor = a.id_autor
        WHERE l.isbn = $1
    `;

        const result = await this.conexao.query(sql, [isbn]);

        return result.rows.map((row) => ({
            id_livro: row.id_livro,
            titulo: row.titulo,
            isbn: row.isbn,
            ano_publicacao: row.ano_publicacao,
            quantidade_estoque: row.quantidade_estoque,
            quantidade_emprestada: row.quantidade_emprestada,
            quantidade_disponivel: row.quantidade_disponivel,
            id_autor: row.id_autor,
            data_cadastro: row.data_cadastro,
            autor: {
                nome: row.autor_nome,
                nacionalidade: row.autor_nacionalidade,
                data_cadastro: row.autor_data_cadastro,
            },
        }))
    }

    public async buscarLivroPorTituloRP(titulo:string): Promise<LivroCompletoModel[]> {
        const sql = `
        SELECT
            l.id_livro, l.titulo, l.isbn, l.ano_publicacao, l.quantidade_estoque, l.id_autor, l.data_cadastro,
            a.nome AS autor_nome, a.nacionalidade AS autor_nacionalidade, a.data_cadastro AS autor_data_cadastro
        FROM livros l
            JOIN autores a ON l.id_autor = a.id_autor
        WHERE l.titulo ILIKE $1
    `;

        const result = await this.conexao.query(sql, ['%'+titulo+'%']);

        return result.rows.map((row) => ({
            id_livro: row.id_livro,
            titulo: row.titulo,
            isbn: row.isbn,
            ano_publicacao: row.ano_publicacao,
            quantidade_estoque: row.quantidade_estoque,
            quantidade_emprestada: row.quantidade_emprestada,
            quantidade_disponivel: row.quantidade_disponivel,
            id_autor: row.id_autor,
            data_cadastro: row.data_cadastro,
            autor: {
                nome: row.autor_nome,
                nacionalidade: row.autor_nacionalidade,
                data_cadastro: row.autor_data_cadastro,
            },
        }))
    }

    public async criaLivroRP(
        titulo: string,isbn: string, quantidade_estoque: number, id_autor: number, ano_publicacao?: number | null)
        :Promise<LivroModel> {
        const sql = `
        INSERT INTO livros (titulo,isbn, ano_publicacao, quantidade_estoque, quantidade_disponivel, id_autor)
        VALUES ($1, $2, $3, $4,$5, $6)
        returning *`;

        const result = await this.conexao.query<LivroModel>(sql, [titulo,isbn, ano_publicacao ?? null, quantidade_estoque, quantidade_estoque, id_autor]);
        return result.rows[0] ?? null;
    }

    public async atualizarLivroRP(id_livro: number, titulo: string, isbn: string, quantidade_estoque:number, id_autor: number,
                                  ano_publicacao?: number | null):Promise<LivroModel | null> {
        const sql = `
        UPDATE livros
        SET titulo = $2,
            isbn = $3,
            ano_publicacao = $4,
            quantidade_estoque = $5,
            quantidade_disponivel = $5 - quantidade_emprestada,
            id_autor = $6
        WHERE id_livro = $1
        RETURNING *`;

        const result = await this.conexao.query<LivroModel>(sql, [id_livro, titulo, isbn, ano_publicacao ?? null, quantidade_estoque, id_autor]);
        return result.rows[0] ?? null;
    }

    public async deletarLivroRP(
        id: number):Promise<boolean> {
        const sql = `
        DELETE FROM livros
        WHERE id_livro = $1`;

        const result = await this.conexao.query<LivroModel>(sql, [id]);
        return (result.rowCount ?? 0) > 0;
    }

}
