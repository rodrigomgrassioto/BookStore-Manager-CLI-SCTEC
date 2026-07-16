import {fazerPergunta} from "../utils/leitorFormatadorDeEntradas";
import {criarEmprestimoServ, devolucaoEmprestimoServ} from "../services/EmprestimoService";
import {subtituloMsg, sucessoMsg, tituloMsg, verdeMsg} from "../utils/consoleLogCor";

export class EmprestimoMenu {
    async subMenuEmprestimo(): Promise<void> {
        let noSubMenu = true;

        console.clear()
        while (noSubMenu) {
            tituloMsg("BookStore Manager");
            // console.log('\n🟦 ---  --- 🟦');
            subtituloMsg('Empréstimos')

            // console.log('\n🟦 --- Empréstimos --- 🟦');
            console.log('1. Novo empréstimo');
            console.log('2. Devolução');
            console.log('0. Voltar menu anterior');

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
