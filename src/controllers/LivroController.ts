import * as readline from 'readline';
import { criarLivroServ } from '../services/LivroService';
import {fazerPergunta} from "../utils/readlineUtil";


export async function livroControllerCriar(): Promise<void> {
    console.log("\n=== CADASTRO DE NOVO LIVRO ===");

    // 1 Dados do usuário
    const titulo = await fazerPergunta("Título do livro: ");
    const isbn = await fazerPergunta("Código ISBN: ");
    const qtdEstoqueStr = await fazerPergunta("Quantidade em estoque: ");
    const idAutorStr = await fazerPergunta("ID do Autor: ");
    const anoPublicacaoStr = await fazerPergunta("Ano de publicação (Opcional): ", {aceitarVazio: true});

    // Converte string para number
    const quantidade_estoque = parseInt(qtdEstoqueStr, 10);
    const id_autor = parseInt(idAutorStr, 10);
    const ano_publicacao = anoPublicacaoStr ? parseInt(anoPublicacaoStr, 10) : undefined;

    console.log(quantidade_estoque);
    console.log(id_autor);
    console.log(ano_publicacao);


}
