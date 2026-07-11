import * as readline from 'readline';
import { criarLivroServ } from '../services/LivroService';
import {fazerPergunta} from "../utils/readlineUtil";


export async function livroControllerCriar(): Promise<void> {
    console.log("\n=== CADASTRO DE NOVO LIVRO ===");

    // 1 Dados do usuário
    console.log('entrou');
    const titulo = await fazerPergunta("Título do livro: ");
    console.log("Titulo é: "+titulo);
    console.log('passou');
    const isbn = await fazerPergunta("Código ISBN: ");
    const qtdEstoqueStr = await fazerPergunta("Quantidade em estoque: ");
    const idAutorStr = await fazerPergunta("ID do Autor: ");
    const anoPublicacaoStr = await fazerPergunta("Ano de publicação (Opcional): ", {aceitarVazio: true});

    console.log("\n=== CADASTRO DE LIVRO ===");
    console.log(titulo)
    console.log("\n=== CADASTRO DE LIVRO ===");
    console.log(isbn)
    console.log("\n=== CADASTRO DE LIVRO ===");
    console.log(qtdEstoqueStr)
    console.log("\n=== CADASTRO DE LIVRO ===");
    console.log(idAutorStr)
    console.log("\n=== CADASTRO DE LIVRO ===");
    console.log(anoPublicacaoStr)

    console.log("\n=== FIM ===");

}
