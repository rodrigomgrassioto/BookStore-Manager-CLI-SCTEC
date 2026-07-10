import { ClienteModel, ClienteCadastro } from '../models/ClienteModel';
import {
    criarClienteRP,
    buscarClienteRP,
    atualizarClienteRP,
    deletarClienteRP,
    listarClientesRP
} from "../repositories/ClienteRepository";
import {
    camposObrigatoriosPreenchidos,
    nomeValido,
    emailValido,
    telefoneValido,
    dataNascimentoValida,
    dataNascimentoMaior18Anos,
    clienteValidoParaBusca,
    clienteValidoParaExclusao
} from '../utils/validadores';

export async function listarClientesServ(): Promise<ClienteModel[]> {
    const clientes = await listarClientesRP();
    if (clientes.length === 0) {
        throw new Error("Nenhum cliente encontrado.");
    }
    return clientes;
}

export async function buscarClienteServ(nome: string): Promise<ClienteModel> {
    if (!clienteValidoParaBusca(nome)) {
        throw new Error("Necessário informar um nome válido para a busca.");
    }

    const cliente = await buscarClienteRP(nome);
    if (!cliente) {
        throw new Error("Cliente não encontrado.");
    }
    return cliente;
}

export async function criarClienteServ(
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

    const clienteExistente = await buscarClienteRP(nome);
    if (clienteExistente) {
        throw new Error("Cliente já cadastrado com este nome.");
    }

    return await criarClienteRP(nome, email, telefone, data_nascimento);
}

export async function atualizarClienteServ(
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

    const r = await atualizarClienteRP(id_cliente, {
        nome,
        email,
        telefone,
        data_nascimento
    });

    if (!r) {
        throw new Error("Erro ao atualizar cliente. Verifique se o ID informado existe.");
    }
    return r;
}

export async function deletarClienteServ(id_cliente: number): Promise<boolean> {
    if (!clienteValidoParaExclusao(id_cliente)) {
        throw new Error("Necessário informar um ID válido de cliente para exclusão.");
    }

    const deletado = await deletarClienteRP(id_cliente);
    if (!deletado) {
        throw new Error("Cliente não encontrado para exclusão.");
    }
    return deletado;
}
