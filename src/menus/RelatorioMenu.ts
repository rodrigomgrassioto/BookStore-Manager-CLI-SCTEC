import { fazerPergunta } from "../utils/leitorFormatadorDeEntradas";
import {
    cianolNegritoMsg,
    opcoes,
    subtituloMsg,
    sucessoMsg,
    tituloMsg,
    verdeMsg,
    vermelhoMsg
} from "../utils/consoleLogCor";
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
            opcoes('====================');
            opcoes('1. Livros disponíveis');
            opcoes('2. Livros emprestados');
            opcoes('3. Livros por autor');
            opcoes('4. Quantidade empréstimos por livro');
            opcoes('5. Clientes com empréstimos ativos');
            vermelhoMsg('0. Voltar menu anterior');
            opcoes('====================');

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear();
                    console.log('\n🟦 --- Novo empréstimo --- 🟦');
                    await livrosDisponiveisController();
                    break;

                case '2':
                    console.clear();
                    console.log('\n🟦 --- Devolução --- 🟦');
                    await livrosEmprestadosController();
                    break;

                case '3':
                    console.clear();
                    console.log('\n🟦 --- Devolução --- 🟦');
                    await livrosCadastradosPorAutorController();
                    break;

                case '4':
                    console.clear();
                    console.log('\n🟦 --- Devolução --- 🟦');
                    await quantidadeEmprestimoPorLivroController();
                    break;

                case '5':
                    console.clear();
                    console.log('\n🟦 --- Devolução --- 🟦');
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
