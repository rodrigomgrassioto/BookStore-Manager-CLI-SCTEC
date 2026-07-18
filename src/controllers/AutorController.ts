import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import { tratarErroBanco } from "../utils/tratamentosErrosBD";
import { atualizarAutorServ, listarAutoresServ, cadastrarAutorServ, deletarAutorServ, buscarAutorPorIdServ } from '../services/AutorService';
import {exibirAutoresTabela} from "../utils/formatadoresTexto";
import {alertaMsg, erroMsg, sucessoMsg} from "../estilos/estilo";

export async function autorControllerCadastrar(): Promise<void> {
    // Imput do usuário
    const nome = await fazerPergunta("Digite o nome do autor: ");
    const nacionalidade = await fazerPergunta("Digite a nacionalidade do autor (Opcional): ", {aceitarVazio: true});

    try {
        await cadastrarAutorServ(nome, nacionalidade);
        sucessoMsg(`Autor "${nome}" cadastrado com sucesso!`);

    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o autor.");
    };
};


export async function autorControllerListar(): Promise<void> {
    try {
        const autores = await listarAutoresServ();
        // Exibe os autores no console em formato de tabela
        exibirAutoresTabela(autores)
    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao listar os autores.");
    };  
};

export async function autorControlerBuscarPorId(): Promise<void> {
    // Imput do usuário
    const id_autor = await fazerPergunta("Digite o número do ID do autor: ", {tipoRetorno: 'i_zero'});

    try {
        const autor = await buscarAutorPorIdServ(id_autor);
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
    };  
};


export async function autorControllerAtualizar(): Promise<void> {
    exibirAutoresTabela(await listarAutoresServ());
    // Imput do usuário
    const id_autor = await fazerPergunta("Digite o número do ID do autor: ", {tipoRetorno: 'i_zero'});

    let autoresDB;
    try {
        autoresDB = await buscarAutorPorIdServ(id_autor);
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
        return;
    }
       
    if (!autoresDB) {
        erroMsg("Autor não encontrado.");
        return;
    }
    
    exibirAutoresTabela([autoresDB]);

    const nome = await fazerPergunta("Digite o nome do autor: ", {valorOriginal: autoresDB.nome});
    const nacionalidade = await fazerPergunta("Digite a nova nacionalidade do autor: ", {valorOriginal: autoresDB.nacionalidade, aceitarVazio: true});

    try {
        const autorAtualizado = await atualizarAutorServ(id_autor, nome, nacionalidade);
        sucessoMsg(`Autor "${autorAtualizado.nome}" atualizado com sucesso!`);

    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao atualizar o autor.");
    };
};


export async function autorControllerDeletar(): Promise<void> {
    exibirAutoresTabela(await listarAutoresServ());

    // Imput do usuário
    const id_autor = await fazerPergunta("Digite o número do ID do autor que deseja deletar: ", {tipoRetorno: 'i_zero'});

    let autorDb;
    try {
        autorDb = await buscarAutorPorIdServ(id_autor);
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar o autor.");
        return;
    };
       
    if (!autorDb) {
        erroMsg("Autor não encontrado.");
        return;
    };
    exibirAutoresTabela([autorDb]);
    alertaMsg("ATENÇÃO: Ação é irreversível e irá deletar o autor do sistema.");

    const confirmacao = await fazerPergunta("Deseja realmente excluir este autor? (S/N): ", {aceitarVazio: false});
    if (confirmacao.toLowerCase() !== 's') {
        alertaMsg("Operação de exclusão cancelada.");
        return;
    };

    try {
        const autorDeletado = await deletarAutorServ(id_autor);
        if (!autorDeletado) throw new Error("❌ Erro desconhecido ao tentar deletar o autor.");

        sucessoMsg(`Autor "(ID: ${autorDb.id_autor} - Nome: ${autorDb.nome}" deletado com sucesso!`);

    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao deletar o autor.");
    };
};


