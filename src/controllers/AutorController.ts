import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import { tratarErroBanco } from "../utils/tratamentosErrosBD";
// import { atualizarAutorServ, listarAutoresServ, cadastrarAutorServ, deletarAutorServ, buscarAutorPorIdServ } from '../services/AutorService';
import { AutorService, IAutorService } from "../services/AutorService";
import {exibirAutoresTabela} from "../utils/formatadoresTexto";
import {alertaMsg, erroMsg, sucessoMsg} from "../estilos/estilo";
import {AutorModel} from "../models/AutorModel";

export class AutorController {
    private readonly service: IAutorService;

    constructor(service: IAutorService = new AutorService()) {
        this.service = service;
    }

    public async autorControllerCadastrar(): Promise<void> {
        const nome = await fazerPergunta("Digite o nome do autor: ");
        const nacionalidade = await fazerPergunta("Digite a nacionalidade do autor (Opcional): ", {aceitarVazio: true});

        try {
            await this.service.cadastrarAutorServ(nome, nacionalidade);
            sucessoMsg(`Autor "${nome}" cadastrado com sucesso!`);

        } catch (error: any){
            if (error.code) tratarErroBanco(error); // Erro no PostgreSQL
            else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o autor."); // Erro do service
        }
    }

    public async autorControllerListar(): Promise<void> {
        try {
            const autores = await this.service.listarAutoresServ();
            exibirAutoresTabela(autores);
        } catch (error: any){
            if (error.code) tratarErroBanco(error); // Erro no PostgreSQL
            else erroMsg(error.message || "Ocorreu um erro inesperado ao listar os autores."); // Erro do service
        }
    }

    public async autorControlerBuscarPorId(): Promise<void> {
        const id_autor = await fazerPergunta("Digite o número do ID do autor: ", {tipoRetorno: 'i_zero'});

        try {
            const autor = await this.service.buscarAutorPorIdServ(id_autor);
            if (!autor) {
                erroMsg("Autor não encontrado.");
                return;
            }
            exibirAutoresTabela([autor]);
        } catch (error: any){
            // Erro no PostgreSQL
            if (error.code) tratarErroBanco(error);

            // Erro do service
            else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
        }
    }

    public async autorControllerAtualizar(): Promise<void> {
        let autores: AutorModel[];
        try {
            autores = await this.service.listarAutoresServ();
        } catch (error: any) {
            // Erro no PostgreSQL
            if (error.code) tratarErroBanco(error);

            // Erro do service
            else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
            return;
        }

        if (!autores || autores.length === 0){
            alertaMsg("Sem autores cadastrados")
            return;
        }
        exibirAutoresTabela(autores)

        const id_autor = await fazerPergunta("Digite o número do ID do autor: ", {tipoRetorno: 'i_zero'});

        let autorDB;
        try {
            autorDB = await this.service.buscarAutorPorIdServ(id_autor);
        } catch (error: any) {
            // Erro no PostgreSQL
            if (error.code) tratarErroBanco(error);

            // Erro do service
            else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
            return;
        }

        if (!autorDB) {
            erroMsg("Autor não encontrado.");
            return;
        }

        exibirAutoresTabela([autorDB]);

        const nome = await fazerPergunta("Digite o nome do autor: ", {valorOriginal: autorDB.nome});
        const nacionalidade = await fazerPergunta("Digite a nova nacionalidade do autor: ", {valorOriginal: autorDB.nacionalidade, aceitarVazio: true});

        try {
            const autorAtualizado = await this.service.atualizarAutorServ(id_autor, nome, nacionalidade);
            sucessoMsg(`Autor "${autorAtualizado.nome}" atualizado com sucesso!`)

        } catch (error: any){
            // Erro no PostgreSQL
            if (error.code) tratarErroBanco(error)

            // Erro do service
            else erroMsg(error.message || "Ocorreu um erro inesperado ao atualizar o autor.");
        }
    }

    public async autorControllerDeletar(): Promise<void> {
        let autores: AutorModel[];
        try {
            autores = await this.service.listarAutoresServ();
        } catch (error: any) {
            // Erro no PostgreSQL
            if (error.code) tratarErroBanco(error);

            // Erro do service
            else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
            return;
        }

        if (!autores || autores.length === 0){
            alertaMsg("Sem autores cadastrados");
            return;
        }

        exibirAutoresTabela(autores);

        const id_autor = await fazerPergunta("Digite o número do ID do autor que deseja deletar: ", {tipoRetorno: 'i_zero'});

        let autorDb;
        try {
            autorDb = await this.service.buscarAutorPorIdServ(id_autor);
        } catch (error: any) {
            // Erro no PostgreSQL
            if (error.code) tratarErroBanco(error);

            // Erro do service
            else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
            return;
        }

        if (!autorDb) {
            erroMsg("Autor não encontrado.");
            return;
        }
        exibirAutoresTabela([autorDb]);
        alertaMsg("ATENÇÃO: Ação é irreversível e irá deletar o autor do sistema.");

        const confirmacao = await fazerPergunta("Deseja realmente excluir este autor? (S/N): ", {aceitarVazio: false});
        if (confirmacao.toLowerCase() !== 's') {
            alertaMsg("Operação de exclusão cancelada.");
            return;
        }

        try {
            const autorDeletado = await this.service.deletarAutorServ(id_autor);
            if (!autorDeletado) throw new Error("Erro desconhecido ao tentar deletar o autor.");

            sucessoMsg(`Autor "(ID: ${autorDb.id_autor} - Nome: ${autorDb.nome}" deletado com sucesso!`);

        } catch (error: any){
            // Erro no PostgreSQL
            if (error.code) tratarErroBanco(error);

            // Erro do service
            else erroMsg(error.message || "Ocorreu um erro inesperado ao deletar o autor.")
        }
    }
}


