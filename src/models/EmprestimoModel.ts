export type statusEmprestimo = 'ATIVO' | 'DEVOLVIDO'

export interface CriarEmprestimoModel {
    id_cliente: number
    ids_livros: number[] // Array com os IDs de todos os livros
    dias_para_devolucao?: number // Opcional, padrão 14 dias se não enviado
}

export interface EmprestimoModel {
    readonly id_emprestimo: number
    id_cliente: number
    data_emprestimo: Date
    data_devolucao_prevista: Date
    data_devolucao_real?: Date | null| undefined
    status: statusEmprestimo
}

export interface EmprestimoCompletoModel extends EmprestimoModel {
    livros: {
        readonly id_livro: number
        titulo: string
        isbn: string
        ano_publicacao: number | null
        quantidade_estoque: number
        quantidade_emprestada: number
        quantidade_disponivel: number
        autor: {
            readonly id_autor: number
            nome: string
            nacionalidade?: string | null
            data_cadastro: Date
        }
    }[]
    cliente: {
        readonly id_cliente: number
        nome: string
        email: string
        telefone?: string | null
        data_nascimento?: Date | null
        data_cadastro: Date
    }
}

export interface LivrosPorClienteModel { 
    nome_cliente: string
    obs: string | null
    livros: {
        readonly id_livro: number
        titulo: string
        isbn: string
        ano_publicacao: number | null
        quantidade_estoque: number
        quantidade_emprestada: number
        quantidade_disponivel: number
        autor: {
            readonly id_autor: number
            nome: string
            nacionalidade?: string | null
            data_cadastro: Date
        }
    }[]
}

export class Emprestimo implements EmprestimoModel{
    readonly id_emprestimo: number
    private _id_cliente: number
    private _data_emprestimo: Date
    private _data_devolucao_prevista: Date
    private _data_devolucao_real?: Date | null |undefined
    private _status: statusEmprestimo


    constructor(id_emprestimo: number, id_cliente: number, data_emprestimo: Date, data_devolucao_prevista: Date, data_devolucao_real: Date | null, status: statusEmprestimo) {
        this.id_emprestimo = id_emprestimo;
        this._id_cliente = id_cliente;
        this._data_emprestimo = data_emprestimo;
        this._data_devolucao_prevista = data_devolucao_prevista;
        this._data_devolucao_real = data_devolucao_real;
        this._status = status;
    }


    get id_cliente(): number {
        return this._id_cliente;
    }

    set id_cliente(value: number) {
        this._id_cliente = value;
    }

    get data_emprestimo(): Date {
        return this._data_emprestimo;
    }

    set data_emprestimo(value: Date) {
        this._data_emprestimo = value;
    }

    get data_devolucao_prevista(): Date {
        return this._data_devolucao_prevista;
    }

    set data_devolucao_prevista(value: Date) {
        this._data_devolucao_prevista = value;
    }

    get data_devolucao_real(): Date | null | undefined{
        return this._data_devolucao_real;
    }

    set data_devolucao_real(value: Date | null | undefined) {
        this._data_devolucao_real = value;
    }

    get status(): statusEmprestimo {
        return this._status;
    }

    set status(value: statusEmprestimo) {
        this._status = value;
    }
}



