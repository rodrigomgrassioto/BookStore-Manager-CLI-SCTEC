import { livrosDisponiveisServ, livrosEmprestadosServ, livrosCadastradosPorAutorServ, quantidadeEmprestimosPorLivroServ, clientesComEmprestimosAtivosServ } from "../services/RelatorioService";
import { exibirClientesComEmprestivosAtivos, exibirLivrosCadastradosPorAutor, exibirLivrosDisponiveisTabela, exibirLivrosEmprestados, exibirQuantidadeEmprestimoPorLivro } from "../utils/formatadoresTexto";
import { tratarErroBanco } from "../utils/tratamentosErrosBD";

export async function livrosDisponiveisController(): Promise<void> {
    console.log("\n=== LIVROS DISPONÍVEIS ===");

    try {
        const livrosDisponiveis = await livrosDisponiveisServ();
        
        exibirLivrosDisponiveisTabela(livrosDisponiveis);
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao gerar o relatório.");
        console.log("========================================\n");
    };
};

export async function livrosEmprestadosController(): Promise<void> {
    console.log("\n=== LIVROS EMPRESTADOS ===");

    try {
        const livrosEmprestados = await livrosEmprestadosServ();
        
        exibirLivrosEmprestados(livrosEmprestados);
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao gerar o relatório.");
        console.log("========================================\n");
    };
};

export async function livrosCadastradosPorAutorController(): Promise<void> {
    console.log("\n=== LIVROS CADASTRADOS POR AUTOR ===");

    try {
        const livrosCadastradosPorAutor = await livrosCadastradosPorAutorServ();
        
        exibirLivrosCadastradosPorAutor(livrosCadastradosPorAutor);
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao gerar o relatório.");
        console.log("========================================\n");
    };
};

export async function quantidadeEmprestimoPorLivroController(): Promise<void> {
    console.log("\n=== QUANTIDADE DE EMPRÉSTIMOS POR LIVRO ===");

    try {
        const quantidadeEmprestimoPorLivro = await quantidadeEmprestimosPorLivroServ();
        
        exibirQuantidadeEmprestimoPorLivro(quantidadeEmprestimoPorLivro);
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao gerar o relatório.");
        console.log("========================================\n");
    };
};

export async function clientesComEmprestimosAtivosController(): Promise<void> {
    console.log("\n=== CLIENTES COM EMPRÉSTIMOS ATIVOS ===");

    try {
        const clientesComEmprestimosAtivos = await clientesComEmprestimosAtivosServ();
        
        exibirClientesComEmprestivosAtivos(clientesComEmprestimosAtivos);
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao gerar o relatório.");
        console.log("========================================\n");
    };
};

