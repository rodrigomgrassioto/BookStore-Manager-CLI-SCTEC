import { AutorModel, AutorCadastro } from "../models/AutorModel";
import { cadastrarAutor, listarAutores, buscarAutorPorId, atualizarAutor, deletarAutor } from "../repositories/AutorRepository";
import { nomeAutorValido, idAutorValido, autorValidoParaAtualizacao, autorValidoParaExclusao } from "../utils/validadores";

export async function cadastrarAutorServ(nome: string, nacionalidade?: string): Promise<AutorModel> {
    nomeAutorValido(nome);
    return await cadastrarAutor(nome, nacionalidade);
};

export async function listarAutoresServ(): Promise<AutorModel[]> {
    const autores = await listarAutores();
    if (autores.length === 0) {
        throw new Error("Nenhum autor encontrado.");
    };

    return await listarAutores();
};

export async function buscarAutorPorIdServ(id_autor: number): Promise<AutorModel | null> {
    idAutorValido(id_autor);
    return await buscarAutorPorId(id_autor);
};


export async function atualizarAutorServ(id_autor: number, nome: string, nacionalidade?: string): Promise<AutorModel> {
    autorValidoParaAtualizacao(id_autor, nome);

    const result= await atualizarAutor(id_autor, nome, nacionalidade);
    if(!result) {
        throw new Error("Erro ao atualizar autor.");
    };

    return result;
};

export async function deletarAutorServ(id_autor: number): Promise<boolean> {
    autorValidoParaExclusao(id_autor);

    const deletado = await deletarAutor(id_autor);
    if (!deletado) {
        throw new Error("Autor não encontrado para exclusão.");
    };

    return deletado;
};

