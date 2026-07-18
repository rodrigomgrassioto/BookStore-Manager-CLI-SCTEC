import {fazerPergunta} from "../utils/leitorFormatadorDeEntradas";
import {
    livroControllerAtualizar,
    livroControllerCriar,
    livroControllerDeletar,
    livroControllerListar,
    livroControllerProcurarPorNome
} from "../controllers/LivroController";
import {divisor, erroMsg, opcaoSair, opcoes, subtituloMsg, tituloMsg} from "../utils/estilo";

export class LivroMenu {
    async subMenuLivro(): Promise<void> {
        let noSubMenu = true;

        console.clear()
        while (noSubMenu) {
            tituloMsg("BookStore Manager");
            subtituloMsg('Opções em livro');
            opcoes('1 - Adicionar livro');
            opcoes('2 - Listar livros');
            opcoes('3 - Procurar livro por nome');
            opcoes('4 - Editar livro');
            opcoes('5 - Excluir livro');
            opcaoSair('0 - Voltar menu anterior');
            divisor()

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear()
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Adicionar livro');
                    await livroControllerCriar();
                    break;

                case '2':
                    console.clear()
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Listar livros');
                    await livroControllerListar();
                    break;

                case '3':
                    console.clear()
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Procurar livro por nome');
                    await livroControllerProcurarPorNome()
                    break;

                case '4':
                    console.clear()
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Editar livro');
                    await livroControllerAtualizar()
                    break;

                case '5':
                    console.clear()
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Excluir livro');
                    await livroControllerDeletar()
                    break;

                case '0':
                    console.clear()
                    noSubMenu = false; // volta para o menu inicial
                    break;
                default:
                    console.clear()
                    erroMsg('Opção inválida.');
            }
        }
    }
}
