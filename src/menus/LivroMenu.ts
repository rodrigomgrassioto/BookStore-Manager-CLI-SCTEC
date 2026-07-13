import {fazerPergunta} from "../utils/readlineUtil";
import {livroControllerCriar} from "../controllers/LivroController";

export class LivroMenu {
    async subMenuLivro(): Promise<void> {
        let noSubMenu = true;

        console.clear()
        while (noSubMenu) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('\n🟦 --- Livro --- 🟦');
            console.log('1. Adicionar livro');
            console.log('2. Listar livro');
            console.log('3. Procurar livro');
            console.log('4. Excluir livro');
            console.log('0. Voltar menu anterior');

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear()
                    console.log('\n🟦 --- Adicionar livro --- 🟦');
                    await livroControllerCriar();
                    break;

                case '2':
                    console.clear()
                    console.log('\n🟦 --- Listar livros --- 🟦');
                    // await
                    break;

                case '3':
                    console.clear()
                    console.log('\n🟦 --- Procurar livro --- 🟦');
                    // await
                    break;

                case '4':
                    console.clear()
                    console.log('\n🟦 --- Excluir livro --- 🟦');
                    // await
                    break;

                case '0':
                    console.clear()
                    noSubMenu = false; // volta para o menu inicial
                    break;
                default:
                    console.clear()
                    console.log('❌ Opção inválida.');
            }
        }
    }
}
