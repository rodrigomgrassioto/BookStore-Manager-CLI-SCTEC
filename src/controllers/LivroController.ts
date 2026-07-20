import {fazerPergunta} from "../utils/leitorFormatadorDeEntradas";
import {validarISBN} from "../utils/validadores";
import {IAutorService} from "../services/AutorService";
import {tratarErro, tratarErroBanco} from '../utils/tratarErros';
import {exibirAutoresTabela, exibirLivrosTabela} from "../utils/formatadoresTexto";
import {alertaMsg, erroMsg, sucessoMsg} from "../estilos/estilo";
import {AutorModel} from "../models/AutorModel";
import {LivroCompletoModel} from "../models/LivroModel";
import {ILivroService} from "../services/LivroService";

export class LivroController {
    private readonly service: ILivroService;
    private readonly serviceAutor: IAutorService;

    constructor(service: ILivroService, serviceAutor: IAutorService ) {
        this.service = service;
        this.serviceAutor = serviceAutor;
    }
    public async livroControllerListar(): Promise<void> {
        try {
            const lista = await this.service.listarLivrosServ();
            exibirLivrosTabela(lista);
        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
            tratarErro(error, "Ocorreu um erro inesperado ao listar livros.")
        }
    }

    public async livroControllerProcurarPorNome(): Promise<void> {
        const livroNome = await fazerPergunta("Nome do livro: ");

        try {
            const lista = await this.service.buscarLivroPorTituloServ(livroNome);
            exibirLivrosTabela(lista);
        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao procurar livro.")
        }
    }

    public async livroControllerProcurarPorId(): Promise<void> {
        const livroId = await fazerPergunta("ID do livro: ", {tipoRetorno: "i_zero", aceitarVazio: false});

        try {
            const lista = await this.service.buscarLivroPorIdServ(livroId);
            exibirLivrosTabela(lista);
        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao procurar livro.")
        }
    }

    public async livroControllerCriar(): Promise<void> {
        let autoresCadastrados:AutorModel[];

        try {
            autoresCadastrados = await this.serviceAutor.listarAutoresServ();
        } catch (error: any) {
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao procurar autores.")
            return;
        }

        const titulo = await fazerPergunta("Título do livro: ");

        let isbn: string;

        do {
            const isbnNumber = await fazerPergunta("Código ISBN - 0 (Zero) para cancelar: ", {tipoRetorno:"i_zero", aceitarVazio: false});
            isbn = String(isbnNumber ?? "");
            if (isbn === '0') return;
            if (!validarISBN(isbn)) erroMsg("Código ISBN inválido");
        } while (!validarISBN(isbn));

        const quantidade_estoque = await fazerPergunta("Quantidade em estoque: ", {
            aceitarVazio: true, tipoRetorno: 'i_zero'});

        exibirAutoresTabela(autoresCadastrados);

        const id_autor = await fazerPergunta("ID do Autor: ", {tipoRetorno: 'i_zero'});
        const ano_publicacao = await fazerPergunta("Ano de publicação (Opcional): ",
            {aceitarVazio: true, tipoRetorno: 'i_null'});

        try {
            const novoLivro = await this.service.criarLivroServ(titulo,isbn,quantidade_estoque,id_autor,ano_publicacao);
            sucessoMsg(`Livro "${novoLivro.titulo}" cadastrado com sucesso!`);

        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.");
            tratarErro(error, "Ocorreu um erro inesperado ao salvar livro.")
        }
    }

    public async livroControllerAtualizar(): Promise<void> {
        let livrosLista:LivroCompletoModel[];

        try {
            livrosLista = await this.service.listarLivrosServ();
        }catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao listar livros.")
            return;
        }

        if(livrosLista.length === 0){
            alertaMsg("Sem livros para editar");
            return;
        }

        exibirLivrosTabela(livrosLista);
        const id = await fazerPergunta("Numero do id do livro: ", {tipoRetorno: 'i_zero'});

        let livroNoDb;
        try {
            livroNoDb = await this.service.buscarLivroPorIdServ(id);
        } catch (error: any) {
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao procurar livro.")
            return ;
        }

        if (!livroNoDb || livroNoDb.length === 0) {
            erroMsg("Livro não encontrado.");
            return;
        }

        exibirLivrosTabela(livroNoDb);
        const titulo = await fazerPergunta("Título do livro: ", {valorOriginal: livroNoDb[0].titulo});

        let isbn: string;

        do {
            const isbnNumber = await fazerPergunta("Código ISBN: ", {
                tipoRetorno:"i_zero", aceitarVazio: false, valorOriginal: livroNoDb[0].isbn});
            isbn = String(isbnNumber ?? "");
            if (!validarISBN(isbn)) erroMsg("Código ISBN inválido");
        } while (!validarISBN(isbn))

        const quantidade_estoque = await fazerPergunta("Quantidade em estoque: ", {
            aceitarVazio: true, tipoRetorno: 'i_zero', valorOriginal: livroNoDb[0].quantidade_estoque ?? 0});

        try {
            exibirAutoresTabela(await this.serviceAutor.listarAutoresServ());
        }catch (error: any) {
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao listar autores.")
            return
        }

        const id_autor = await fazerPergunta("ID do Autor: ", {
            tipoRetorno: 'i_zero', valorOriginal: livroNoDb[0].id_autor});
        const ano_publicacao = await fazerPergunta("Ano de publicação (Opcional): ", {
            aceitarVazio: true, tipoRetorno: 'i_null', valorOriginal: livroNoDb[0].ano_publicacao ?? null});

        try {
            const novoLivro = await this.service.atualizarLivroServ(id, titulo,isbn,quantidade_estoque,id_autor,ano_publicacao);
            sucessoMsg(`Livro "${novoLivro.titulo}" atualizado com sucesso!`);

        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao atualizar livro.")
        }
    }

    public async livroControllerDeletar(): Promise<void> {
        let livrosLista:LivroCompletoModel[];

        try {
            livrosLista = await this.service.listarLivrosServ();
        }catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao salvar o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao listar livros.")
            return;
        }

        if(livrosLista.length === 0){
            alertaMsg("Sem livros para excluir");
            return;
        }

        exibirLivrosTabela(livrosLista);
        const id = await fazerPergunta("Numero do id do livro: ", {tipoRetorno: 'i_zero'})

        let livroNoDb;

        try {
            livroNoDb = await this.service.buscarLivroPorIdServ(id);
        }catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao buscar livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao buscar livro.")
            return;
        }

        if (livroNoDb.length <= 0 ){
            erroMsg("Livro não encontrado")
            return;
        }

        exibirLivrosTabela(livroNoDb);
        const confimacao = await fazerPergunta("Excluir livor? (S/N): ", {valorOriginal: 'N'})

        if (confimacao.toLowerCase() !== 's'){
            alertaMsg("Operação cancelada.")
            return;
        }

        try {
            const result = await this.service.deletarLivroServ(id);
            if (!result) throw new Error("Erro desconhecido.",);
            sucessoMsg(`Livro "${livroNoDb[0].titulo}" excluído com sucesso!`)
        } catch (error: any){
            // Erro no PostgreSQL
            // if (error.code) tratarErroBanco(error);

            // Erro do service
            // else erroMsg(error.message || "Ocorreu um erro inesperado ao excluir o livro.")
            tratarErro(error, "Ocorreu um erro inesperado ao excluir livro.")
        }
    }
}
