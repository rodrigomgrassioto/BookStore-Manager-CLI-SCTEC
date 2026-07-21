export interface LivroModel {
    titulo: string
    isbn: string
    ano_publicacao?: number | undefined
    quantidade_estoque: number
    quantidade_emprestada: number
    quantidade_disponivel: number
    id_autor: number
}

export interface LivroCompletoModel extends LivroModel{
    readonly id_livro: number
    data_cadastro: Date
    autor: {
        nome: string
        nacionalidade?: string
        data_cadastro: Date
    }
}

export class Livro implements LivroModel {
    readonly id_livro: number
    private _titulo: string
    private _isbn: string
    private _ano_publicacao: number | undefined
    private _quantidade_estoque: number
    private _quantidade_emprestada: number
    private _quantidade_disponivel: number
    private _id_autor: number
    private _autor: {
        nome: string
        nacionalidade?: string
    }


    constructor(id_livro: number, titulo: string, isbn: string, ano_publicacao: number, quantidade_estoque: number, quantidade_emprestada: number, quantidade_disponivel: number, id_autor: number, autor: {
        nome: string
        nacionalidade?: string
    }) {
        this.id_livro = id_livro
        this._titulo = titulo
        this._isbn = isbn
        this._ano_publicacao = ano_publicacao
        this._quantidade_estoque = quantidade_estoque
        this._quantidade_emprestada = quantidade_emprestada
        this._quantidade_disponivel = quantidade_disponivel
        this._id_autor = id_autor
        this._autor = autor
    }

    get titulo(): string {
        return this._titulo
    }

    set titulo(value: string) {
        this._titulo = value
    }

    get isbn(): string {
        return this._isbn
    }

    set isbn(value: string) {
        this._isbn = value
    }

    get quantidade_estoque(): number {
        return this._quantidade_estoque
    }

    set quantidade_estoque(value: number) {
        this._quantidade_estoque = value
    }

    get quantidade_emprestada(): number {
        return this._quantidade_emprestada
    }

    set quantidade_emprestada(value: number) {
        this._quantidade_emprestada = value
    }

    get quantidade_disponivel(): number {
        return this._quantidade_disponivel
    }

    set quantidade_disponivel(value: number) {
        this._quantidade_disponivel = value
    }

    get id_autor(): number {
        return this._id_autor
    }

    set id_autor(value: number) {
        this._id_autor = value
    }

    get autor(): { nome: string; nacionalidade?: string } {
        return this._autor
    }

    set autor(value: { nome: string; nacionalidade?: string }) {
        this._autor = value
    }

    get ano_publicacao(): number | undefined {
        return this._ano_publicacao
    }

    set ano_publicacao(value: number | undefined) {
        this._ano_publicacao = value
    }
}