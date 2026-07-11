import * as readline from 'readline';
import { criarLivroServ } from '../services/LivroService';


export async function livroControllerCriar(): Promise<void> {
    console.log("\n=== CADASTRO DE NOVO LIVRO ===");

    // 1 Dados do usuário
    const titulo = this.rl.question("Título do livro: ",(resp) => resolve(resp) );
    const isbn = this.rl.question("Código ISBN: ");
    const qtdEstoqueStr = this.rl.question("Quantidade em estoque: ");
    const idAutorStr = rl.question("ID do Autor: ");
    const anoPublicacaoStr = this.rl.question("Ano de publicação (Opcional): ");

    try {
        const novoLivro = await criarLivroServ(titulo, isbn, quantidade_estoque, id_autor, ano_publicacao);

        // sucesso:
        console.log(`\n✅ Livro "${novoLivro.titulo}" cadastrado com sucesso com o ID: ${novoLivro.id_livro}!`);

    } catch (error: any) {
        console.error(`\n${error.message}`);
    }
}
