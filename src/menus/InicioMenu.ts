import * as readline from "readline";
import {fazerPergunta, rl} from "../utils/leitorFormatadorDeEntradas";
import {LivroMenu} from "./LivroMenu";
import {AutorMenu} from "./AutorMenu";
import {ClienteMenu} from "./ClienteMenu";
import {EmprestimoMenu} from "./EmprestimoMenu";
import {RelatorioMenu} from "./RelatorioMenu";
import {divisor, opcaoSair, opcoes, subtituloMsg, tituloMsg} from "../utils/estilo";

export class InicioMenu {
    // private rl: readline.Interface;
    //
    // constructor() {
    //     this.rl = readline.createInterface({
    //         input: process.stdin,
    //         output: process.stdout
    //     });
    // }
    //
    // // váriável do MENU
    // private perguntar = (texto: string): Promise<string> => {
    //     return new Promise((resolve) => this.rl.question(texto, resolve));
    // };

    // Menu
    async iniciarMenu(): Promise<void> {
        const livroMenu = new LivroMenu();
        const autorMenu = new AutorMenu();
        const clienteMenu = new ClienteMenu();
        const emprestimoMenu = new EmprestimoMenu();
        const relatorioMenu = new RelatorioMenu();
        let continuar = true;

        console.clear();
        while (continuar) {
            tituloMsg('BookStore Manager');
            subtituloMsg('Opções');
            opcoes('1 - Autor');
            opcoes('2 - Livros');
            opcoes('3 - Clientes');
            opcoes('4 - Empréstimos');
            opcoes('5 - Relatórios');
            opcaoSair('0 - Sair')
            divisor()


            // const opcao = await this.perguntar('Escolha uma opção: ');
            const opcao = await fazerPergunta('Escolha uma opção: ');
            switch (opcao) {
                case '1':
                    console.clear();
                    await autorMenu.subMenuAutor();
                    break;

                case '2':
                    console.clear();
                    await livroMenu.subMenuLivro()
                    break;

                case '3':
                    console.clear();
                    await clienteMenu.subMenuCliente();
                    break;

                case '4':
                    console.clear();
                    await emprestimoMenu.subMenuEmprestimo()
                    break;

                case '5':
                    console.clear();
                    await relatorioMenu.subMenuRelatorio()
                    break;

                case '0':
                    console.clear();
                    console.log('👋 👋 👋  Até mais!');
                    continuar = false;
                    rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.clear();
                    console.log('❌ Opção inválida! Tente novamente.');
                    break;
            };
        };
    };
};