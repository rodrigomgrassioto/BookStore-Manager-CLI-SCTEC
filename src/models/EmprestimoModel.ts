export type statusEmprestimo = 'ATIVO' | 'DEVOLVIDO';

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
        // quantidade_estoque: number;
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


