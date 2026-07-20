import { AutorModel } from "../models/AutorModel";
// import { cadastrarAutor, listarAutores, buscarAutorPorId, atualizarAutor, deletarAutor } from "../repositories/AutorRepository";
import { AutorRepository, IAutorRepository } from "../repositories/AutorRepository";
import { validarNomeAutor, validarNacionalidadeAutor, validarIdAutor } from "../utils/validadores";

export interface IAutorService {
    cadastrarAutorServ(nome: string, nacionalidade?: string): Promise<AutorModel>;
    listarAutoresServ(): Promise<AutorModel[]>;
    buscarAutorPorIdServ(id_autor: number): Promise<AutorModel | null>;
    atualizar(id_autor: number, nome: string, nacionalidade?: string): Promise<AutorModel>;
    deletar(id_autor: number): Promise<boolean>;
}

export class AutorService implements IAutorService {
    private readonly repositorio: IAutorRepository;

    constructor(repositorio: IAutorRepository = new AutorRepository()) {
        this.repositorio = repositorio;
    }

    public async cadastrarAutorServ(nome: string, nacionalidade?: string): Promise<AutorModel> {
        // validarNomeAutor(nome);
        validarNacionalidadeAutor(nacionalidade);
        // return await cadastrarAutor(nome, nacionalidade);
        return await this.repositorio.cadastrarAutor(nome, nacionalidade);

    }

    public async listarAutoresServ(): Promise<AutorModel[]> {
        const autores = await this.repositorio.listarAutores();
        if (autores.length === 0) {
            throw new Error("Nenhum autor encontrado.");
        }
        return autores;
    }

    public async buscarAutorPorIdServ(id_autor: number): Promise<AutorModel | null> {
        validarIdAutor(id_autor);
        return await this.repositorio.buscarAutorPorId(id_autor);
    }

    public async atualizarAutorServ(id_autor: number, nome: string, nacionalidade?: string): Promise<AutorModel> {
        validarIdAutor(id_autor);
        validarNomeAutor(nome);
        validarNacionalidadeAutor(nacionalidade);

        const result= await this.repositorio.atualizarAutor(id_autor, nome, nacionalidade);
        if(!result) {
            throw new Error("Autor não encontrado para atualização.");
        }
        return result;
    }

    public async deletarAutorServ(id_autor: number): Promise<boolean> {
        validarIdAutor(id_autor);


        const deletado = await this.repositorio.deletarAutor(id_autor);
        if (!deletado) {
            throw new Error("Autor não encontrado para exclusão.");
        }
        return deletado;
    }


}



