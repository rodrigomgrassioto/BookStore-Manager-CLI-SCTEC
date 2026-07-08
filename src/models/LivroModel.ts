export interface LivroModel {
    readonly id_livro: number;
    readonly titulo: string;
    isbn: string;
    ano_publicacao: number;
    quantidade_estoque: number;
    id_autor: number;
    data_cadastro: Date;
};

export interface LivroComAutorModel extends LivroModel {
    autor: {
        nome: string;
        nacionalidade?: string;
        data_cadastro: Date;
    };
}