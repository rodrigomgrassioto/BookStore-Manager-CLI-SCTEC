import * as readline from 'readline';
import { criarLivroServ } from '../services/LivroService';
import {fazerPergunta} from "../utils/readlineUtil";


export async function livroControllerCriar(): Promise<void> {
    console.log("\n=== CADASTRO DE NOVO LIVRO ===");

    // 1 Dados do usuário
    const titulo = await fazerPergunta("Título do livro: ");
    const isbn = await fazerPergunta("Código ISBN: ");
    const quantidade_estoque = await fazerPergunta("Quantidade em estoque: ", {tipoRetorno: 'i'});
    const id_autor = await fazerPergunta("ID do Autor: ", {tipoRetorno: 'i'});
    const ano_publicacao = await fazerPergunta("Ano de publicação (Opcional): ", {aceitarVazio: true, tipoRetorno: 'i'});

    // Converte string para number

    console.log("===== RETORNOS ====")
    console.log(titulo);
    console.log(isbn);
    console.log(quantidade_estoque);
    console.log(id_autor);
    console.log(ano_publicacao);


}
