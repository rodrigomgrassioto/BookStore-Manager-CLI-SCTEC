import { 
    listarClientesServ,
    buscarClienteServ,
    criarClienteServ,
    atualizarClienteServ,
    deletarClienteServ
} from '../services/ClienteService';

import { fazerPergunta } from '../utils/readlineUtil';
import { ClienteModel, ClienteCadastro } from '../models/ClienteModel';



// 1. Cadastrar Cliente
export async function clienteControllerCriar(): Promise<void> {
    console.log("\n=== CADASTRO DE NOVO CLIENTE ===");

    
    const nome = await fazerPergunta("Nome do Cliente: ");
    const email = await fazerPergunta("E-mail do Cliente: ");
    const telefone = await fazerPergunta("Telefone do Cliente: ");
    const data_nascimento = await fazerPergunta("Data de Nascimento do Cliente (YYYY-MM-DD): ");

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


    let clienteNoDb;
    try {
        clienteNoDb = await buscarClienteServ(id_cliente);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao buscar o cliente.");
        console.log("========================================\n");
        return;
    }

    if (!clienteNoDb) {
        console.log("\n========================================");
        console.log("❌ Cliente não encontrado.");
        console.log("========================================\n");
        return;
    }

    console.table(clienteNoDb);

    // Exibe os valores originais no terminal usando o readlineUtil de vocês
    const nome = await fazerPergunta("Nome do Cliente: ");
    const email = await fazerPergunta("E-mail do Cliente: ");
    const telefone = await fazerPergunta("Telefone do Cliente: ");
    const data_nascimento = await fazerPergunta("Data de Nascimento do Cliente (YYYY-MM-DD): ");

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

    const id_cliente = await fazerPergunta("Número do ID do cliente: ");
    let clienteNoDb;

    try {
        clienteNoDb = await buscarClienteServ(id_cliente);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao buscar o cliente.");
        console.log("========================================\n");
        return;
    }

    if (!clienteNoDb) {
        console.log("❌ Cliente não encontrado.");
        return;
    }

    console.table(clienteNoDb);

    console.log("\n⚠️  ATENÇÃO: Esta ação é irreversível e irá deletar o autor do sistema.\n");
    const confirmacao = await fazerPergunta("Excluir cliente? (S/N): ");
    if (confirmacao.toLowerCase() !== 's') {
           console.log("Operação de exclusão cancelada.");
           return;
    }

    try {
        const result = await deletarClienteServ(id_cliente);
        if (!result) throw new Error("❌ Erro desconhecido ao deletar.");
        console.log(`\n🎉 Cliente "${clienteNoDb.id_cliente}" excluído com sucesso!`);
    } catch (error: any) {
        console.log("\n========================================");
        if (error.code) tratarErroBanco(error);
        
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao excluir o cliente.");
        console.log("========================================\n");
    }
}

// Tratamento de erros de Banco específico para Clientes
function tratarErroBanco(error: any): void {
    switch (error.code) {
        case '23505': // Unique Violation
            console.error("❌ Já existe um cliente cadastrado com este endereço de e-mail.");
            break;
        case '23503': // Foreign Key Violation
            console.error("❌ O cliente possui empréstimos ativos registrados e não pode ser alterado/excluído.");
            break;
        case '23502': // Not Null Violation
            console.error("❌ Campo obrigatório de cliente não foi preenchido corretamente.");
            break;
        default:
            console.error(`❌ Erro crítico no Banco de Dados ( ${error.code} ): ${error.message}`);
    }
}