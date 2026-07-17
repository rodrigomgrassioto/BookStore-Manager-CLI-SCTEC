import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import {
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

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear();
                    console.log('\n🟦 --- Livros Disponíveis --- 🟦');
                    await livrosDisponiveisController();
                    break;

                case '2':
                    console.clear();
                    console.log('\n🟦 --- Livros Emprestados --- 🟦');
                    await livrosEmprestadosController();
                    break;

                case '3':
                    console.clear();
                    console.log('\n🟦 --- Livros Cadastrados Por Autor --- 🟦');
                    await livrosCadastradosPorAutorController();
                    break;

                case '4':
                    console.clear();
                    console.log('\n🟦 --- Quantidade de Empréstimos Por Livro --- 🟦');
                    await quantidadeEmprestimoPorLivroController();
                    break;

                case '5':
                    console.clear();
                    console.log('\n🟦 --- Clientes Com Empréstimos Ativos --- 🟦');
                    await clientesComEmprestimosAtivosController();
                    break;

                case '0':
                    console.clear();
                    noSubMenu = false; // volta para o menu inicial
                    break;

                default:
                    console.clear();
                    console.log('❌ Opção inválida.');
            };
        };
    };
};
