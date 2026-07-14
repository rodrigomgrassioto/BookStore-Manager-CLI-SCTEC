import { AutorModel, AutorCadastro } from "../models/AutorModel";
import { cadastrarAutor, listarAutores, buscarAutorPorId, atualizarAutor, deletarAutor } from "../repositories/AutorRepository";
import { validarNomeAutor, validarNacionalidadeAutor, validarIdAutor } from "../utils/validadores";

export async function cadastrarAutorServ(nome: string, nacionalidade?: string): Promise<AutorModel> {
    validarNomeAutor(nome);
    validarNacionalidadeAutor(nacionalidade);
    return await cadastrarAutor(nome, nacionalidade);
};

export async function listarAutoresServ(): Promise<AutorModel[]> {
    const autores = await listarAutores();
    if (autores.length === 0) {
        throw new Error("Nenhum autor encontrado.");
    };

    return autores;
};

export async function buscarAutorPorIdServ(id_autor: number): Promise<AutorModel | null> {
    validarIdAutor(id_autor);
    return await buscarAutorPorId(id_autor);
};


export async function atualizarAutorServ(id_autor: number, nome: string, nacionalidade?: string): Promise<AutorModel> {
    validarIdAutor(id_autor);
    validarNomeAutor(nome);
    validarNacionalidadeAutor(nacionalidade);

    const result= await atualizarAutor(id_autor, nome, nacionalidade);
    if(!result) {
        throw new Error("Autor não encontrado para atualização.");
    };

    return result;
};

export async function deletarAutorServ(id_autor: number): Promise<boolean> {
    validarIdAutor(id_autor);


    const deletado = await deletarAutor(id_autor);
    if (!deletado) {
        throw new Error("Autor não encontrado para exclusão.");
    };

    return deletado;
};

