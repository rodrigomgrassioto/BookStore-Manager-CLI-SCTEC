import {LivroCompletoModel, LivroModel} from "../models/LivroModel";
import {
    atualizarLivro,
    buscarLivroPorTitulo,
    criaLivro,
    deletarLivro,
    listarLivros
} from "../repositories/LivroRepository";

export async function criarLivro(
    titulo: string, isbn: string, quantidade_estoque: number,
    id_autor: number, ano_publicacao?: number): Promise<LivroModel> {
    // Não permitir campos vazios
    if (!titulo || !titulo.trim() || !isbn || !isbn.trim() || !quantidade_estoque || !id_autor) {
        throw new Error("Os campos (título, isbn, quantidade em estoque, e id do Autor) são obrigatórios.");
    }

    return await criaLivro(titulo, isbn, quantidade_estoque, id_autor, ano_publicacao);
}
