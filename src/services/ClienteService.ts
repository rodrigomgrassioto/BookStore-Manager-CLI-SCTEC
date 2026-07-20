import { ClienteModel, ClienteCadastro } from '../models/ClienteModel';
import {
    camposObrigatoriosPreenchidos,
    nomeValido,
    emailValido,
    telefoneValido,
    dataNascimentoValida,
    dataNascimentoMaior18Anos,
    clienteValidoParaExclusao
} from '../utils/validadores';
import {ClienteRepository, IClienteRepository} from "../repositories/ClienteRepository";

export interface IClienteService{
    listarClientesServ(): Promise<ClienteModel[]>
    buscarClientePorIdServ(id_cliente: number): Promise<ClienteModel>
    criarClienteServ(nome: string,email: string,telefone: string,data_nascimento: Date): Promise<ClienteCadastro>
    atualizarClienteServ(id_cliente: number, nome: string,email: string,
                         telefone: string,data_nascimento: Date): Promise<ClienteCadastro>
    deletarClienteServ(id_cliente: number): Promise<boolean>
}

export class ClienteService implements IClienteService {
    private readonly repositorio: IClienteRepository;

    constructor(repositorio: IClienteRepository = new ClienteRepository()) {
        this.repositorio = repositorio;
    }


    public async listarClientesServ(): Promise<ClienteModel[]> {
        const clientes = await this.repositorio.listarClientesRP();
        if (clientes.length === 0) {
            throw new Error("Nenhum cliente encontrado.");
        }
        return clientes
    }

    public async buscarClientePorIdServ(id_cliente: number): Promise<ClienteModel> {
        if (!clienteValidoParaExclusao(id_cliente)) {
            throw new Error("Necessário informar um ID válido de cliente.");
        }

        const cliente = await this.repositorio.buscarClientePorIdRP(id_cliente);
        if (!cliente) {
            throw new Error("Cliente não encontrado.");
        }
        return cliente;
    }

    public async criarClienteServ(
        nome: string,
        email: string,
        telefone: string,
        data_nascimento: Date
    ): Promise<ClienteCadastro> {

        if (!camposObrigatoriosPreenchidos(nome, email, telefone, data_nascimento)) {
            throw new Error("Os campos (nome, email, telefone, e data de nascimento) são obrigatórios.");
        }
        if (!nomeValido(nome)) {
            throw new Error("Nome inválido. O nome deve conter apenas letras.");
        }
        if (!dataNascimentoValida(data_nascimento)) {
            throw new Error("Data de nascimento inválida.");
        }
        if (!dataNascimentoMaior18Anos(data_nascimento)) {
            throw new Error("Cliente inválido. O cliente deve ser maior de 18 anos.");
        }
        if (!emailValido(email)) {
            throw new Error("Email inválido.");
        }
        if (!telefoneValido(telefone)) {
            throw new Error("Telefone inválido. Deve conter apenas números e ter 10 ou 11 dígitos.");
        }

        return await this.repositorio.criarClienteRP(nome, email, telefone, data_nascimento);
    }

    public async atualizarClienteServ(
        id_cliente: number,
        nome: string,
        email: string,
        telefone: string,
        data_nascimento: Date
    ): Promise<ClienteCadastro> {

        if (!id_cliente || !camposObrigatoriosPreenchidos(nome, email, telefone, data_nascimento)) {
            throw new Error("Os campos (Id do cliente, nome, email, telefone, e data de nascimento) são obrigatórios.");
        }
        if (!nomeValido(nome)) {
            throw new Error("Nome inválido. O nome deve conter apenas letras.");
        }
        if (!dataNascimentoValida(data_nascimento)) {
            throw new Error("Data de nascimento inválida.");
        }
        if (!dataNascimentoMaior18Anos(data_nascimento)) {
            throw new Error("Alteração inválida. O cliente deve ser maior de 18 anos.");
        }
        if (!emailValido(email)) {
            throw new Error("Email inválido.");
        }
        if (!telefoneValido(telefone)) {
            throw new Error("Telefone inválido. Deve conter apenas números e ter 10 ou 11 dígitos.");
        }

        const result = await this.repositorio.atualizarClienteRP(id_cliente, {
            nome,
            email,
            telefone,
            data_nascimento
        })

        if (!result) {
            throw new Error("Erro ao atualizar cliente. Verifique se o ID informado existe.");
        }
        return result;
    }

    public async deletarClienteServ(id_cliente: number): Promise<boolean> {
        if (!clienteValidoParaExclusao(id_cliente)) {
            throw new Error("Necessário informar um ID válido de cliente para exclusão.");
        }

        const deletado = await this.repositorio.deletarClienteRP(id_cliente);
        if (!deletado) {
            throw new Error("Cliente não encontrado para exclusão.");
        }
        return deletado;
    }
}
