export interface LivroModel {
    readonly id_livro: number;
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
    };
}