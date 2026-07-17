import {fazerPergunta} from "../utils/leitorFormatadorDeEntradas";
import {criarEmprestimoServ, devolucaoEmprestimoServ} from "../services/EmprestimoService";
import {subtituloMsg, sucessoMsg, tituloMsg, verdeMsg} from "../utils/consoleLogCor";
import { buscarEmprestimoPorIdController, criarEmprestimoController } from "../controllers/EmprestimoController";

export class EmprestimoMenu {
    async subMenuEmprestimo(): Promise<void> {
        console.clear();

        let noSubMenu = true;   
        while (noSubMenu) {
            tituloMsg("BookStore Manager");
            // console.log('\n🟦 ---  --- 🟦');
            subtituloMsg('Empréstimos');

            // console.log('\n🟦 --- Empréstimos --- 🟦');
            console.log('1. Criar Novo Empréstimo');
            console.log('2. Buscar Empréstimo Por ID');
            console.log('3. Devolver Empréstimo');
            console.log('0. Voltar menu anterior');

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
