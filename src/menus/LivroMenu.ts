import {fazerPergunta} from "../utils/leitorFormatadorDeEntradas";
import {divisor, erroMsg, opcaoSair, opcoes, subtituloMsg, tituloMsg} from "../estilos/estilo";
import {LivroController} from "../controllers/LivroController";
import {LivroService} from "../services/LivroService";
import {AutorService} from "../services/AutorService";
import {LivroRepository} from "../repositories/LivroRepository";

export interface IMenu {
    subMenuLivro(): Promise<void>
}

export class LivroMenu implements IMenu {
    private readonly controller: LivroController

    constructor(
        controller: LivroController = new LivroController(new LivroService(new LivroRepository()), new AutorService())
    ) {
        this.controller = controller;
    }

    public async subMenuLivro(): Promise<void> {
        console.clear();
        
        let noSubMenu = true;
        while (noSubMenu) {
            tituloMsg("BookStore Manager");
            subtituloMsg('Opções em livro');
            opcoes('1 - Adicionar livro');
            opcoes('2 - Listar livros');
            opcoes('3 - Procurar livro por ID');
            opcoes('4 - Procurar livro por nome');
            opcoes('5 - Editar livro');
            opcoes('6 - Excluir livro');
            opcaoSair('0 - Voltar menu anterior');
            divisor();

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Adicionar livro');
                    await this.controller.livroControllerCriar();
                    break;

                case '2':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Listar livros');
                    await this.controller.livroControllerListar();
                    break;

                case '3':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Procurar livro por ID');
                    await this.controller.livroControllerProcurarPorId();
                    break;

                case '4':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Procurar livro por nome');
                    await this.controller.livroControllerProcurarPorNome();
                    break;

                case '5':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Editar livro');
                    await this.controller.livroControllerAtualizar();
                    break;

                case '6':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Excluir livro');
                    await this.controller.livroControllerDeletar();
                    break;

                case '0':
                    console.clear();
                    noSubMenu = false;
                    break;

                default:
                    console.clear();
                    erroMsg('Opção inválida.')
            }
        }
    }
}
