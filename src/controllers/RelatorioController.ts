import { livrosDisponiveisServ, livrosEmprestadosServ, livrosCadastradosPorAutorServ, quantidadeEmprestimosPorLivroServ, 
         clientesComEmprestimosAtivosServ } from "../services/RelatorioService";
import { exibirClientesComEmprestivosAtivos, exibirLivrosCadastradosPorAutor, exibirLivrosDisponiveisTabela, 
         exibirLivrosEmprestados, exibirQuantidadeEmprestimoPorLivro } from "../utils/formatadoresTexto";
import { tratarErroBanco } from "../utils/tratarErros";
import {erroMsg} from "../estilos/estilo";

export async function livrosDisponiveisController(): Promise<void> {

    try {
        const livrosDisponiveis = await livrosDisponiveisServ();
        
        exibirLivrosDisponiveisTabela(livrosDisponiveis);
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao gerar o relatório.");
    };
};

export async function livrosEmprestadosController(): Promise<void> {

    try {
        const livrosEmprestados = await livrosEmprestadosServ();
        
        exibirLivrosEmprestados(livrosEmprestados);
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao gerar o relatório.");
    };
};

export async function livrosCadastradosPorAutorController(): Promise<void> {

    try {
        const livrosCadastradosPorAutor = await livrosCadastradosPorAutorServ();
        
        exibirLivrosCadastradosPorAutor(livrosCadastradosPorAutor);
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao gerar o relatório.");
    };
};

export async function quantidadeEmprestimoPorLivroController(): Promise<void> {

    try {
        const quantidadeEmprestimoPorLivro = await quantidadeEmprestimosPorLivroServ();
        
        exibirQuantidadeEmprestimoPorLivro(quantidadeEmprestimoPorLivro);
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao gerar o relatório.");
    };
};

export async function clientesComEmprestimosAtivosController(): Promise<void> {

    try {
        const clientesComEmprestimosAtivos = await clientesComEmprestimosAtivosServ();
        
        exibirClientesComEmprestivosAtivos(clientesComEmprestimosAtivos);
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao gerar o relatório.");
    };
};

