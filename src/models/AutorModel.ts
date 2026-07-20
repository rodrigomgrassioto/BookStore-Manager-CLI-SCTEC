export interface AutorModel {
    readonly id_autor: number;
    nome: string;
    nacionalidade: string | null;
    data_cadastro: Date;      
}

export interface AutorCadastro {
    nome: string;
    nacionalidade?: string;
}

export class Autor implements AutorModel {
    readonly id_autor: number;
    private _nome: string;
    private _nacionalidade: string | null;
    readonly data_cadastro: Date;

    constructor(id_autor: number, nome: string, nacionalidade: string | null, data_cadastro: Date) {
        this.id_autor = id_autor;
        this._nome = nome;
        this._nacionalidade = nacionalidade;
        this.data_cadastro = data_cadastro;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(novoNome: string) {
        if (!novoNome || !novoNome.trim()) {
            throw new Error("Nome do autor não pode ser vazio.");
        }
        this._nome = novoNome;
    }

    public get nacionalidade(): string | null {
        return this._nacionalidade;
    }

    public set nacionalidade(novaNacionalidade: string | null) {
        this._nacionalidade = novaNacionalidade;
    }

    public static fromModel(model: AutorModel): Autor {
        return new Autor(model.id_autor, model.nome, model.nacionalidade, model.data_cadastro);
    }

    public resumo(): string {
        return `${this._nome} (${this._nacionalidade ?? "Nacionalidade não informada"})`;
    }
}