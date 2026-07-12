import { criarLivroServ } from '../services/LivroService';
import {fazerPergunta, rl} from "../utils/readlineUtil";
import {validarISBN} from "../utils/validadores";

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
    const quantidade_estoque = await fazerPergunta("Quantidade em estoque: ", {tipoRetorno: 'i_zero'});
    const id_autor = await fazerPergunta("ID do Autor: ", {tipoRetorno: 'i_zero'});
    const ano_publicacao = await fazerPergunta("Ano de publicação (Opcional): ", {aceitarVazio: true, tipoRetorno: 'i_null'});

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
