export interface LivroModel {
    titulo: string;
    isbn: string;
    ano_publicacao?: number;
    quantidade_estoque: number;
    quantidade_emprestada: number;
    quantidade_disponivel: number;
    id_autor: number;
}

export interface LivroCompletoModel extends LivroModel{
    readonly id_livro: number;
    data_cadastro: Date;
    autor: {
        nome: string;
        nacionalidade?: string;
        data_cadastro: Date;
    };
}