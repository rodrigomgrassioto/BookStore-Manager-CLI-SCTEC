export interface ClienteModel {
    readonly id_cliente: number;
    nome: string;
    email: string;
    telefone: string | undefined | null;
    data_nascimento: Date | undefined | null;
    data_cadastro: Date;
}

export interface ClienteCadastro {
    nome: string
    email: string
    telefone?: string | null | undefined
    data_nascimento?: Date | null | undefined
}

export class Cliente implements ClienteModel {
    readonly id_cliente: number;
    private _nome: string;
    private _email: string;
    private _telefone: string | undefined | null;
    private _data_nascimento: Date | undefined | null;
    readonly data_cadastro: Date;

    constructor(
        id_cliente: number,
        nome: string,
        email: string,
        data_cadastro: Date,
        telefone: string | undefined | null,
        data_nascimento: Date | undefined | null
    ) {
        this.id_cliente = id_cliente;
        this._nome = nome;
        this._email = email;
        this.data_cadastro = data_cadastro;
        this._telefone = telefone;
        this._data_nascimento = data_nascimento;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    // Getters e Setters atualizados com os novos tipos unidos
    get telefone(): string | undefined | null {
        return this._telefone;
    }

    set telefone(value: string | undefined | null) {
        this._telefone = value;
    }

    get data_nascimento(): Date | undefined | null  {
        return this._data_nascimento;
    }

    set data_nascimento(value: Date | undefined | null) {
        this._data_nascimento = value;
    }
}
