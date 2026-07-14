import {
    atualizarLivroServ,
    buscarLivroPorIdServ,
    buscarLivroPorTituloServ,
    criarLivroServ,
    deletarLivroServ,
    listarLivrosServ
} from '../services/LivroService';
import {fazerPergunta, rl} from "../utils/leitorFormadorDeEntradas";
import {validarISBN} from "../utils/validadores";
import {listarAutoresServ} from "../services/AutorService";

export async function livroControllerListar(): Promise<void> {
    try {
        const lista = await listarLivrosServ()
        console.table(lista)
    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
    }
}

export async function livroControllerProcurarPorNome(): Promise<void> {
    const livroNome = await fazerPergunta("Nome do livro: ")
    try {
        const lista = await buscarLivroPorTituloServ(livroNome)
        console.table(lista)
    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
    }

}


export async function livroControllerCriar(): Promise<void> {
    console.log("\n=== CADASTRO DE NOVO LIVRO ===");

    // 1 Dados do usuário
    const titulo = await fazerPergunta("Título do livro: ");
    let isbn: string;
    do {
        // usei Number pois ele já limpa de 978-1-349-075-37-9 para 9781349075379
        const isbnNumber = await fazerPergunta("Código ISBN: ", {tipoRetorno:"i_zero", aceitarVazio: false});
        isbn = String(isbnNumber ?? ""); // Convert para string, se for null fica como ""
        if (!validarISBN(isbn)) console.error("❌ Código ISBN inválido")
    } while (!validarISBN(isbn))
    const quantidade_estoque = await fazerPergunta("Quantidade em estoque: ", {
        aceitarVazio: true, tipoRetorno: 'i_zero'});
    console.log("\n========================================");
    console.log(  "=========== Lista de autores: ==========")
    console.log("========================================\n");
    try {
        console.table(await listarAutoresServ())
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
        return
    }
    const id_autor = await fazerPergunta("ID do Autor: ", {tipoRetorno: 'i_zero'});
    const ano_publicacao = await fazerPergunta("Ano de publicação (Opcional): ",
        {aceitarVazio: true, tipoRetorno: 'i_null'});

    try {
        const novoLivro = await criarLivroServ(titulo,isbn,quantidade_estoque,id_autor,ano_publicacao);
        console.log(`\n🎉 Livro "${novoLivro.titulo}" cadastrado com sucesso!`);

    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
    }
}

export async function livroControllerAtualizar(): Promise<void> {
    const id = await fazerPergunta("Numero do id do livro: ", {tipoRetorno: 'i_zero'});
    let livroNoDb
    try {
        livroNoDb = await buscarLivroPorIdServ(id)
    } catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
        return ;
    }
    console.table(livroNoDb);
    const titulo = await fazerPergunta("Título do livro: ", {valorOriginal: livroNoDb[0].titulo});
    let isbn: string;
    do {
        // usei Number pois ele já limpa de 978-1-349-075-37-9 para 9781349075379
        const isbnNumber = await fazerPergunta("Código ISBN: ", {
            tipoRetorno:"i_zero", aceitarVazio: false, valorOriginal: livroNoDb[0].isbn});
        isbn = String(isbnNumber ?? ""); // Convert para string, se for null fica como ""
        if (!validarISBN(isbn)) console.error("❌ Código ISBN inválido")
    } while (!validarISBN(isbn))
    const quantidade_estoque = await fazerPergunta("Quantidade em estoque: ", {
        aceitarVazio: true, tipoRetorno: 'i_zero', valorOriginal: livroNoDb[0].quantidade_estoque ?? 0});
    console.log("\n========================================");
    console.log(  "=========== Lista de autores: ==========")
    console.log("========================================\n");

    try {
        console.table(await listarAutoresServ())
    }catch (error: any) {
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
        return ;
    }
    const id_autor = await fazerPergunta("ID do Autor: ", {
        tipoRetorno: 'i_zero', valorOriginal: livroNoDb[0].id_autor});
    const ano_publicacao = await fazerPergunta("Ano de publicação (Opcional): ", {
        aceitarVazio: true, tipoRetorno: 'i_null', valorOriginal: livroNoDb[0].ano_publicacao ?? null});

    try {
        const novoLivro = await atualizarLivroServ(id, titulo,isbn,quantidade_estoque,id_autor,ano_publicacao);
        console.log(`\n🎉 Livro "${novoLivro.titulo}" atualizado com sucesso!`);

    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
    }
}

export async function livroControllerDeletar(): Promise<void> {
    console.error("========================================\n");
    console.error("============== D E L E T A R============\n");
    console.error("========================================\n");
    const id = await fazerPergunta("Numero do id do livro: ", {tipoRetorno: 'i_zero'});
    let livroNoDb ;
    try {
        livroNoDb = await buscarLivroPorIdServ(id)
    }catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
        return
    }

    if (livroNoDb.length <= 0 ){
        console.log("Livro não encontrado")
        return
    }

    console.error("========================================\n");
    console.error("============== D E L E T A R============\n");
    console.error("========================================\n");
    console.table(livroNoDb);
    const confimacao = await fazerPergunta("Excluir livor? (S/N): ", {valorOriginal: 'N'});
    if (confimacao.toLowerCase() !== 's') return
    try {
        const result = await deletarLivroServ(id);
        if (!result) throw new Error("❌ Erro desconhecido.",);
        console.log(`\n🎉 Livro "${livroNoDb[0].titulo}" excluído com sucesso!`);
    } catch (error: any){
        console.log("\n========================================");
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else console.error(error.message || "❌ Ocorreu um erro inesperado ao salvar o livro.");
        console.log("========================================\n");
    }
}

function tratarErroBanco(error: any): void {
    switch (error.code) {
        case '23505': // Unique Violation
            console.error("❌ Já existe um livro cadastrado com este código ISBN.");
            break;
        case '23503': // Foreign Key Violation
            console.error("❌ ID do Autor informado não existe no sistema.");
            break;
        case '23502': // Not Null Violation
            console.error("❌ Campo obrigatório não foi preenchido corretamente.");
            break;
        default:
            // Exibe a mensagem genérica do banco caso seja outro erro (ex: falha de conexão)
            console.error(`❌ Erro crítico no Banco de Dados ( ${error.code} ): ${error.message}`);
    }
}
