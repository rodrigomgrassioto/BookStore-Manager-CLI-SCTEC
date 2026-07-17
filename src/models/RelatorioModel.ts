export interface LivroDisponivelModel {
    id_livro: number;
    titulo: string;
    isbn: string;
    quantidade_estoque: number;
    quantidade_disponivel: number;
    autor_nome: string;
}

export interface LivroEmprestadoModel {
    id_livro: number;
    titulo: string;
    isbn: string;
    quantidade_emprestada: number;
    autor_nome: string;
}

export interface LivroPorAutorModel {
    id_autor: number;
    autor_nome: string;
    id_livro: number | null;
    titulo: string | null;
}

export interface EmprestimosPorLivroModel {
    id_livro: number;
    titulo: string;
    total_emprestimos: number;
}

export interface ClienteComEmprestimoAtivoModel {
    id_cliente: number;
    cliente_nome: string;
    email: string;
    id_livro: number;
    titulo: string;
    data_devolucao_prevista: Date;
}