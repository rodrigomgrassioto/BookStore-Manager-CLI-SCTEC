import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import {
    divisor, erroMsg,
    opcaoSair,
    opcoes,
    subtituloMsg,
    sucessoMsg,
    tituloMsg,
} from "../utils/estilo";
import { livrosDisponiveisController, livrosEmprestadosController, 
         livrosCadastradosPorAutorController, quantidadeEmprestimoPorLivroController, 
         clientesComEmprestimosAtivosController } from "../controllers/RelatorioController";

export class RelatorioMenu {
    async subMenuRelatorio(): Promise<void> {
        console.clear();

        let noSubMenu = true;
        while (noSubMenu) {
            tituloMsg("BookStore Manager");
            subtituloMsg('Relatórios');
            opcoes('1 - Livros disponíveis');
            opcoes('2 - Livros emprestados');
            opcoes('3 - Livros por autor');
            opcoes('4 - Quantidade empréstimos por livro');
            opcoes('5 - Clientes com empréstimos ativos');
            opcaoSair('0 - Voltar menu anterior');
            divisor()

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Livros disponíveis');
                    await livrosDisponiveisController();
                    break;

                case '2':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Livros emprestados');
                    await livrosEmprestadosController();
                    break;

                case '3':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Livros por autor');
                    await livrosCadastradosPorAutorController();
                    break;

                case '4':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Total de empréstimos por livro');
                    await quantidadeEmprestimoPorLivroController();
                    break;

                case '5':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Empréstimos Ativos');
                    await clientesComEmprestimosAtivosController();
                    break;

                case '0':
                    console.clear();
                    noSubMenu = false; // volta para o menu inicial
                    break;

                default:
                    console.clear();
                    erroMsg('Opção inválida.');
            };
        };
    };
};
