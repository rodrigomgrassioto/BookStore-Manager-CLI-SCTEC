import { 
    listarClientesServ,
    buscarClienteServ,
    criarClienteServ,
    atualizarClienteServ,
    deletarClienteServ
} from '../services/ClienteService';
import { ClienteModel, ClienteCadastro } from '../models/ClienteModel';
import {fazerPergunta} from "../utils/readlineUtil";


export class ClienteController {
    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    // 1. Método para Cadastrar um Cliente
    async criar(): Promise<void> {
        console.log('\n--- CADASTRO DE CLIENTE ---');
        
        // Coleta de dados do terminal
        const nome = await fazerPergunta('Nome do Cliente: ');
        const email = await fazerPergunta('E-mail do Cliente: ');
        const telefone = await fazerPergunta('Telefone: ');

        // Criando o objeto com base na interface ClienteCadastro
        const dadosCliente: ClienteCadastro = {
            nome,
            email,
            telefone
        };

        try {
            // Chama o serviço passando a interface como parâmetro
            const novoCliente = await this.clienteService.criarClienteServ(dadosCliente);
            console.log(`\nCliente [${novoCliente.nome}] cadastrado com sucesso! ID: ${novoCliente.id_cliente}`);
        } catch (error: any) {
            // Tratamento de erro para impedir o fechamento do CLI
            console.log(`\nErro ao cadastrar cliente: ${error.message}`);
        }
    }

    // 2. Método para Atualizar um Cliente
    async atualizar(): Promise<void> {
        console.log('\n--- ATUALIZAÇÃO DE CLIENTE ---');

        const idInput = await fazerPergunta('Digite o ID do cliente que deseja atualizar: ');
        const id = parseInt(idInput);

        if (isNaN(id)) {
            console.log('\nID inválido!');
            return;
        }

        // Captura os novos dados (parciais ou totais)
        console.log('(Deixe em branco para manter o valor atual)');
        const nome = await fazerPergunta('Novo Nome: ');
        const email = await fazerPergunta('Novo E-mail: ');
        const telefone = await fazerPergunta('Novo Telefone: ');

        // Monta os dados apenas com o que foi preenchido (ou trate no Service se preferir)
        const dadosAtualizacao: Partial<ClienteCadastro> = {};
        if (nome) dadosAtualizacao.nome = nome;
        if (email) dadosAtualizacao.email = email;
        if (telefone) dadosAtualizacao.telefone = telefone;

        try {
            await this.clienteService.atualizarClienteServ(id, dadosAtualizacao);
            console.log('\nCliente atualizado com sucesso!');
        } catch (error: any) {
            console.log(`\nErro ao atualizar cliente: ${error.message}`);
        }
    }

    // 3. Método para Listar Clientes
    async listar(): Promise<void> {
        console.log('\n--- LISTA DE CLIENTES ---');
        try {
            const clientes = await this.clienteService.listarClientesServ();
            
            if (clientes.length === 0) {
                console.log('Nenhum cliente cadastrado.');
                return;
            }

            clientes.forEach((cliente: ClienteModel) => {
                console.log(`ID: ${cliente.id_cliente} | Nome: ${cliente.nome}`); // Ajuste os campos conforme seu modelo
            });
        } catch (error: any) {
            console.log(`\nErro ao listar clientes: ${error.message}`);
        }
    }
}