import {
    atualizarLivroServ,
    buscarLivroPorIdServ,
    buscarLivroPorTituloServ,
    criarLivroServ,
    deletarLivroServ,
    listarLivrosServ
} from '../services/LivroService';
import {fazerPergunta, rl} from "../utils/leitorFormatadorDeEntradas";
import {validarISBN} from "../utils/validadores";
import {listarAutoresServ} from "../services/AutorService";
import { tratarErroBanco } from '../utils/tratamentosErrosBD';
import {exibirAutoresTabela, exibirLivrosTabela} from "../utils/formatadoresTexto";
import {alertaMsg, erroMsg, sucessoMsg} from "../estilos/estilo";
import {AutorModel} from "../models/AutorModel";

export async function livroControllerListar(): Promise<void> {
    try {
        const lista = await listarLivrosServ()
        exibirLivrosTabela(lista)
    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
    }
}

export async function livroControllerProcurarPorNome(): Promise<void> {
    const livroNome = await fazerPergunta("Nome do livro: ")
    try {
        const lista = await buscarLivroPorTituloServ(livroNome)
        // console.table(lista)
        exibirLivrosTabela(lista)
    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
    }
}

export async function livroControllerProcurarPorId(): Promise<void> {
    const livroId = await fazerPergunta("ID do livro: ", {tipoRetorno: "i_zero", aceitarVazio: false})
    try {
        const lista = await buscarLivroPorIdServ(livroId)
        // console.table(lista)
        exibirLivrosTabela(lista)
    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
    }

}


export async function livroControllerCriar(): Promise<void> {
    let autoresCadastrados:AutorModel[]
    try {
        autoresCadastrados = await listarAutoresServ()
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
        return
    }
    // 1 Dados do usuário
    const titulo = await fazerPergunta("Título do livro: ");
    let isbn: string;
    do {
        // usei Number pois ele já limpa de 978-1-349-075-37-9 para 9781349075379
        const isbnNumber = await fazerPergunta("Código ISBN - 0 (Zero) para cancelar: ", {tipoRetorno:"i_zero", aceitarVazio: false});
        isbn = String(isbnNumber ?? ""); // Convert para string, se for null fica como ""
        if (isbn === '0') return
        if (!validarISBN(isbn)) erroMsg("Código ISBN inválido")
    } while (!validarISBN(isbn))
    const quantidade_estoque = await fazerPergunta("Quantidade em estoque: ", {
        aceitarVazio: true, tipoRetorno: 'i_zero'});

    exibirAutoresTabela(autoresCadastrados)
    const id_autor = await fazerPergunta("ID do Autor: ", {tipoRetorno: 'i_zero'});
    const ano_publicacao = await fazerPergunta("Ano de publicação (Opcional): ",
        {aceitarVazio: true, tipoRetorno: 'i_null'});

    try {
        const novoLivro = await criarLivroServ(titulo,isbn,quantidade_estoque,id_autor,ano_publicacao);
        sucessoMsg(`Livro "${novoLivro.titulo}" cadastrado com sucesso!`);

    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
    }
}

export async function livroControllerAtualizar(): Promise<void> {
    const livros = await listarLivrosServ()
    if(livros.length === 0){
        alertaMsg("Sem livros para editar")
        return
    }
    exibirLivrosTabela(livros)
    const id = await fazerPergunta("Numero do id do livro: ", {tipoRetorno: 'i_zero'});
    let livroNoDb
    try {
        livroNoDb = await buscarLivroPorIdServ(id)
        console.log("res:")
    } catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
        return ;
    }
    if (!livroNoDb || livroNoDb.length === 0) {
        erroMsg("Livro não encontrado.")
        return
    }
    // console.table(livroNoDb);
    exibirLivrosTabela(livroNoDb);
    const titulo = await fazerPergunta("Título do livro: ", {valorOriginal: livroNoDb[0].titulo});
    let isbn: string;
    do {
        // usei Number pois ele já limpa de 978-1-349-075-37-9 para 9781349075379
        const isbnNumber = await fazerPergunta("Código ISBN: ", {
            tipoRetorno:"i_zero", aceitarVazio: false, valorOriginal: livroNoDb[0].isbn});
        isbn = String(isbnNumber ?? ""); // Convert para string, se for null fica como ""
        if (!validarISBN(isbn)) erroMsg("Código ISBN inválido")
    } while (!validarISBN(isbn))
    const quantidade_estoque = await fazerPergunta("Quantidade em estoque: ", {
        aceitarVazio: true, tipoRetorno: 'i_zero', valorOriginal: livroNoDb[0].quantidade_estoque ?? 0});

    try {
        // console.table(await listarAutoresServ())
        exibirAutoresTabela(await listarAutoresServ())
    }catch (error: any) {
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
        return ;
    }
    const id_autor = await fazerPergunta("ID do Autor: ", {
        tipoRetorno: 'i_zero', valorOriginal: livroNoDb[0].id_autor});
    const ano_publicacao = await fazerPergunta("Ano de publicação (Opcional): ", {
        aceitarVazio: true, tipoRetorno: 'i_null', valorOriginal: livroNoDb[0].ano_publicacao ?? null});

    try {
        const novoLivro = await atualizarLivroServ(id, titulo,isbn,quantidade_estoque,id_autor,ano_publicacao);
        sucessoMsg(`Livro "${novoLivro.titulo}" atualizado com sucesso!`);

    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
    }
}

export async function livroControllerDeletar(): Promise<void> {
    const livros = await listarLivrosServ()
    if(livros.length === 0){
        alertaMsg("Sem livros para excluir")
        return
    }
    exibirLivrosTabela(livros)
    const id = await fazerPergunta("Numero do id do livro: ", {tipoRetorno: 'i_zero'});
    let livroNoDb ;
    try {
        livroNoDb = await buscarLivroPorIdServ(id)
    }catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar livro.");
        return
    }

    if (livroNoDb.length <= 0 ){
        erroMsg("Livro não encontrado")
        return
    }

    exibirLivrosTabela(livroNoDb);
    const confimacao = await fazerPergunta("Excluir livor? (S/N): ", {valorOriginal: 'N'});
    if (confimacao.toLowerCase() !== 's'){
        alertaMsg("Operação cancelada.")
        return
    }
    try {
        const result = await deletarLivroServ(id);
        if (!result) throw new Error("Erro desconhecido.",);
        sucessoMsg(`Livro "${livroNoDb[0].titulo}" excluído com sucesso!`);
    } catch (error: any){
        // Erro no PostgreSQL
        if (error.code) tratarErroBanco(error);

        // Erro do service
        else erroMsg(error.message || "Ocorreu um erro inesperado ao excluir o livro.");
    }
}
