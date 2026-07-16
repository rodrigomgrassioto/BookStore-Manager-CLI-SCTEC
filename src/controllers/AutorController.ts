import * as readline from 'readline';
import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import * as formatadoresTexto from "../utils/formatadoresTexto";
import { tratarErroBanco } from "../utils/tratamentosErrosBD";
import { atualizarAutorServ, listarAutoresServ, cadastrarAutorServ, deletarAutorServ, buscarAutorPorIdServ } from '../services/AutorService';

export async function autorControllerCadastrar(): Promise<void> {
    console.log("\n=== CADASTRAR NOVO AUTOR ===");

    // Imput do usuário
    const nome = await fazerPergunta("Digite o nome do autor: ");
    const nacionalidade = await fazerPergunta("Digite a nacionalidade do autor (Opcional): ", {aceitarVazio: true});

    try {
        await cadastrarAutorServ(nome, nacionalidade);
        console.log(`\n🎉 Autor "${nome}" cadastrado com sucesso!`);

    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o autor.");
        console.log("========================================\n");
    };
};


export async function autorControllerListar(): Promise<void> {
    console.log("\n=== LISTAR AUTORES ===");

    try {
        const autores = await listarAutoresServ();
        // Exibe os autores no console em formato de tabela
        formatadoresTexto.exibirAutoresTabela(autores)
    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao listar os autores.");
        console.log("========================================\n");
    };  
};

export async function autorControlerBuscarPorId(): Promise<void> {
    console.log("\n=== BUSCAR AUTOR POR ID ===");

    // Imput do usuário
    const id_autor = await fazerPergunta("Digite o número do ID do autor: ", {tipoRetorno: 'i_zero'});

    try {
        const autor = await buscarAutorPorIdServ(id_autor);
        if (!autor) {
            console.log("\nAutor não encontrado.\n");
            return;
        }
        
        console.log(formatadoresTexto.exibirAutoresTabela([autor]));
    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao buscar o autor.");
        console.log("========================================\n");
    };  
};


export async function autorControllerAtualizar(): Promise<void> {
    console.log("\n=== ATUALIZAR AUTOR ===");
    console.log(formatadoresTexto.exibirAutoresTabela(await listarAutoresServ()));
    // Imput do usuário
    const id_autor = await fazerPergunta("Digite o número do ID do autor: ", {tipoRetorno: 'i_zero'});

    let autoresDB;
    try {
        autoresDB = await buscarAutorPorIdServ(id_autor);
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao buscar o autor.");
        console.log("========================================\n");
        return;
    }
       
    if (!autoresDB) {
        console.log("\n========================================");
        console.error("❌ Autor não encontrado.");
        console.log("========================================\n");
        return;
    }
    
    console.log(formatadoresTexto.exibirAutoresTabela([autoresDB]));

    const nome = await fazerPergunta("Digite o nome do autor: ", {valorOriginal: autoresDB.nome});
    const nacionalidade = await fazerPergunta("Digite a nova nacionalidade do autor: ", {aceitarVazio: true});

    try {
        const autorAtualizado = await atualizarAutorServ(id_autor, nome, nacionalidade);
        console.log(`\n🎉 Autor "${autorAtualizado.nome}" atualizado com sucesso!`);

    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
    };
};


export async function autorControllerDeletar(): Promise<void> {
    console.log("\n=== DELETAR AUTOR ===");
    console.log(formatadoresTexto.exibirAutoresTabela(await listarAutoresServ()));

    // Imput do usuário
    const id_autor = await fazerPergunta("Digite o número do ID do autor que deseja deletar: ", {tipoRetorno: 'i_zero'});

    let autorDb;
    try {
        autorDb = await buscarAutorPorIdServ(id_autor);
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao buscar o autor.");
        console.log("========================================\n");
        return;
    };
       
    if (!autorDb) {
        console.log("\n========================================");
        console.error("❌ Autor não encontrado.");
        console.log("========================================\n");
        return;
    };
    console.log(formatadoresTexto.exibirAutoresTabela([autorDb]));
    console.log("\n⚠️  ATENÇÃO: Esta ação é irreversível e irá deletar o autor do sistema.\n");

    const confirmacao = await fazerPergunta("Deseja realmente excluir este autor? (S/N): ", {aceitarVazio: false});
    if (confirmacao.toLowerCase() !== 's') {
        console.log("Operação de exclusão cancelada.");
        return;
    };

    try {
        const autorDeletado = await deletarAutorServ(id_autor);
        if (!autorDeletado) throw new Error("❌ Erro desconhecido ao tentar deletar o autor.");

        console.log(`\n🎉 Autor "(ID: ${autorDb.id_autor} - Nome: ${autorDb.nome}" deletado com sucesso!`);

    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
    };
};


