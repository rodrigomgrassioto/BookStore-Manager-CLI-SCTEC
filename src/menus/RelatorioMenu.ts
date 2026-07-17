import {fazerPergunta} from "../utils/leitorFormatadorDeEntradas";
import {criarEmprestimoServ, devolucaoEmprestimoServ} from "../services/EmprestimoService";
import {
    cianolNegritoMsg,
    opcoes,
    subtituloMsg,
    sucessoMsg,
    tituloMsg,
    verdeMsg,
    vermelhoMsg
} from "../utils/consoleLogCor";

export class RelatorioMenu {
    async subMenuRelatorio(): Promise<void> {
        let noSubMenu = true;

        console.clear()
        while (noSubMenu) {
            tituloMsg("BookStore Manager");
            subtituloMsg('Relatórios')
            opcoes('====================')
            opcoes('1. Livros disponíveis');
            opcoes('2. Livros emprestados');
            opcoes('3. Livros por autor');
            opcoes('4. Quantidade empréstimos por livro');
            opcoes('5. Clientes com empréstimos ativos');
            vermelhoMsg('0. Voltar menu anterior');
            opcoes('====================')

            const opcao = await fazerPergunta('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    console.clear()
                    console.log('\n🟦 --- Novo empréstimo --- 🟦');
                    const id_cliente = await fazerPergunta("ID do cliente", {aceitarVazio: false, tipoRetorno: "i_zero"});
                    const ids_livros: number[] = [];
                    let continuar = true
                    do{
                        if (ids_livros.length > 0) console.log("Se terminou, digite 0 (ZERO)")
                        const temp = await fazerPergunta("ID do livro:", {aceitarVazio: false, tipoRetorno: "i_zero"});
                        if (temp === 0) {
                            continuar = false;
                            break;
                        }
                        ids_livros.push(temp)
                    } while (continuar)

                    try {
                        await criarEmprestimoServ({id_cliente: id_cliente, ids_livros:ids_livros});
                        console.log("✅ Empréstimo registrado com sucesso.")
                    } catch (e) {
                        console.error(e);
                    }
                    break;

                case '2':
                    console.clear()
                    console.log('\n🟦 --- Devolução --- 🟦');
                    const id_emprestimo = await fazerPergunta("ID do empréstimo: ", {aceitarVazio: false, tipoRetorno: "i_zero"});
                    try {
                        devolucaoEmprestimoServ(id_emprestimo)
                        sucessoMsg("Devolução registrada com sucesso.")
                    } catch (e){
                        console.error(e);
                    }
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
