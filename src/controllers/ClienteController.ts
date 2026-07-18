import { 
    listarClientesServ,
    buscarClientePorIdServ,
    criarClienteServ,
    atualizarClienteServ,
    deletarClienteServ
} from '../services/ClienteService';

import { fazerPergunta } from '../utils/leitorFormatadorDeEntradas';
import * as formatadoresTexto from "../utils/formatadoresTexto";
import { ClienteModel } from '../models/ClienteModel';
import { tratarErroBanco } from '../utils/tratamentosErrosBD';
import { exibirClientesTabela } from '../utils/formatadoresTexto';
import {alertaMsg, erroMsg, sucessoMsg} from "../estilos/estilo";

// 1. Cadastrar Cliente
export async function clienteControllerCriar(): Promise<void> {
    const nome = await fazerPergunta("Nome do Cliente: ");
    const email = await fazerPergunta("E-mail do Cliente: ");
    const telefone = await fazerPergunta("Telefone do Cliente: ");
    const data_nascimento = await fazerPergunta("Data de Nascimento do Cliente (DD/MM/AAAA): ", { tipoRetorno: 'd' });

    try {
        await criarClienteServ(nome, email, telefone, data_nascimento);
        sucessoMsg(`Cliente "${nome}" cadastrado com sucesso!`);
    } catch (error: any) {
        if (error.code) tratarErroBanco(error);
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o cliente.");
    }
}

// 2. Listar Clientes
export async function clienteControllerListar(): Promise<void> {
    try {
        const lista = await listarClientesServ();
        exibirClientesTabela(lista);
    } catch (error: any) {
        if (error.code) tratarErroBanco(error);
        else erroMsg(error.message || "Ocorreu um erro inesperado ao listar os clientes.");
    }
}

// 3. Atualizar Cliente
export async function clienteControllerAtualizar(): Promise<void> {
    let clientes: ClienteModel[]
    try {
        clientes = await listarClientesServ()
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
        return;
    }

    if (!clientes || clientes.length === 0){
        alertaMsg("Sem clientes cadastrados")
        return
    }
    exibirClientesTabela(clientes)

    const id_cliente = await fazerPergunta("Número do ID do cliente: ", { tipoRetorno: 'i_zero' });

    let clienteNoDb: ClienteModel;
    try {
        clienteNoDb = await buscarClientePorIdServ(id_cliente);
    } catch (error: any) {
        if (error.code) tratarErroBanco(error);
        else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o cliente.");
        return;
    }

    exibirClientesTabela([clienteNoDb]);

    const nome = await fazerPergunta("Nome do Cliente: ", { valorOriginal: clienteNoDb.nome });
    const email = await fazerPergunta("E-mail do Cliente: ", { valorOriginal: clienteNoDb.email });
    const telefone = await fazerPergunta("Telefone do Cliente: ", { valorOriginal: clienteNoDb.telefone ?? "" });
    const data_nascimento = await fazerPergunta("Data de Nascimento do Cliente (DD/MM/AAAA): ", {
        tipoRetorno: 'd',
        valorOriginal: formatadoresTexto.formatarDataPrompt(clienteNoDb.data_nascimento)
    });

    try {
        const dadosAtualizacao = await atualizarClienteServ(id_cliente, nome, email, telefone, data_nascimento);
        sucessoMsg(`Cliente "${dadosAtualizacao.nome}" atualizado com sucesso!`);
    } catch (error: any) {
        if (error.code) tratarErroBanco(error);
        else erroMsg(error.message || "Ocorreu um erro inesperado ao atualizar o cliente.");
    }
}

// 4. Deletar Cliente
export async function clienteControllerDeletar(): Promise<void> {
    let clientes: ClienteModel[]
    try {
        clientes = await listarClientesServ()
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
        return;
    }

    if (!clientes || clientes.length === 0){
        alertaMsg("Sem clientes cadastrados")
        return
    }
    exibirClientesTabela(clientes)

    const id_cliente = await fazerPergunta("Número do ID do cliente: ", { tipoRetorno: 'i_zero' });

    let clienteNoDb: ClienteModel;
    try {
        clienteNoDb = await buscarClientePorIdServ(id_cliente);
    } catch (error: any) {
        if (error.code) tratarErroBanco(error);
        else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o cliente.");
        return;
    }

    exibirClientesTabela([clienteNoDb]);
    alertaMsg(" ATENÇÃO: Esta ação é irreversível e irá deletar o cliente do sistema.");

    const confirmacao = await fazerPergunta("Excluir cliente? (S/N):");
    if (confirmacao.toLowerCase() !== 's') {
        alertaMsg("Operação de exclusão cancelada.");
        return;
    }

    try {
        const result = await deletarClienteServ(id_cliente);
        if (!result) throw new Error("Erro desconhecido ao deletar.");
        sucessoMsg(`Cliente "${clienteNoDb.nome}" excluído com sucesso!`);
    } catch (error: any) {
        if (error.code) tratarErroBanco(error);
        else erroMsg(error.message || "Ocorreu um erro inesperado ao excluir o cliente.");
    }
}

export async function clienteControllerBuscarPorId(): Promise<void> {
    const id_cliente = await fazerPergunta("Digite o número do ID do cliente: ", { tipoRetorno: 'i_zero' });

    try {
        const cliente = await buscarClientePorIdServ(id_cliente);
        exibirClientesTabela([cliente]);
    } catch (error: any) {
        if (error.code) tratarErroBanco(error);
        else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o cliente.");
    }
}