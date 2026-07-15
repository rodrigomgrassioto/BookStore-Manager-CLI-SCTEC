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

// 1. Cadastrar Cliente
export async function clienteControllerCriar(): Promise<void> {
    console.log("\n=== CADASTRO DE NOVO CLIENTE ===");

    const nome = await fazerPergunta("Nome do Cliente: ");
    const email = await fazerPergunta("E-mail do Cliente: ");
    const telefone = await fazerPergunta("Telefone do Cliente: ");
    const data_nascimento = await fazerPergunta("Data de Nascimento do Cliente (DD/MM/AAAA): ", { tipoRetorno: 'd' });

    try {
        await criarClienteServ(nome, email, telefone, data_nascimento);
        console.log(`\n🎉 Cliente "${nome}" cadastrado com sucesso!`);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o cliente.");
        console.log("========================================\n");
    }
}

// 2. Listar Clientes
export async function clienteControllerListar(): Promise<void> {
    console.log("\n=== LISTAR CLIENTES ===");

    try {
        const lista = await listarClientesServ();
        console.table(lista);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao listar os clientes.");
        console.log("========================================\n");
    }
}

// 3. Atualizar Cliente
export async function clienteControllerAtualizar(): Promise<void> {
    console.log("\n=== ATUALIZAR CLIENTE ===");

    const id_cliente = await fazerPergunta("Número do ID do cliente: ", { tipoRetorno: 'i_zero' });

    let clienteNoDb: ClienteModel;
    try {
        clienteNoDb = await buscarClientePorIdServ(id_cliente);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao buscar o cliente.");
        console.log("========================================\n");
        return;
    }

    console.table([clienteNoDb]);

    const nome = await fazerPergunta("Nome do Cliente: ", { valorOriginal: clienteNoDb.nome });
    const email = await fazerPergunta("E-mail do Cliente: ", { valorOriginal: clienteNoDb.email });
    const telefone = await fazerPergunta("Telefone do Cliente: ", { valorOriginal: clienteNoDb.telefone ?? "" });
    const data_nascimento = await fazerPergunta("Data de Nascimento do Cliente (DD/MM/AAAA): ", {
        tipoRetorno: 'd',
        valorOriginal: formatadoresTexto.formatarDataPrompt(clienteNoDb.data_nascimento)
    });

    try {
        const dadosAtualizacao = await atualizarClienteServ(id_cliente, nome, email, telefone, data_nascimento);
        console.log(`\n🎉 Cliente "${dadosAtualizacao.nome}" atualizado com sucesso!`);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao atualizar o cliente.");
        console.log("========================================\n");
    }
}

// 4. Deletar Cliente
export async function clienteControllerDeletar(): Promise<void> {
    console.log("\n=== DELETAR CLIENTE ===");

    const id_cliente = await fazerPergunta("Número do ID do cliente: ", { tipoRetorno: 'i_zero' });

    let clienteNoDb: ClienteModel;
    try {
        clienteNoDb = await buscarClientePorIdServ(id_cliente);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao buscar o cliente.");
        console.log("========================================\n");
        return;
    }

    console.table([clienteNoDb]);
    console.log("\n⚠️  ATENÇÃO: Esta ação é irreversível e irá deletar o cliente do sistema.\n");

    const confirmacao = await fazerPergunta("Excluir cliente? (S/N): ");
    if (confirmacao.toLowerCase() !== 's') {
        console.log("Operação de exclusão cancelada.");
        return;
    }

    try {
        const result = await deletarClienteServ(id_cliente);
        if (!result) throw new Error("❌ Erro desconhecido ao deletar.");
        console.log(`\n🎉 Cliente "${clienteNoDb.nome}" excluído com sucesso!`);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao excluir o cliente.");
        console.log("========================================\n");
    }
}