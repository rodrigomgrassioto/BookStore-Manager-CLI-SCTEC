import {fazerPergunta} from "../utils/leitorFormadorDeEntradas";
import {
    livroControllerAtualizar,
    livroControllerCriar,
    livroControllerDeletar,
    livroControllerListar,
    livroControllerProcurarPorNome
} from "../controllers/LivroController";

export class LivroMenu {
    async subMenuLivro(): Promise<void> {
        let noSubMenu = true;

        console.clear()
        while (noSubMenu) {
            console.log('\n🟦 --- BookStore Manager --- 🟦');
            console.log('\n🟦 --- Livro --- 🟦');
            console.log('1. Adicionar livro');
            console.log('2. Listar livros');
            console.log('3. Procurar livro por nome');
            console.log('4. Editar livro');
            console.log('5. Excluir livro');
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
                    await livroControllerListar();
                    break;

                case '3':
                    console.clear()
                    console.log('\n🟦 --- Procurar livro por nome --- 🟦');
                    await livroControllerProcurarPorNome()
                    break;

                case '4':
                    console.clear()
                    console.log('\n🟦 --- Editar livro --- 🟦');
                    await livroControllerAtualizar()
                    break;

                case '5':
                    console.clear()
                    console.log('\n🟦 --- Excluir livro --- 🟦');
                    await livroControllerDeletar()
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
