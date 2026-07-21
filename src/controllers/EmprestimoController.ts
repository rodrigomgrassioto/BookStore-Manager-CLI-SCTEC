import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas"
import { exibirClientesTabela, exibirEmprestimosDetalhadoTabela, exibirLivrosTabela} from "../utils/formatadoresTexto"
import {tratarErro, tratarErroBanco} from "../utils/tratarErros"
import configEmpresa from '../configuracoes_empresa.json'
import {ClienteService, IClienteService} from '../services/ClienteService'
import {ILivroService, LivroService} from '../services/LivroService'
import {alertaMsg, erroMsg, sucessoMsg} from "../estilos/estilo"
import {ClienteModel} from "../models/ClienteModel"
import {EmprestimoCompletoModel} from "../models/EmprestimoModel"
import {EmprestimoService, IEmprestimoService} from "../services/EmprestimoService"
import {EmprestimoRepository} from "../repositories/EmprestimoRepository";
import {LivroRepository} from "../repositories/LivroRepository";
import {ClienteRepository} from "../repositories/ClienteRepository";

export class EmprestimoController {
    private readonly service: IEmprestimoService;
    private readonly livroService: ILivroService;
    private readonly clienteService: IClienteService;

    constructor(service: IEmprestimoService, livroService: ILivroService, clienteService: IClienteService) {
        this.service = service;
        this.livroService = livroService;
        this.clienteService = clienteService;
    }

    public async criarEmprestimoController(): Promise<void> {
        let clientes:ClienteModel[]
        try {
            clientes =  await this.clienteService.listarClientesServ()
        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error)

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao criar o empréstimo.")
            tratarErro(error, "Ocorreu um erro inesperado ao listar clientes.")
            return
        }

        if (!clientes || clientes.length === 0) {
            alertaMsg("Sem clientes cadastrados.")
            return
        }

        exibirClientesTabela(clientes)
        const id_cliente = await fazerPergunta("Digite o ID do cliente: ", { tipoRetorno: "i_zero" })

        const livros = await this.livroService.listarLivrosServ()
        exibirLivrosTabela(livros)

        const ids_livros = await fazerPergunta("Digite os IDs dos livros separados por vírgula (ex: 5, 6, 10): ")

        try {
            const entradaLivros = this.converterIdsLivros(ids_livros) // FUNÇÃO PARA CONVERTER IDS DE LIVROS EM ARRAY DE NÚMEROS

            const emprestimo = await this.service.criarEmprestimoServ({
                id_cliente,
                ids_livros: entradaLivros,
                dias_para_devolucao: configEmpresa.dias_de_emprestimo
            })

            sucessoMsg("Empréstimo registrado com sucesso!")
            exibirEmprestimosDetalhadoTabela([emprestimo])

        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error)

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao criar o empréstimo.")
            tratarErro(error, "Ocorreu um erro inesperado ao criar empréstimo.")
        }
    }

    public async buscarEmprestimoPorIdController(): Promise<void> {

        const id = await fazerPergunta("Digite o ID do empréstimo: ", { tipoRetorno: "i_zero" })

        try {
            const emprestimo = await this.service.buscarEmprestimoPorIdServ(id)
            exibirEmprestimosDetalhadoTabela([emprestimo])
        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error)

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o empréstimo.")
            tratarErro(error, "Ocorreu um erro inesperado ao buscar empréstimo.")
        }
    }

    public async devolverEmprestimoController(): Promise<void> {
        let emprestimosLista:EmprestimoCompletoModel[]
        try {
            emprestimosLista = await this.service.listarEmprestimosAtivosServ()
        } catch (error: any) {
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error)

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.")
            tratarErro(error, "Ocorreu um erro inesperado ao listar empréstimos.")
            return
        }

        if (!emprestimosLista || emprestimosLista.length === 0){
            alertaMsg("Sem empréstimos cadastrados")
            return
        }

        alertaMsg('EMPRÉSTIMOS ATIVOS:')
        exibirEmprestimosDetalhadoTabela(emprestimosLista, true)

        const id_emprestimo = await fazerPergunta("Digite o ID do empréstimo: ", { tipoRetorno: "i_zero" })

        try {
            const emprestimo = await this.service.buscarEmprestimoPorIdServ(id_emprestimo)

            exibirEmprestimosDetalhadoTabela([emprestimo])

            if (emprestimo.status === "DEVOLVIDO") {
                erroMsg("Este empréstimo já foi devolvido.")
                return
            }

            alertaMsg("Devolução será registrada para todos os livros deste empréstimo.")

            const confirmacao = await fazerPergunta("Confirmar devolução? (S/N): ")

            if (confirmacao.toLowerCase() !== "s") {
                alertaMsg("Operação cancelada.")
                return
            }

            const emprestimoDevolvido = await this.service.devolucaoEmprestimoServ(id_emprestimo)
            sucessoMsg(`Devolução registrada com sucesso!\n\nID Empréstimo: "${id_emprestimo}" | Status: "${emprestimoDevolvido.status}"`)
        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error)

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao devolver o empréstimo.")
            tratarErro(error, "Ocorreu um erro inesperado ao devolver empréstimo.")
        }
    }

    // FUNÇÃO PARA CONVERTER IDS DE LIVROS EM ARRAY DE NÚMEROS
    private converterIdsLivros(entrada: string): number[] {
        const partes = entrada
            .split(",")
            .map(parte => parte.trim())

        const ids = partes.map(Number)

        const possuiIdInvalido = ids.some(id => !Number.isInteger(id) || id <= 0)

        if (possuiIdInvalido) {
            throw new Error(
                "Informe apenas IDs inteiros positivos separados por vírgula."
            )
        }
        return ids
    }
}