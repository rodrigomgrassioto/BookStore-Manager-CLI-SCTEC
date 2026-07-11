import {LivroCompletoModel, LivroModel} from "../models/LivroModel";
import {
    atualizarLivroRP,
    buscarLivroPorTituloRP,
    criaLivroRP,
    deletarLivroRP,
    listarLivrosRP
} from "../repositories/LivroRepository";
import {validarISBN} from "../utils/validadores";
import {livroJaFoiEmprestadoRP} from "../repositories/EmprestimoRepository";

export async function listarLivrosServ(): Promise<LivroCompletoModel[]>  {
    return await listarLivrosRP();
}

export async function buscarLivroPorTituloServ (titulo:string): Promise<LivroCompletoModel[]>{
    if (!titulo || !titulo.trim())
        throw new Error("❌ Necessário informar título.");
    return await buscarLivroPorTituloRP(titulo);
}

export async function criarLivroServ(
    titulo: string, isbn: string, quantidade_estoque: number,
    id_autor: number, ano_publicacao?: number): Promise<LivroModel> {
    // Não permitir campos vazios
    if (!titulo || !titulo.trim() || !isbn || !isbn.trim() || !quantidade_estoque || !id_autor)
        throw new Error("❌ Os campos (título, isbn, quantidade em estoque, e id do Autor) são obrigatórios.");

    if(!validarISBN(isbn))
        throw new Error("❌ Código ISBN inválido.");

    return await criaLivroRP(titulo, isbn, quantidade_estoque, id_autor, ano_publicacao);
}

export async function atualizarLivroServ(
    id_livro: number, titulo: string, isbn: string, ano_publicacao: number,
    quantidade_estoque:number, id_autor: number):Promise<LivroModel> {

    if (!id_livro || !titulo || !titulo.trim() || !isbn || !isbn.trim() || !quantidade_estoque || !id_autor)
        throw new Error("❌ Os campos (Id do livro, título, isbn, quantidade em estoque, e id do Autor) são obrigatórios.");

    if (!validarISBN(isbn))
        throw new Error("❌ Código ISBN inválido.");

    const result = await atualizarLivroRP(id_livro, titulo, isbn, quantidade_estoque, id_autor, ano_publicacao);
    if (!result)
        throw new Error("❌ Erro ao atualizar livro.");
    return result;
}

export async function deletarLivroServ(id: number):Promise<boolean> {
    if(await livroJaFoiEmprestadoRP(id))
        throw new Error("❌ Livro já foi emprestado, não pode ser excluído.", );
    return await deletarLivroRP(id)
}