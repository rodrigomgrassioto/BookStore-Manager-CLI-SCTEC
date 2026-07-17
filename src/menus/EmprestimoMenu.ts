import {fazerPergunta} from "../utils/leitorFormatadorDeEntradas";
import {criarEmprestimoServ, devolucaoEmprestimoServ} from "../services/EmprestimoService";
import {divisor, opcaoSair, opcoes, subtituloMsg, sucessoMsg, tituloMsg} from "../utils/estilo";
import { buscarEmprestimoPorIdController, criarEmprestimoController } from "../controllers/EmprestimoController";

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
                    console.log('\n🟦 --- Criar Novo Empréstimo --- 🟦');
                    await criarEmprestimoController();
                    break;

                case '2':
                    console.clear();
                    console.log('\n🟦 --- Buscar Empréstimo Por ID --- 🟦');
                    await buscarEmprestimoPorIdController();
                    break;

                case '3':
                    console.clear();
                    console.log('\n🟦 --- Devolver Empréstimo --- 🟦');
                    await buscarEmprestimoPorIdController();
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
