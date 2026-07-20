import {LivroCompletoModel, LivroModel} from "../models/LivroModel";

import {validarISBN} from "../utils/validadores";
import {livroJaFoiEmprestadoRP} from "../repositories/EmprestimoRepository";
import {ILivroRepository} from "../repositories/LivroRepository";

export interface ILivroService {
    listarLivrosServ(): Promise<LivroCompletoModel[]>
    buscarLivroPorIdServ(id: number): Promise<LivroCompletoModel[]>
    buscarLivroPorIsbnServ(isbn: string): Promise<LivroCompletoModel[]>
    buscarLivroPorTituloServ (titulo:string): Promise<LivroCompletoModel[]>
    criarLivroServ(titulo: string, isbn: string, quantidade_estoque: number,
        id_autor: number, ano_publicacao?: number | null): Promise<LivroModel>
    atualizarLivroServ(
        id_livro: number, titulo: string, isbn: string, quantidade_estoque:number,
        id_autor: number, ano_publicacao?: number|null):Promise<LivroModel>
    deletarLivroServ(id: number):Promise<boolean>
}

export class LivroService implements ILivroService{
    private readonly repositorio: ILivroRepository;


    constructor(repositorio: ILivroRepository) {
        this.repositorio = repositorio;
    }

    public async listarLivrosServ(): Promise<LivroCompletoModel[]>  {
        return await this.repositorio.listarLivrosRP();
    }

    public async buscarLivroPorIdServ(id: number): Promise<LivroCompletoModel[]>  {
        if (id == 0) throw new Error("❌ ID não pode ser ZERO.", );

        if (!id) throw new Error("❌ Necessário informar ID.");

        if (!Number.isInteger(id)) throw new Error("❌ Id ser um número inteiro.");

        return await this.repositorio.buscarLivroPorIdRP(id);
    }

    public async buscarLivroPorIsbnServ(isbn: string): Promise<LivroCompletoModel[]>  {
        if (!isbn)
            throw new Error("❌ Necessário informar ISBN.");
        return await this.repositorio.buscarLivroPorIsbnRP(isbn);
    }

    public async buscarLivroPorTituloServ (titulo:string): Promise<LivroCompletoModel[]>{
        if (!titulo || !titulo.trim())
            throw new Error("❌ Necessário informar título.");

        const livros = await this.repositorio.buscarLivroPorTituloRP(titulo);

        if (livros.length === 0) throw new Error(`❌ Nenhum resulto pelo termo: ${titulo}.`);

        return livros;
    };

    public async criarLivroServ(
        titulo: string, isbn: string, quantidade_estoque: number,
        id_autor: number, ano_publicacao?: number | null): Promise<LivroModel> {

        if (!titulo || !titulo.trim() || !isbn || !isbn.trim() || !quantidade_estoque || !id_autor)
            throw new Error("❌ Os campos (título, isbn, quantidade em estoque, e id do Autor) são obrigatórios.");

        if(!validarISBN(isbn)) throw new Error("❌ Código ISBN inválido.");

        return await this.repositorio.criaLivroRP(titulo, isbn, quantidade_estoque, id_autor, ano_publicacao);
    }

    public async atualizarLivroServ(
        id_livro: number, titulo: string, isbn: string, quantidade_estoque:number,
        id_autor: number, ano_publicacao?: number|null):Promise<LivroModel> {

        if (id_livro === 0) throw new Error("❌ ID não pode ser ZERO.", );

        if (!id_livro || !titulo || !titulo.trim() || !isbn || !isbn.trim() || !quantidade_estoque || !id_autor)
            throw new Error("❌ Os campos (Id do livro, título, isbn, quantidade em estoque, e id do Autor) são obrigatórios.");

        if (!validarISBN(isbn))
            throw new Error("❌ Código ISBN inválido.");

        const result = await this.repositorio.atualizarLivroRP(id_livro, titulo, isbn, quantidade_estoque, id_autor, ano_publicacao);

        if (!result)
            throw new Error("❌ Erro ao atualizar livro.");

        return result;
    }

    public async deletarLivroServ(id: number):Promise<boolean> {
        if (id === 0) throw new Error("❌ ID não pode ser ZERO.", );

        if(await livroJaFoiEmprestadoRP(id))
            throw new Error("❌ Livro já foi emprestado, não pode ser excluído.", );

        return await this.repositorio.deletarLivroRP(id)
    }
}
