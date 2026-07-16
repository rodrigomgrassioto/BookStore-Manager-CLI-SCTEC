export type statusEmprestimo = 'ATIVO' | 'DEVOLVIDO';

export interface CriarEmprestimoModel {
    id_cliente: number;
    ids_livros: number[]; // Array com os IDs de todos os livros
    dias_para_devolucao?: number; // Opcional, padrão 14 dias se não enviado
}


export interface EmprestimoModel {
    readonly id_emprestimo: number;
    id_cliente: number;
    data_emprestimo: Date;
    data_devolucao_prevista: Date;
    data_devolucao_real?: Date | null;
    status: statusEmprestimo;
};

export interface EmprestimoCompletoModel extends EmprestimoModel {
    livros: {
        readonly id_livro: number;
        titulo: string;
        isbn: string;
        ano_publicacao: number | null;
        quantidade_estoque: number;
        quantidade_emprestada: number;
        quantidade_disponivel: number;
        autor: {
            readonly id_autor: number;
            nome: string;
            nacionalidade?: string | null;
            data_cadastro: Date;
        };
    }[];
    cliente: {
        readonly id_cliente: number;
        nome: string;
        email: string;
        telefone?: string | null;
        data_nascimento?: Date | null;
        data_cadastro: Date;
    };
};

export interface LivrosPorClienteModel { // 🆕 Removido o extends para evitar carregar campos que você não vai usar aqui
    nome_cliente: string;
    obs: string | null;
    livros: {
        readonly id_livro: number;
        titulo: string;
        isbn: string;
        ano_publicacao: number | null;
        quantidade_estoque: number;
        quantidade_emprestada: number;
        quantidade_disponivel: number;
        autor: {
            readonly id_autor: number;
            nome: string;
            nacionalidade?: string | null;
            data_cadastro: Date;
        };
    }[];
}



