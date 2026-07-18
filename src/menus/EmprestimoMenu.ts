import {fazerPergunta} from "../utils/leitorFormatadorDeEntradas";
import {criarEmprestimoServ, devolucaoEmprestimoServ} from "../services/EmprestimoService";
import {divisor, erroMsg, opcaoSair, opcoes, subtituloMsg, sucessoMsg, tituloMsg} from "../utils/estilo";
import {
    buscarEmprestimoPorIdController,
    criarEmprestimoController,
    devolverEmprestimoController
} from "../controllers/EmprestimoController";

export class EmprestimoMenu {
    async subMenuEmprestimo(): Promise<void> {
        console.clear();

        let noSubMenu = true;   
        while (noSubMenu) {
            tituloMsg("BookStore Manager");
            subtituloMsg('Opções em empréstimo');
            opcoes('1 - Criar Novo Empréstimo');
            opcoes('2 - Buscar Empréstimo Por ID');
            opcoes('3 - Devolver Empréstimo');
            opcaoSair('0 - Voltar menu anterior');
            divisor()

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Novo Empréstimo');
                    await criarEmprestimoController();
                    break;

                case '2':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Buscar Empréstimo por ID');
                    await buscarEmprestimoPorIdController();
                    break;

                case '3':
                    console.clear();
                    tituloMsg('BookStore Manager');
                    subtituloMsg('Devolver Empréstimo');
                    await devolverEmprestimoController();
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
