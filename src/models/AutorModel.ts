export interface AutorModel {
    readonly id_autor: number;
    nome: string;
    nacionalidade: string | null;
    data_cadastro: Date;      
};

export interface AutorCadastro {
    nome: string;
    nacionalidade?: string;
};