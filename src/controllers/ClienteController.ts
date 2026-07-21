import { fazerPergunta } from '../utils/leitorFormatadorDeEntradas'
import * as formatadoresTexto from "../utils/formatadoresTexto"
import { ClienteModel } from '../models/ClienteModel'
import {tratarErro} from '../utils/tratarErros'
import { exibirClientesTabela } from '../utils/formatadoresTexto'
import {alertaMsg, sucessoMsg} from "../estilos/estilo"
import {ClienteService, IClienteService} from "../services/ClienteService";

export class ClienteController{
    private readonly service: IClienteService


    constructor(service: IClienteService = new ClienteService()) {
        this.service = service;
    }
    
    
    public async clienteControllerCriar(): Promise<void> {
        const nome = await fazerPergunta("Nome do Cliente: ")
        const email = await fazerPergunta("E-mail do Cliente: ")
        const telefone = await fazerPergunta("Telefone do Cliente: ")
        const data_nascimento = await fazerPergunta("Data de Nascimento do Cliente (DD/MM/AAAA): ", { tipoRetorno: 'd' })
    
        try {
            await this.service.criarClienteServ(nome, email, telefone, data_nascimento)
            sucessoMsg(`Cliente "${nome}" cadastrado com sucesso!`)
        } catch (error: any) {
            // if (error.code) tratarErroBanco(error)
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o cliente.")
            tratarErro(error, "Ocorreu um erro inesperado ao salvar o cliente.")
        }
    }
    
    public async clienteControllerListar(): Promise<void> {
        try {
            const lista = await this.service.listarClientesServ()
            exibirClientesTabela(lista)
        } catch (error: any) {
            // if (error.code) tratarErroBanco(error)
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao listar os clientes.")
            tratarErro(error, "Ocorreu um erro inesperado ao listar os clientes.")
        }
    }
    
    public async clienteControllerAtualizar(): Promise<void> {
        let clientes: ClienteModel[]
        try {
            clientes = await this.service.listarClientesServ()
        } catch (error: any) {
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error)
    
            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.")
            tratarErro(error, "Ocorreu um erro inesperado ao listar clientes.")
            return
        }
    
        if (!clientes || clientes.length === 0){
            alertaMsg("Sem clientes cadastrados")
            return
        }
        exibirClientesTabela(clientes)
    
        const id_cliente = await fazerPergunta("Número do ID do cliente: ", { tipoRetorno: 'i_zero' })
    
        let clienteNoDb: ClienteModel
        try {
            clienteNoDb = await this.service.buscarClientePorIdServ(id_cliente)
        } catch (error: any) {
            // if (error.code) tratarErroBanco(error)
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o cliente.")
            tratarErro(error, "Ocorreu um erro inesperado ao buscar o cliente.")
            return
        }
    
        exibirClientesTabela([clienteNoDb])
    
        const nome = await fazerPergunta("Nome do Cliente: ", { valorOriginal: clienteNoDb.nome })
        const email = await fazerPergunta("E-mail do Cliente: ", { valorOriginal: clienteNoDb.email })
        const telefone = await fazerPergunta("Telefone do Cliente: ", { valorOriginal: clienteNoDb.telefone ?? "" })
        const data_nascimento = await fazerPergunta("Data de Nascimento do Cliente (DD/MM/AAAA): ", {
            tipoRetorno: 'd',
            valorOriginal: formatadoresTexto.formatarDataPrompt(clienteNoDb.data_nascimento)
        })
    
        try {
            const dadosAtualizacao = await this.service.atualizarClienteServ(id_cliente, nome, email, telefone, data_nascimento)
            sucessoMsg(`Cliente "${dadosAtualizacao.nome}" atualizado com sucesso!`)
        } catch (error: any) {
            // if (error.code) tratarErroBanco(error)
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao atualizar o cliente.")
            tratarErro(error, "Ocorreu um erro inesperado ao atualizar o cliente.")
        }
    }
    
    public async clienteControllerDeletar(): Promise<void> {
        let clientes: ClienteModel[]
        try {
            clientes = await this.service.listarClientesServ()
        } catch (error: any) {
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error)
    
            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.")
            tratarErro(error, "Ocorreu um erro inesperado ao listar clientes.")
            return
        }
    
        if (!clientes || clientes.length === 0){
            alertaMsg("Sem clientes cadastrados")
            return
        }
        exibirClientesTabela(clientes)
    
        const id_cliente = await fazerPergunta("Número do ID do cliente: ", { tipoRetorno: 'i_zero' })
    
        let clienteNoDb: ClienteModel
        try {
            clienteNoDb = await this.service.buscarClientePorIdServ(id_cliente)
        } catch (error: any) {
            // if (error.code) tratarErroBanco(error)
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o cliente.")
            tratarErro(error, "Ocorreu um erro inesperado ao buscar o cliente.")
            return
        }
    
        exibirClientesTabela([clienteNoDb])
        alertaMsg(" ATENÇÃO: Esta ação é irreversível e irá deletar o cliente do sistema.")
    
        const confirmacao = await fazerPergunta("Excluir cliente? (S/N):")
        if (confirmacao.toLowerCase() !== 's') {
            alertaMsg("Operação de exclusão cancelada.")
            return
        }
    
        try {
            const result = await this.service.deletarClienteServ(id_cliente)
            if (!result) throw new Error("Erro desconhecido ao deletar.")
            sucessoMsg(`Cliente "${clienteNoDb.nome}" excluído com sucesso!`)
        } catch (error: any) {
            // if (error.code) tratarErroBanco(error)
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao excluir o cliente.")
            tratarErro(error, "Ocorreu um erro inesperado ao excluir o cliente.")
        }
    }
    
    public async clienteControllerBuscarPorId(): Promise<void> {
        const id_cliente = await fazerPergunta("Digite o número do ID do cliente: ", { tipoRetorno: 'i_zero' })
    
        try {
            const cliente = await this.service.buscarClientePorIdServ(id_cliente)
            exibirClientesTabela([cliente])
        } catch (error: any) {
            // if (error.code) tratarErroBanco(error)
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o cliente.")
            tratarErro(error, "Ocorreu um erro inesperado ao buscar o cliente.")
        }
    }
}
